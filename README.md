# US_Housing_Market   
### https://shuwen0529.github.io/US_Housing_Market/

![TitleImg.jpeg](images/TitleImg.jpg)

# Background
The housing market is influenced by the state of the economy, interest rates, real income and changes in the size of the population. As well as these demand-side factors, house prices will be determined by available supply. With periods of rising demand and limited supply, we will see rising house prices, rising rents and increased risk of homelessness.
![Factors.jpeg](images/factors-affecting-house-prices.jpg)

The above mentioned factors are catogorized as **'Intrinsic factors'**. There are also important **'Extrinsic factors'** influence house prices, such as the convenience of public transportation, schools nearby has high reputations, the quality of life, the technology trigged increase of house price like in Silicon Valley; the crime rate; the cost of living like utility, the immigration of population, etc.

# Objective
+ What is the geographic distribution of the median house price over the U.S.?
+ How do the intrinsic factors in market-side, demand-side, supply-side influence median house price in a selected state?
+ How do the ranks of median house price in a state related to the extrinsic factors?


In this project, we target at the house market and the factors influence it in the United States 51 states during 2012-2019.
Not all of the variables mentioned previously possess open data source, here we gather those are available online (in the format of cvs files, json, APIs and sqlite), aggregate and process different data sources by python scripts, and utilize javascript visualization tools (D3.js) for HTML and CSS to create a dashboard showing off the analysis we've done. We aim to answer the following questions:
+ What is the latest geographic distribution of the median house price over the US?
+ What is the over trend of the median house price in the selected state?
+ How is the house price in the selected state related to the housing supply, the economy (i.e. the poverty percent, unemployment rate) and the living environment (i.e. crime rate, education scores)?

## Step 1 - Data Gathering and Processing
+ Monthly residential data by states, including 33 variables during 2012-2019 in csv and JSON files (https://www.realtor.com/research/data/).
+ Annual poverty percentage by states from United States Census Bureau in SQL files (https://www.census.gov/data/tables/2018/demo/income-poverty.html).
+ Annual mortgage and interests change in each state.
+ We also present a few indirect but important factors influencing house prices, including crime rate (https://crime-data-explorer.fr.cloud.gov/), education ranks (http://worldpopulationreview.com/states/best-states-for-education/).

## Step 2 - Data Analysis
+ We use python to create data frames that contain monthly median listing price, days on market, new listing count. The latter two factors represent demand-side factors in house market. By plotting monthly time series, we can get a feeling of how the demand-side factors influence house market in the selected state.
+ We use python to create data frames that contain annual averaged crime rates (a sum of property and violet crime rates) poverty percentage in the selected states.

## Step 3 - Data Visualization

### Click [HERE](https://shuwen0529.github.io/US_Housing_Market/) to play!

