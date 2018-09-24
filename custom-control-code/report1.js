define(["text!./report.css", "jquery", "http://d3js.org/d3.v4.min.js"], function(rCSS, $, d3) {
    'use strict';

    //d3 variables
    var svg = '';
    var width = '',
        height = '',
        radius = '',
        arc = '';

    function Form() {
    };

    Form.prototype.initialize = function(oControlHost, fnDoneInitializing) {

        fnDoneInitializing();
    }

    Form.prototype.draw = function(oControlHost) {
        var pageContainer = oControlHost.container;

        var html = '<style>' + rCSS + '</style>'
        html += '<br/>'+
                '<h1>Real Time Prediction of Customer Churn using Watson Machine Learning(WML) </h1>' +
                '<div class="left">' +
                '<fieldset>' +
                    '<legend>Input for WML Model</legend>' +
                    '<label>Gender</label>' +
                    '<input type="radio" name="gender" value="Male" checked> Male' +
                    '<input type="radio" name="gender" value="Female"> Female<br><br>' +
                    '<label>Senior Citizen</label>' +
                    '<input type="radio" name="senior_citizen" value="1" checked> Yes' +
                    '<input type="radio" name="senior_citizen" value="0"> No<br><br>' +
                    '<label>Dependents</label>' +
                    '<input type="radio" name="dependents" value="Yes" checked> Yes' +
                    '<input type="radio" name="dependents" value="No"> No<br><br>' +
                    '<label>Internet Service</label>' +
                    '<select id="internet_service">' +
                    '<option value="DSL">DSL</option>' +
                    '<option value="Fiber optic">Fiber Optic</option>' +
                    '<option value="No">None</option>'+
                    '</select> <br><br>'+
                    '<label>Contract</label>' +
                    '<select id="contract">' +
                    '<option value="One year">One year</option>' +
                    '<option value="Two year">Two year</option>' +
                    '<option value="Month-to-month">Month-to-month</option>'+
                    '</select> <br><br>'+
                    '<label>Tenure</label>' +
                    '<input type="text" class="textbox" id="tenure" placeholder="# of months"><br><br>' +
                    '<label>Monthly Charges ($)</label>' +
                    '<input type="text" class="textbox" id="monthly_charge"><br><br><br/>' +
                    '<input type="submit" class="submit" value="Submit" id="submit"><br/>' +
                    '<br/>'+
                '</fieldset>' +
                '</div>'+
                '<div class="right">' +
                  '<fieldset>' +
                    '<legend>Response from WML</legend>' +
                    '<label>Confidence Score (%)</label>' +
                    '<input type="text" class="textbox" id="score"><br/><br/>' +
                    '<label>Churn</label>' +
                    '<input type="text" class="textbox" id="churn"><br/><br/>' +
                    '<br/>'+
                    '<div id="chart">' +
                    '</div>'+
                  '</fieldset>' +
                '</div> ';

        pageContainer.innerHTML = html;
        
        pageContainer.querySelector("*[class*='submit']").onclick = this.f_onSubmitClick.bind(this, oControlHost);
    }

    Form.prototype.f_onSubmitClick = function(oControlHost) {
		$(".right").hide();
		$("#chart").empty();
        var inputData = { 
                        "gender": $("input[name=gender]:checked").val(),
                        "senior_citizen": $("input[name=senior_citizen]:checked").val(),
                        "dependents": $("input[name=dependents]:checked").val(),
                        "tenure": $("#tenure").val(),
                        "internet_service": $("#internet_service").val(),
                        "contract": $("#contract").val(),
                        "monthly_charge": $("#monthly_charge").val()
                    };
        alert("Invoking WML Model...");
        $.post("http://wml-api-node-app.mybluemix.net/predictScore", inputData, function(data) {
            var predictedOutput = data[13];
            $(".right").show();
            $("#score").val(Math.round(Number(predictedOutput[0]*100)));
            if (data[14] == 0) {
                $("#churn").val("No");
            } else {
                $("#churn").val("Yes");
            }

            var chartData = [{response: "retain", prediction: Math.round(Number(predictedOutput[0]*100))}, {response: "churn", prediction: Math.round(Number(predictedOutput[1]*100))}];

            drawD3PieChart(chartData);
        });
    };

    function drawD3PieChart (chartData) {

        width = 200;
        height = 200;
        svg = d3.select("#chart").append("svg")
            .attr("width",200)
            .attr("height",200);
        
        radius = 100;
        var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        //var color = d3.scaleOrdinal(d3.schemeCategory20c);
        //var color = ["green", "red"];
		var color = ["2A7ED2", "BF99AB"];

        var pie = d3.pie()
                .sort(null)
                .value(function(d) { return d.prediction; });

        var path = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

        var label = d3.arc()
                .outerRadius(radius - 40)
                .innerRadius(radius - 40);
        
        var arc = g.selectAll(".arc")
                .data(pie(chartData))
                .enter().append("g")
                .attr("class", "arc");
            
        arc.append("path")
                  .attr("d", path)
                  .style("fill", function(d,i) { //return color(chartData[i].response);
                    if (chartData[i].response == "retain")  
                        return color[0];
                    else 
                        return color[1]; 
                    });
            
        arc.append("text")
                  .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
                  .attr("dy", "0.35em")
                  .text(function(d,i) { return (chartData[i].prediction+"%"); });

        // var legend = g.selectAll(".legend")
        //             .data(pie(chartData))
        //             .enter().append("g")
        //             .attr("class", "legend")
        //             .attr("transform", function(d,i){
        //                 return "translate(" + (width - 110) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
        //             });
        
        // legend.append("rect") // make a matching color rect
        //         .attr("width", 10)
        //         .attr("height", 10)
        //         .attr("fill", function(d, i) {
        //               //return colour[i];
        //               if (chartData[i].response == "retain")  
        //                 return color[0];
        //               else 
        //                 return color[1]; 
        //         });
                  
        // legend.append("text") // add the text
        //         .text(function(d,i){
        //               return chartData[i].response;
        //         })
        //         .style("font-size", 12)
        //         .attr("y", 10)
        //         .attr("x", 11);
    };

    return Form;
})