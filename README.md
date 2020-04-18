

# <img src="https://i.pinimg.com/originals/c5/70/cd/c570cde0967705a0a4b386e77d71a27b.jpg"  width="130" height="80" margin="40"/> TradeSpade - Price Signal Forecast for Financial Assets
#### CMPT 733: Big Data Programming II (Spring 2019) – Final Project
Anurag Bejju, Rishabh Singh, Nikitha Ravi , Manan Parasher<br />
abejju@sfu.ca, rishabhs@sfu.ca, nravi@sfu.ca, mparashe@sfu.ca
# Objective
- Create a one-stop solution that provides day traders assistance with intra day trading by predicting Buy and Sell signals in order to maximize profits and make optimized decisions.
- Depict the influence of social media and everyday news on market fluctuations.

# Motivation
- Can we design a model that helps with Stock and Crypto Currency forecast based on features other than just OHLCV ?
- Can we find the impact of global factors on market volatility and derive the correlation between them?
- Which technical indicators are most important for market direction analysis ?

# Repository Overview   
The main project folder contains 2 subdirectories. These are as follows: 
1. `Code` This folder contains all of the code used to design and develop our product. This subdirectory's information and structure is explained below. 
2. `Resources` This folder contains all important resources and information that would provide more indepth understanding of our product.

# Prerequisites
The below table has a list od software/tools/frameworks used to develop our project

| Software/ Tools/ Frameworks | Data_Collection | EDA | Model | Data_product |
| :---: | :---: |:---: |:---: |:---: |
| [Python 3.5](https://www.python.org/downloads/)  | :white_check_mark: |:white_check_mark:  | :white_check_mark: |:white_check_mark: |
| [Pandas](https://pandas.pydata.org/pandas-docs/stable/install.html) |:white_check_mark: |:white_check_mark: |:white_check_mark: |:white_check_mark: |
| [Numpy](https://docs.scipy.org/doc/numpy-1.13.0/user/install.html) | :white_check_mark: |:white_check_mark: |:white_check_mark: | |
| [Jupyter Notebook](https://jupyter.org/install) | :white_check_mark:|:white_check_mark: | :white_check_mark:| |
| [Matplotlib](https://matplotlib.org/users/installing.html) | :white_check_mark:| :white_check_mark:| :white_check_mark:| |
| [HVPlot](https://github.com/pyviz/hvplot) |:white_check_mark: | :white_check_mark:| | |
| [MySQL](https://dev.mysql.com/downloads/mysql/) |:white_check_mark: |:white_check_mark: | | |
| [sklearn](https://scikit-learn.org/stable/install.html) | | |:white_check_mark: | |
| [heapq](https://docs.python.org/3/library/heapq.html) | | |:white_check_mark: | |
| [Flask](http://flask.pocoo.org/docs/0.12/installation/)  | | | |:white_check_mark: |
| [JQuery](https://jquery.com/download/) | | | |:white_check_mark: |
| [Nginx](http://nginx.org/en/download.html) | | | | :white_check_mark:|
| [Gunicorn](https://pypi.org/project/gunicorn/) | | | | :white_check_mark:|
| [Supervisor](http://supervisord.org/installing.html) | | | |:white_check_mark: |
| [Chart.js](https://www.chartjs.org/) | | | | :white_check_mark:|
| [ApexCharts.js](https://apexcharts.com/) | | | | :white_check_mark:|
| [sparkline.js](https://omnipotent.net/jquery.sparkline/#s-about) | | | |:white_check_mark: |

# Repository Structure 
```
.
├── Code                                        # Contains the entire product Code
│   ├── Data_Collection                         # Folder contains information on Data Collection
│       ├── Data
│       ├── Data-Collection-Scripts             # Contains data collection information from 6 sources. STOCKS, CRYPTOCURRENCIES, REDDIT, TWITTER, GENERAL NEWS, FINANCIAL NEWS
│       ├── Hourly-Processed-Dat
│           ├── Cryptocurrency                  # Contains Cryptocurrency data and it's relevant Reddit and Twitter data
│           ├── Final Data                      # Final Stocks and Crypto data obtained on aggregation of the multiple data sources
│           ├── News                            # Contains processed General News and Financial News data
│           ├── Stocks                          # Contains Stocks data and it's relevant Reddit and Twitter data
│       ├── Pre-Processed-Data
│           ├── Stocks Data                     # Preprocessed Stocks data folder
│           ├── Twitter Data                    # Preprocessed Twitter data for both Stocks and Crypto
│           │   ├── Crypto
│           │   ├── Stocks
│           ├── Twitter Data - Cleaned          # Cleaned Twitter data for processing it further
│           │   ├── Crypto
│           │   ├── Stocks
│   ├── Data_Product                            # Contains all files needed for Web Application
│       ├── README.md
│       ├── data                                # Contains data for the web application
│       ├── main.py                             # Contains all python functions
│       ├── static                              # Contains JS and CSS files
│       └── templates                           # Contains HTML files
│   ├── Exploratory_Data_Analysis               # Contains Jupyter Notebooks with EDA performed on Twitter, Reddit, General News and Financial News
│   └── Model                                   # Contains Model Training, Experimentation and Prediction information
│       ├── Data\ Predicted                     # Contains the data predicted by the model after training
│       ├── bitcoin_keras_neuralnetwork.ipynb
│       ├── lstm.ipynb
│       └── model.ipynb                         # Selected Model
├── Documentation                               # Documentation for our project
│   ├── milestone.pdf
│   ├── poster.pdf
│   └── proposal.pdf
├── README.md
```
# Quickstart Guide

`Data_Collection`: This folder contains all the the custom made scripts used to download *9.71 million records (around 52.4 GB) * worth of data from 6 different sources. This data is for 9 stocks and 9 cryptocurrencies spanning from 1st March 2018 to 19th Feb 2019. <br />
`Exploratory_Data_Analysis`: This folder contains all the Jupyter Notebooks with EDA performed on Twitter, Reddit, General News and Financial News. This stage was crucial to understand relationships and formalize parameters that would be used in our model. <br />
`Model`: This folder has the code used to build our XGBoost Model and the results obtained from it<br />
`Data_Product`: It had the entire code for the deploying the web application. It is currently hosted on SFU Cloud<br />

# Quick Links to our product

`Home Page`: http://nml-cloud-58.cs.sfu.ca/tradespade <br />
`Dynamic Crypto Dashboard`: http://nml-cloud-58.cs.sfu.ca/cryptocurrencies <br />
`Dynamic Stocks Dashboard`: http://nml-cloud-58.cs.sfu.ca/stocks <br />
`Exploratory Data Analysis`: http://nml-cloud-58.cs.sfu.ca/eda <br />
`Data_Collection`: http://nml-cloud-58.cs.sfu.ca/data_collection <br />

# Youtube Link

`Youtube Link`: https://www.youtube.com/watch?v=7khgvYT3dO8 <br />

# References

http://gonzalopla.com/predicting-stock-exchange-prices-with-machine-learning/

## Note
Due to a bug in gitlab, some output plots of jupyter notebook were not visible. So a separate file "xgboost_model_with_ouptuts.pdf" has been created in the same folder (tradespade/Code/Model) to display the entire notebook with the outputs and the plots.



