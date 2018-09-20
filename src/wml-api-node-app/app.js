var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//WML API Code Starts

// WML Model Details
var wml_service_credentials_url = "https://eu-gb.ml.cloud.ibm.com";
var wml_service_credentials_username = "76ef91e8-61ba-49b0-914b-1d489bc99ef8";
var wml_service_credentials_password = "eb3395a4-9ed8-4602-bf6f-ba5409ced76c";

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

// NOTE: you must manually construct wml_credentials hash map below using information retrieved
// from your IBM Cloud Watson Machine Learning Service instance
wml_credentials.set("url", wml_service_credentials_url);
wml_credentials.set("username", wml_service_credentials_username);
wml_credentials.set("password", wml_service_credentials_password);

function apiGet(url, username, password, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	const tokenHeader = "Basic " + btoa((username + ":" + password));
	const tokenUrl = url + "/v3/identity/token";

	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("GET", tokenUrl);
	oReq.setRequestHeader("Authorization", tokenHeader);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send();
}

function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

function predictScore(payload) {
  return new Promise( function (resolve, reject) {
    apiGet(wml_credentials.get("url"),
	  wml_credentials.get("username"),
	  wml_credentials.get("password"),
	  function (res) {
        let parsedGetResponse;
        try {
            parsedGetResponse = JSON.parse(this.responseText);
            //console.log(parsedGetResponse);
        } catch(ex) {
            // TODO: handle parsing exception
        }
        if (parsedGetResponse && parsedGetResponse.token) {
            const token = parsedGetResponse.token
            const wmlToken = "Bearer " + token;

			const scoring_url = "https://eu-gb.ml.cloud.ibm.com/v3/wml_instances/5bede663-c2a6-4c76-9b3a-1a5dbe503258/deployments/7ecb0ba7-8bc3-4462-8154-156f90a9b794/online";

            apiPost(scoring_url, wmlToken, payload, function (resp) {
                let parsedPostResponse;
                try {
                    parsedPostResponse = JSON.parse(this.responseText);
                    console.log(parsedPostResponse);
                    resolve(parsedPostResponse);
                } catch (ex) {
                    // TODO: handle parsing exception
                }
            }, function (error) {
                console.log("API Post Error - ", error); 
                reject(error);
            });
        } else {
            console.log("Failed to retrieve Bearer token");
        }
	}, function (err) {
    console.log("Promise error - ", err);
    reject(err);
  });
  });
}

app.post('/predictScore', function(req, res){
    var payload = req.body;
    console.log("in API call -", payload);
    
    payload = {
              "fields":["gender", "SeniorCitizen", "Dependents", "tenure", "InternetService", "Contract", "MonthlyCharges"], 
              "values": [[payload.gender, parseInt(payload.senior_citizen, 10), payload.dependents, parseInt(payload.tenure, 10), payload.internet_service, payload.contract, parseFloat(payload.monthly_charge)]]
          };
    console.log(JSON.stringify(payload));
    
    var payload1 = JSON.stringify(payload);
    predictScore(payload1).then(function(output) {
      console.log(output);
      res.send(output.values[0]);
  }, function(errorData){
    console.log("Error in received input data");
    console.log(errorData);
  });
});

//WML API Code Ends

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
