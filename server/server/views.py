import json
import os
import urllib2
from urllib import urlencode

from careerjet_api_client import CareerjetAPIClient
from django.http import JsonResponse

from models import SearchResult

careerjet_key = os.environ.get('CAREERJET_KEY')
cj = CareerjetAPIClient("en_US")
indeed_key = os.environ.get('INDEED_KEY')


def careerjet_query(job, location, url, user_ip, user_agent):
    cj_query = {
        'location': location,
        'keywords': job,
        'affid': careerjet_key,
        'user_ip': user_ip,
        'url': url,
        'user_agent': user_agent,
    }

    # Get the first results page
    result_json = cj.search(cj_query)

    # Get the other pages
    all_jobs = result_json['jobs']
    for page in range(2, result_json['pages']):
        cj_query['page'] = page
        cj_query['url'] = url
        result_json = cj.search(cj_query)
        all_jobs += result_json['jobs']

    return all_jobs


def indeed_query(job, location, user_ip, user_agent):
    all_jobs = []
    start = 0
    num_requests = 0
    while start < 10000:
        query = {
            'publisher': indeed_key,
            'v': 2,
            'format': 'json',
            'q': job,
            'l': location,
            'limit': 25,
            'latlong': 1,
            'userip': user_ip,
            'useragent': user_agent,
            'start': start
        }
        url = "http://api.indeed.com/ads/apisearch?" + urlencode(query)
        response = json.loads(urllib2.urlopen(url).read())
        num_requests += 1
        all_jobs += response['results']
        start = response['end'] + 1

        if len(response['results']) < 25:
            break

    return all_jobs


def jobs(request):
    # variables declared with HTTP GET, otherwise defaults provided
    job = request.GET.get('job', 'java')
    location = request.GET.get('location', 'california')

    # TODO - These should be found in the HTTP request headers
    user_ip = request.GET.get('user_ip', '11.22.33.44')
    url = request.GET.get('url', 'http://www.example.com/jobsearch?q=python&l=london')
    user_agent = request.GET.get('user_agent', 'Mozilla/5.0 (X11; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0')

    # Look for keywords in database
    results = SearchResult.objects.filter(job=job, location=location)

    # If length of results is 0
    if len(results) == 0:
        all_jobs = indeed_query(job, location, user_ip, user_agent)
        new_result = SearchResult(job=job,
                                  location=location,
                                  result=json.dumps(all_jobs, sort_keys=True, indent=0, separators=(',', ': ')))

        new_result.save()
        results = [new_result]

    return JsonResponse({
        'jobs': json.loads(results[0].result)
    })
