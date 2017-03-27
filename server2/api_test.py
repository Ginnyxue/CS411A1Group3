import json
import sys

from careerjet_api_client import CareerjetAPIClient

# NOTE: NEVER put API key in code and post to GitHub
careerjet_key = sys.argv[0]

cj = CareerjetAPIClient("en_US")
result_json = cj.search({
    'location': 'california',
    'keywords': 'python',
    'affid': careerjet_key,
    'user_ip': '11.22.33.44',
    'url': 'http://www.example.com/jobsearch?q=python&l=london',
    'user_agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0'
})

print(json.dumps(result_json, sort_keys=True, indent=4, separators=(',', ': ')))
