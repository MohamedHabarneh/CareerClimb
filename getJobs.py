import requests
from bs4 import BeautifulSoup
import math

#TODO: finish scrapping from linkedin 
target_url=f'https://www.linkedin.com/jobs/search/?currentJobId=3736345567&f_E=2&geoId=102095887&keywords=Software%20Engineer&location=California%2C%20United%20States&origin=JOB_SEARCH_PAGE_LOCATION_AUTOCOMPLETE&refresh=true&sortBy=R
'
#use this https://www.scrapingdog.com/blog/scrape-linkedin-jobs/
number_of_loops = math.ceil(969/25)
l = []
for i in range(0, number_of_loops):
    res = requests.get(target_url.format(i))
    soup = BeautifulSoup(res.text, 'html.parser')
    alljobs_found = soup.findall("li")


    for x in range(0, len(alljobs_found)):
        jobid = alljobs_found[x].find("div", {"class" : "base-card"}).get('data-entity-urn').split(":")[3]
        l.append(jobid)

