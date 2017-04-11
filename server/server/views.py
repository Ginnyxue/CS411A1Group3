from django.http import JsonResponse
from models import SearchResult

import json
import sys
from careerjet_api_client import CareerjetAPIClient

careerjet_key = sys.argv[0]


def test(request):
    # variables declared with HTTP GET, otherwise defaults provided
    data = request.GET.get('data', '')
    location = request.GET.get('location', 'california')
    keywords = request.GET.get('keywords', 'python')
    affid = careerjet_key
    user_ip = request.GET.get('user_ip', '11.22.33.44')
    url = request.GET.get('url', 'http://www.example.com/jobsearch?q=python&l=london')
    user_agent = request.GET.get('user_agent', 'Mozilla/5.0 (X11; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0')

    # look for keywords in database
    results = SearchResult.objects.get(search=keywords)

    # if length of results is 0
    if len(results)==0:
        # get result from API
        results = cj.search({
            'data': data,
            'location': location,
            'keywords': keywords,
            'affid': careerjet_key,
            'user_ip': user_ip,
            'url': url,
            'user_agent': user_agent
        })
        # add result to database
        new_result=SearchResult(search=keywords, result=json.dumps(result_json, sort_keys=True, indent=0, separators=(',', ': ')))
        new_result.save()
        results[0]=new_result

    return JsonResponse({
        'data': results[0].result
    })