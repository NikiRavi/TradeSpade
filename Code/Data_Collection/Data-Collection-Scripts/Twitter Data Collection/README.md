# Scrapper to get Old tweets

---

[Twitter's API](https://dev.twitter.com/rest/reference/get/search/tweets) no longer allows the retrieval of tweets past 7 days old using apps. Some third party apps are available to allow retrieval of tweets past 7 days old but you need to spend money in most cases. This script was written to enable the retrieval of tweets past the limitation of the API. Most of the code were written and modified based on @Jefferson-Henrique's [scraper](https://github.com/Jefferson-Henrique/GetOldTweets-python). The code was modified to support Python 3 and to comply to pep coding standards.

---

#### Installation
Install python dependencies by typing `make install` in the terminal.

---

#### Command Line Usage
The script can be used by typing `python main.py` and requires an argument passed with it. For more information you may type `python main.py -help` in the command line.

---

#### Parameters
The script can be run with 5 arguments. The **query** and/or **username** argument must be used. The other arguments are optional.

The commands to run the file is as follows :

query - python main.py --query "#query"
username - python main.py --username "username"
|since|YYYY-MM-DD| - python main.py --query "query" --since 2016-01-01
|until|YYYY-MM-DD| - python main.py --query "query" --until 2017-04-01
The tweets between a time period can be obtained using a command with since and until dates.
