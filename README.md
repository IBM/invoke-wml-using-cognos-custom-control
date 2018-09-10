# invoke-wml-using-cognos-custom-control
***Work In Progress***

It is always a tedious task to see a real time Machine Learning model output from Cognos Dashboard. 
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

* [d3js](https://d3js.org/) - Develop charts like pie, bar, or some fancy charts sunburst etc which can later be imported to cognos application.

* Cognos (version 11.0.11) BI server - On Prim version of Cognos.

## Featured Technologies

* [D3js](https://d3js.org/):  
* [Cognos Analytics](https://www.computerworld.com/article/2906336/emerging-technology/what-is-artificial-intelligence.html):  

## Watch The Video

Will be uploaded shortly.



## Steps
Follow these steps to setup and run this code pattern. The steps are described in detail below.
1. [Pre-requisites](#1-pre-requisites)




## 1. Pre-requisites
-
