# Invoke Watson Machine Learning Model and Display model output at run time on Cognos Dashboard
***Work In Progress***

Cognos 11 is not only positioned towards the professional report author but specifically towards power users and data scientists by offering Watson-like features such as natural language search and automatic proposal of charts. Now with all these latest features in cognos, interacting or communicating with cloud hosted services is also possible from the cognos application.

It was always a tedious task to display a real time Watson Machine Learning(WML) model output from Cognos application. 
To achieve that, we need to have an external mechanism to invoke the model, pass the required input parameters and finally the scores are written back to the database. Cognos reads the latest scores from the database and displays on the dashboard.

The latest version of Cognos comes with Custom control feature. It gives the capability to create a real time dashboard where we can pass the inputs through a custom widget which internally invokes the model through REST API, gets the output and displays on the dashboard.

For this, one need to build a custom control using Java Script to get inputs and to show outputs as chart/table. Then this control can be imported into Cognos dashboard and gets real time output. In this pattern, we demonstrate to build custom control, integration of the custom control in Cognos, invoke the Machine learning model from the Cognos Dashboard and show model output at run time on Cognos Dashboard.

The dataset considered for this pattern is `Sample Customer Data in Telecom Domain`. Using the dataset, the behaviour to retain the customers is predicted. You can analyse all relevant customer data and develop focused customer retention programs.

**Use case**

Customer churn occurs when customers or subscribers stop doing business with a company or service, also known as customer attrition. It is also referred as loss of clients or customers. One industry in which churn rates are particularly useful is the telecommunications industry, because most customers have multiple options from which to choose within a geographic location.

Using this kind of data and with the help of watson machine learning model output, you will be able to predict the most likely churn customers(telecom customers) from the cognos dashboard and by taking appropriate actions (such as giving offers and needful service) will decrease the churn rate and prevent customer attrition. In other words we would be able to identify which customers are at risk of loosing?

> The data file in the `data` directory - `Telco-Customer-Churn.csv` has been downloaded from [here](https://www.kaggle.com/blastchar/telco-customer-churn) .

When the reader has completed this code pattern, one will be able to:
- create a real time dashboard using Cognos custom control.
- import the external java script to Cognos reports.
- invoke machine learning models hosted on cloud through REST API from Cognos.
 

## Flow

![WRML_Cognos](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/RWML_Arch.png)

1. Create the custom control widget using Javascript.
2. Create Watson Machine Learning Model and deploy as web service.
3. Launch Cognos on web browser.
4. Create the Cognos report using Custom Control and run the report.
5. Report invokes WML model based on the input paramaeters.
6. Gets output from the WML model and displays on the Cognos dashboard. Dashboard gets updated with real time WML model output.


# Included Components

* [JavaScript](https://www.w3schools.com/js/) - Develop forms to capture user inputs, later these forms can be imported to cognos dashboards.

* [IBM Watson Studio](https://www.ibm.com/cloud/watson-studio): Analyze data using RStudio, Jupyter, and Python in a configured, collaborative environment that includes IBM value-adds, such as managed Spark.

* [IBM Cloud Object Storage](https://console.bluemix.net/catalog/services/cloud-object-storage): An IBM Cloud service that provides an unstructured cloud data store to build and deliver cost effective apps and services with high reliability and fast speed to market. This code pattern uses Cloud Object Storage.

* [Watson Machine Learning service](https://dataplatform.cloud.ibm.com/docs/content/analyze-data/ml-overview.html?context=analytics) - can build sophisticated analytical models, trained with your own data, that you can deploy for use in applications.

* [d3js](https://d3js.org/) - Develop charts like pie, bar, or some fancy charts sunburst etc which can later be imported to cognos application.

* Cognos BI server - On Prim version of Cognos or SaaS offering.

## Featured Technologies
 
* [Analytics](https://developer.ibm.com/code/technologies/analytics/): Analytics delivers the value of data for the enterprise.

* [Watson Analytics](https://www.ibm.com/watson-analytics)

* [Business intelligence (BI)](https://www.gartner.com/it-glossary/business-intelligence-bi/) is a technology-driven process for analyzing data and presenting actionable information to help executives, managers and other corporate end users make informed business decisions.

## Watch The Video

Will be uploaded shortly.

## Pre-requisites

* Cognos server - You can have on-prim or SaaS offering of Cognos with admin access.
 > Note: Cognos version should be over 11.0.05.
 

* IBM Cloud account: You must have IBM Cloud account to work with this code pattern. If you do not have an IBM Cloud account, please create an account [here](https://console.bluemix.net/)

## Steps
Follow these steps to setup and run this code pattern. The steps are described in detail below.

1. [Create watson machine learning model from Watson Studio](#2-create-watson-machine-learning-model-from-watson-studio)
2. [Get WML Credentials and model API code](#2-get-wml-credentials-and-model-api-code)
3. [Host the WML model through node application](#3-host-the-wml-model-through-node-application)
4. [Create custom control widgets](#4-create-custom-control-widgets)
5. [Build cognos report using custom widget](#5-build-cognos-report-using-custom-widget)
6. [Run the report and Analyse the results](#6-run-the-report-and-analyse-the-results) 



### 1. Create watson machine learning model from Watson Studio

[Create watson studio](https://console.bluemix.net/catalog/services/watson-studio): IBM Watson Studio can Build and train AI & machine learning models, prepare and analyze data. All in a flexible, hybrid cloud environment.

- Click on ```Create``` button by selecting Lite Pricing plan. See below screenshot.


![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/WatsonStudioCreate.png)

By creating a project in Watson Studio a free tier ``Object Storage`` service will be created in your IBM Cloud account. Choose the storage type as Cloud Object Storage for this code pattern.

- Click on ```Get started``` button to launch watson studio

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/WS_GetStarted.png)


- Create a new Watson Studio project.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/ws_newProj.png)

By creating a project in Watson Studio a free tier ``Object Storage`` service will be created in your IBM Cloud account. Choose the storage type as Cloud Object Storage for this code pattern.

- Define the project by giving a Name and hit 'Create'.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/define_project.png)

- Once a project is created click on 'assets' tab.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/WS_Assets.png)

- Under modeler flow click on new model, create a watson machine learning model to predict customer churn.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/modeller.png)

- We have used sample model for this pattern, select model type as 'sample model' radio button
![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/sample_wml_model.png)

- You created and saved the model. It's time to deploy it. From the deployment tab, click on 'Add to deployment' and select deployment type as 'web service'.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/add_to_deploy.png)

### 2. Get WML Credentials and model API code

- Once deployment completed, Copy the watson machine learning credentials:

There are two ways to look up Watson Machine Learning service credentials, depending on where you start:

IBM Watson Studio
IBM Cloud


 
```Option 1: From Watson Studio```

From the Services menu in the top menu bar of Watson Studio, choose "Watson Services".
In the Machine Learning section, select "Manage in IBM Cloud" from the ACTIONS menu beside the service instance for which you want to retrieve credentials. (This opens the service details page for the Watson Machine Learning service instance.)
Click Service credentials.
If there are no service credentials yet, click the New credential button.
Under the ACTION menu, click "View credentials".

 

```Option 2: From IBM Cloud```

Log in to IBM Cloud external link. (This takes you to your IBM Cloud dashboard.)
In your IBM Cloud dashboard, click the Watson Machine Learning service instance for which you want to retrieve credentials. (This opens the service details page for the Watson Machine Learning service instance.)
Click Service credentials.
If there are no service credentials yet, click the New credential button.
Under the ACTION menu, click "View credentials".

Sample credentials as follows:

```
{
  "instance_id": "5xxxxxxx-c2a6-4c76-9b3a-xxxdbe00000",
  "password": "samplepwd-xxx-pwd0-pwd-samplepwd",
  "url": "https://eu-gb.ml.cloud.ibm.com",
  "username": "7ab12e8-xxx-yyyy-xxxx-123456789
}
```


### 3. Host the WML model through node application

As shown in previous step, we have got the Javascript implementation of WML REST API. To avoid CORS error, we deployed WML API  as a node app. Node application code is available at `<//code location>`. Perform the following steps to deploy this node application.

 * Get the code
 * Change the directory.
   ``` 
   cd <directory>
   ```
 * Update the `WML credentials` in `app.js` as shown:
   ```
   <screen shot>
   ```
 * Update `scoring_url` in `app.js` as shown:
   ```
   <screenshot>
   ```
 * Push the application on IBM Cloud.
   ```
   bx cf push <unique name of application>
   ```
 * Get the application URL to be used in next step.
   ```
   snapshot
   ```
 

### 4. Create custom control widgets

Create the custom control widget using Javascript. The custom control developed for this pattern: 

  * asks to provide the value of required parameters as an input for the WML model.
  * calls REST API which in-turn invokes WML model using the provided input parameters.
  * API sends response back to custom control in Cognos.
  * parses the output (confidence score) and display as a d3 pie chart on Cognos Dashboard. 

In this repository, custom control code is available at `<code location with file name`. Update the URL in `js file` as shown and save the file.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/custom-control-API.png)
  
Here, please write the name of your node application deployed in previous step. For example, `aaa-bbb.mybluemix.net`

### 5. Build cognos report using custom widget

- Place the custom widget related java script files [report.js](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/src/report.js) and [report.css](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/src/report.css) in the cognos installation webcontent directory.

Path as follows
```
<Cognos installation directory>\samples\javascript\wml\
eg: "c:\Program Files\IBM\cognos\analytics\webcontent\samples\javascript\wml\
 ```
 
 ```Note:``` 
 Create the folder by name ```wml``` for this pattern under javaScript directory.

- Launch cognos through url in the browser(preferred browsers are google chrome or mozilla firefox).
 sample url as follows:
 ```
 http://Cognos_Server_IP:port/bi/?perspective=home
 ```

- Click on ```+ New button``` to upload the `Telco-Customoer-Churn` data set to cognos server. See screenshot for details.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/uploadcsv.png)

- Browse to upload the [Telco-customer-churn](https://github.com/IBM/invoke-wml-using-cognos-custom-control/tree/master/data/Telco-Customer-Churn.csv) csv file which you would have downloaded to your local system.

- After uploading the csv file, go to `Team Content` tab and navigate to sample>Data folder and select the recently uploaded data set and create a report using the same. See below screenshot for reference.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/createreport.png)

- Cognos will pop up to select the available templates. Pick the blank template and clock open. See below screenshot.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/report_template.png)

- Click on source tab to see the meta data of the data set

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/source_data_tab.png)

- Select Page1 to start adding custom widgets to the cognos report

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/selectPage1.png)

-  Add a custom control from the toolbox icon, drag the custom control icon to the report. See below screenshot.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/custom_control_drag.png)

- Select the custom control and click the Show properties icon Show properties icon. To specify the location of the file that contains the JavaScript that you want to use for the control, click the Module path property. And add the other properties as per the below screenshot.To specify how you want the control to interact with the report, click the UI type property and set as `UI without event propogation`.
```
Note: Module path will be pointing to the javascripts files that was created for custom control.
```

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/cc_prop.png)

-  To set the full interactivity of the report, then go to Pages tab, click on `Report` as per below screenshot and on the properties window ensure the `Run with full interactivity` is set to `Yes`. 

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/run_full_interactivity.png)

-  Go to report page again, add a list object to the report and then add required fields to the list. See below screenshot for reference. 

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/SampleList.png)

- Also add a Rave packed bubble chart visualization to the report and add data items to those visualizations widget to get some insights of the data. See screenshot for details.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/rave_viz.png)

- save the report under Team Content or My content by creating a folder and name it as `Invoking Watson Machine Learning Model from Cognos Dashboard`.


### 6. Run the report and Analyse the results

From cognos report, you can view insights of the Telecom data set and along with that we can now dynamically invoke the machine learning model and get the scores or results instantly. 

- Run the saved report in `html` format ONLY. See screenshot for reference.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/run_report.png)

- In order for you to get the output of the watson machine learning model, fill the form with required input parameters and click on submit button to get the results of the WML model. See screen shot for reference.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/form_wml.png)

- Cognos will notify you saying ```Invoking watson machine learning model```. Click on ok.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/invoke_popup.png)


- At run time, along with the input form you will now see the output of the watson machine from cognos application itself.

![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/output_wml.png)


- From the one single cognos dashboard, now we will be able to see the insights of the data through dataware house and along with that we can now do predictions by invoking dynamically watson machine learning models and display the output if the model on the dashboard. For the data that we passed in this scenario, we could see that the customer is most likey to churn based on the input parameters. Chances are high that this customer is likely to churn. So, the telco subscriber can now offer some good deals to that particular or set of customers who fall in the same category and try to retain them in future.
Overall output of the report will look as below screen shot.


![](https://github.com/IBM/invoke-wml-using-cognos-custom-control/blob/master/images/Report_Output.png)


With this pattern now we can avoid tedious process of invoking the watson machine learning models at real time and get the output of those models displayed on the fly.



## Links
- [Artificial Intelligence](https://www.ibm.com/services/artificial-intelligence)
- [Machine Learning](https://dataplatform.cloud.ibm.com/docs/content/analyze-data/ml-overview.html?context=analytics)



## Learn More
- [IBM Cognos Custom Widgets](https://www.ibm.com/support/knowledgecenter/en/SSEP7J_11.0.0/com.ibm.swg.ba.cognos.ag_manage.doc/c_ca_add_db_widgets.html).

- [adding javascript to cognos](https://www.ibm.com/support/knowledgecenter/en/SSEP7J_11.0.0/com.ibm.swg.ba.cognos.ug_cr_rptstd.doc/t_rpting_add_javascrpt.html)


# Troubleshooting

[See DEBUGGING.md.](DEBUGGING.md)

# License
[Apache 2.0](LICENSE)



