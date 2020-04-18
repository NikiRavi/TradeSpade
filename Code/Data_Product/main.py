from flask import Flask, render_template,jsonify, request
import json
import pandas as pd
from datetime import datetime
import numpy as np
app = Flask(__name__)

@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', '', type=str)
    type = request.args.get('type', '', type=str)
    filename = 'data/'+type+'/table.json'
    result = pd.read_json(filename)
    result = result.replace(np.nan, '', regex=True)
    result = result[result.asset_name == a].head(9)
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True).astype(str)
    table = json.loads(result.to_json(orient='records'))
    return jsonify(result=table )

@app.route('/_complete_graph')
def get_timeseries():
    a = request.args.get('a', '', type=str)
    type = request.args.get('type', '', type=str)
    filename = 'data/'+type+'/completegraph.json'
    result = pd.read_json(filename)
    if type == 'cryptocurrencies':
        result = result[result.asset_name == a].iloc[::10, :]
    else:
        result = result[result.asset_name == a]
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True).astype(str)
    table = json.loads(result.to_json(orient='records'))
    filename = 'data/'+type+'/sentigraph.json'
    result = pd.read_json(filename)
    result = result[result.asset_name == a]
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True).astype(str)
    table1 = json.loads(result.to_json(orient='records'))

    filename = 'data/'+type+'/reddit_count.json'
    result = pd.read_json(filename)
    result = result[result.asset_name == a]
    reddit_count = json.loads(result.to_json(orient='records'))


    filename = 'data/'+type+'/news_count.json'
    result = pd.read_json(filename)
    result = result[result.asset_name == a]
    news_count = json.loads(result.to_json(orient='records'))

    filename = 'data/'+type+'/fin_count.json'
    result = pd.read_json(filename)
    result = result[result.asset_name == a]
    fin_count = json.loads(result.to_json(orient='records'))

    filename = 'data/'+type+'/tweet_count.json'
    result = pd.read_json(filename)
    result = result[result.asset_name == a]
    tweet_count = json.loads(result.to_json(orient='records'))

    filename = 'data/'+type+'/plot2.json'
    result = pd.read_json(filename)
    result = result[(~result.open.isna())]
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True)
    if type == 'cryptocurrencies':
        result = result[result.asset_name == a].iloc[::10, :]
    else:
        result = result[result.asset_name == a]
    max_val = result['open'].max()
    result['buy_predicted'] = result['predicted']
    result['sell_predicted'] = result.predicted.replace({0:1, 1:0})
    result = result.sort_values('created_utc',ascending=True)
    jsonfiles = json.loads(result.to_json(orient='records'))

    filename = 'data/'+type+'/table.json'
    result = pd.read_json(filename)
    result = result.replace(np.nan, '', regex=True)
    a = request.args.get('a', '', type=str)
    result = result[result.asset_name == a].head(9)
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True).astype(str)
    table2 = json.loads(result.to_json(orient='records'))

    return jsonify(result=table,senti_result=table1,reddit_count=reddit_count,news_count=news_count,fin_count=fin_count,tweet_count=tweet_count,plot1=jsonfiles,results=table2 )


@app.route('/stocks', methods=("POST", "GET"))
def stocks():
    result = pd.read_json('data/stocks/plot2.json')
    result = result[(~result.open.isna())]
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True)
    result['buy_predicted'] = result['predicted']
    result['sell_predicted'] = result.predicted.replace({0:1, 1:0})
    jsonfiles = json.loads(result.to_json(orient='records'))
    result = pd.read_json('data/stocks/table.json')
    tempp = result[(result.created_utc == '2019-02-19T13:00:00.000Z') & (~result.high.isna())]
    stock = tempp[['asset_name','predicted']]
    stock = stock.replace(np.nan, '', regex=True)
    stock = json.loads(stock.to_json(orient='records'))
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True).astype(str)
    table = json.loads(result.to_json(orient='records'))
    result = pd.read_json('data/stocks/news.json')
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True).astype(str)
    news = json.loads(result.to_json(orient='records'))

    return render_template('stocks.html',plot1=jsonfiles,table=table,news=news, stocks=stock)


@app.route('/cryptocurrencies', methods=("POST", "GET"))
def cryptocurrencies():
    result = pd.read_json('data/cryptocurrencies/plot2.json')
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True)
    result = result[result.asset_name == 'Bitcoin'].iloc[::10, :]
    result = result.sort_values('created_utc',ascending=True)
    max_val = result['open'].max()
    result['buy_predicted'] = result['predicted']
    result['sell_predicted'] = result.predicted.replace({0:1, 1:0})
    jsonfiles = json.loads(result.to_json(orient='records'))

    result = pd.read_json('data/cryptocurrencies/table.json')
    tempp = result[(result.created_utc == '2019-02-19T13:00:00.000Z') & (~result.high.isna())]
    stock = tempp[['asset_name','predicted']]
    stock = json.loads(stock.to_json(orient='records'))
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True).astype(str)
    table = json.loads(result.to_json(orient='records'))
    result = pd.read_json('data/cryptocurrencies/news.json')
    result['created_utc'] = pd.to_datetime(result['created_utc'],infer_datetime_format=True).astype(str)
    news = json.loads(result.to_json(orient='records'))

    return render_template('cryptocurrencies.html',plot1=jsonfiles,table=table,news=news, stocks=stock)

@app.route('/eda', methods=("POST", "GET"))
def eda():
    return render_template('eda.html')
@app.route('/data_collection', methods=("POST", "GET"))
def data_collection():
    return render_template('data_collection.html')
@app.route('/General_News_EDA', methods=("POST", "GET"))
def General_News_EDA():
    return render_template('eda/General_News_EDA.html')

@app.route('/Reddit_EDA', methods=("POST", "GET"))
def Reddit_EDA():
    return render_template('eda/Reddit_EDA.html')
@app.route('/Financial_News_EDA', methods=("POST", "GET"))
def Financial_News_EDA():
    return render_template('eda/Financial_News_EDA.html')
@app.route('/Twitter_EDA', methods=("POST", "GET"))
def Twitter_EDA():
    return render_template('eda/Twitter_EDA.html')




@app.route('/twitter_cryptocurrency', methods=("POST", "GET"))
def twitter_cryptocurrency():
    return render_template('data_collection/twitter-cryptocurrency.html')
@app.route('/reddit_stocks', methods=("POST", "GET"))
def reddit_stocks():
    return render_template('data_collection/reddit-stocks.html')
@app.route('/reddit_cryptocurrencies', methods=("POST", "GET"))
def reddit_cryptocurrencies():
    return render_template('data_collection/reddit-cryptocurrencies.html')
@app.route('/twitter_stocks', methods=("POST", "GET"))
def twitter_stocks():
    return render_template('data_collection/twitter-stocks.html')



@app.route('/OHLCV_stock', methods=("POST", "GET"))
def OHLCV_stock():
    return render_template('data_collection/OHLCV-stock.html')

@app.route('/OHLCV_cryptocurrency', methods=("POST", "GET"))
def OHLCV_cryptocurrency():
    return render_template('data_collection/OHLCV-cryptocurrency.html')
@app.route('/general_news', methods=("POST", "GET"))
def general_news():
    return render_template('data_collection/general-news.html')
@app.route('/financial_times_news', methods=("POST", "GET"))
def financial_times_news():
    return render_template('data_collection/financial-times-news.html')


@app.route('/tradespade', methods=("POST", "GET"))
def tradespade():
    return render_template('home.html')







if __name__ == '__main__':
    app.run(debug=True)
