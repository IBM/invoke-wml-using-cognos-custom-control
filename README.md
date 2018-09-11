# invoke-wml-using-cognos-custom-control
***Work In Progress***

It is always a tedious task to see a real time Watson Machine Learning(wml) model output from Cognos application. 
To achieve that, we then need to have an external mechanism to invoke the model, pass the required input parameters and finally the scores are written back to the database. Cognos reads the latest scores from the database and displays on the dashboard. This is a little tedious process of displaying the machine learning model outputs at run time.

The latest version of Cognos comes with Custom control feature. It gives the capability to create a real time dashboard where we can pass the inputs through a custom widget which internally invokes the model through REST API, gets the output and displays on the dashboard.

For this, one need to build a custom widget using Java Script to get inputs and to show outputs as d3 chart. Then this widget can be imported into Cognos dashboard and gets real time output.
In this pattern, we will demonstrate to build custom widget, integration of the custom widget in Cognos and to invoke the Machine learning model from the Cognos Dashboard.
The dataset considered here is Telecom sample customer data, using that data we Predict behaviour to retain the customers. You can analyse all relevant customer data and develop focused customer retention programs.
For this, one need to build a custom widget using Java Script to get inputs and to show outputs as [d3 chart](https://d3js.org/). Then this widget can be imported into Cognos dashboard and gets real time output.

After going through this code pattern, you should be able to:
- create a real time dashboard using cognos custom control.
- can invoke machine learning or predictive models hosted on cloud.
- can import the external java script build charts to cognos application.

## Flow

![WRML_Cognos](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/images/RWML_Arch.png)

1. Create the forms using js and charts using D3js.
2. Create Watson Machine Learning or the predictive Model.
3. Launch Cognos either on Google chrome or mozilla firefox.
4. From the cognos dashboard, pass the input parameters in the form and click submit button.
5. Invokes ML models based on the input paramaeters.
6. Gets output from the model and sends to the cognos dashboard to display


# Included Components

* [JavaScript](https://www.w3schools.com/js/) - Develop forms to capture user inputs, later these forms can be imported to cognos dashboards.

* [IBM Watson Studio](https://www.ibm.com/cloud/watson-studio): Analyze data using RStudio, Jupyter, and Python in a configured, collaborative environment that includes IBM value-adds, such as managed Spark.

* [IBM Cloud Object Storage](https://console.bluemix.net/catalog/services/cloud-object-storage): An IBM Cloud service that provides an unstructured cloud data store to build and deliver cost effective apps and services with high reliability and fast speed to market. This code pattern uses Cloud Object Storage.

* [d3js](https://d3js.org/) - Develop charts like pie, bar, or some fancy charts sunburst etc which can later be imported to cognos application.

* Cognos (version 11.0.11) BI server - On Prim version of Cognos.

## Featured Technologies

* [D3js](https://d3js.org/):  
* [Analytics](https://developer.ibm.com/code/technologies/analytics/): Analytics delivers the value of data for the enterprise.
* [Cognos Analytics](https://www.computerworld.com/article/2906336/emerging-technology/what-is-artificial-intelligence.html):  

## Watch The Video

Will be uploaded shortly.



## Steps
Follow these steps to setup and run this code pattern. The steps are described in detail below.
1. [Pre-requisites](#1-pre-requisites)
2. [Create watson machine learning model](#2-create-watson-machine-learning-model)
3. [Create custom control widgets](#3-create-custom-control-widgets)
4. [Build cognos report and import custom widget](#4-build-cognos-report-and-import-custom-widget)
5. [Analyse the invoked machine learning model](#5-analyse-the-invoked-machine-learning-model)




## 1. Pre-requisites

- Admin access to cognos 11.0.11 server to place javascript files to the cognos webcontent folder.

- IBM Cloud account: You must have IBM Cloud account to work with this code pattern. If you do not have an IBM Cloud account, you can create a one month free trail account [here](https://console.bluemix.net/)



## 2. Create watson machine learning model

- Sign up for IBM's [Watson Studio](http://dataplatform.ibm.com/)

- Launch watson studio

![](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/images/launch_WS.png)

- Create a new Watson Studio project.

![](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/images/ws_newProj.png)

By creating a project in Watson Studio a free tier ``Object Storage`` service will be created in your IBM Cloud account. Choose the storage type as Cloud Object Storage for this code pattern.

- Define the project by giving a Name and hit 'Create'.

![](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/images/define_project.png)

- Once a project is created click on 'assets' tab.

![](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/images/WS_Assets.png)

- Under modeler flow click on new model, create a watson machine learning model to predict customer churn.

![](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/images/modeller.png)

- Select model type as 'sample model' radio button
![](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/images/sample_wml_model.png)

- You created and saved the model. It's time to deploy it. Fromthe deployment tab, click on 'Add to deployment' and select deployment type as 'web service'.

![](https://github.com/srikanthIBM/invoke-wml-using-cognos-custom-control/blob/master/images/add_to_deploy.png)





### Use case details: 
Customer churn occurs when customers or subscribers stop doing business with a company or service, also known as customer attrition. It is also referred as loss of clients or customers. One industry in which churn rates are particularly useful is the telecommunications industry, because most customers have multiple options from which to choose within a geographic location.
Using this kind of data and with the help of watson machine learning model output, you will be able to predict the most likely churn customers from the cognos dashboard and by taking appropriate actios(such as giving offers and needful service) will decrease the churn rate and prevent customer attrition.
Contract is the most important variable to predict customer churn or not churn.

- Authorization
Step by step instruction how to use Watson Machine Learning service can be found [here](https://dataplatform.cloud.ibm.com/docs/content/analyze-data/ml-overview.html?context=analytics)

[IBM Watson Machine Learning Credentials](https://watson-ml-api.mybluemix.net/#!/Deployments/post_v3_wml_instances_instance_id_published_models_published_model_id_deployments_deployment_id_online)

- Copy the watson machine learning credentials:

```
{
    "url": "https://ibm-watson-ml.mybluemix.net",
    "username": "cxxxxx-2ee2-458e-ab92-e9cxxxxxx7d",
    "password": "12344-5a3e-4d4c-9258-yyyyyyyyy",
    "instance_id": "xxxxxxx12-954e-dc32-b441-yyyyyyy11yyyy"
}
```
## 3. Create custom control widgets

- Using java script create the custom control widgets(here in our pattern, we have created a form to input the model required parameters).

- Using d3 create pie chart. In this pattern we created pie chart which shows the model output confidence score in percentage.


## 4. Build cognos report and import custom widget

- Launch cognos through url in the browser(preferred browsers are google cgrome and mozilla firefox).
 sample url as follows:
 http://Cognos_Server_IP:port/bi/?perspective=home
 
- Click on '+ New button' to open a new report studio report.

- 

-  To add a custom control, from the toolbox toolbox icon, drag the Custom control icon custom control icon to the report.
Select the custom control and click the Show properties icon Show properties icon.
To specify the location of the file that contains the JavaScript that you want to use for the control, click the Module path property.
To add JSON that configures the custom control, click the Configuration property.
For example, add JSON that sets the orientation, alignment, and background color of the control.

To specify how you want the control to interact with the report, click the UI type property.
If you do not want to render an interface, set the property to None. If you do not want events, such as mouseup, to propagate from the control to the report, set the property to UI without event propagation. If you want events to propagate to the report, set the property to UI with event propagation.



## 5. Analyse the invoked machine learning model

Throughout the analysis, we have learned several important things:
1. Features such as tenure_group, Contract, PaperlessBilling, MonthlyCharges and InternetService appear to play a role in customer churn.
2. There does not seem to be a relationship between gender and churn.
3. Customers in a month-to-month contract, with PaperlessBilling and are within 12 months tenure, are more likely to churn; On the other hand, customers with one or two year contract, with longer than 12 months tenure, that are not using PaperlessBilling, are less likely to churn.





