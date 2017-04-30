import json
import os
import urllib2
from urllib import urlencode

import datetime

from careerjet_api_client import CareerjetAPIClient
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse

from models import SearchResult, SavedJob, Job, User

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
    while start < 1000:
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


def indeed_single_job_query(job_id, user_ip, user_agent):
    query = {
        'publisher': indeed_key,
        'v': 2,
        'format': 'json',
        'latlong': 1,
        'userip': user_ip,
        'useragent': user_agent,
        'jobkeys': job_id
    }
    url = "http://api.indeed.com/ads/apigetjobs?" + urlencode(query)
    response = json.loads(urllib2.urlopen(url).read())

    return response['results']


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


def save_job(request):
    # TODO
    user_id = 0
    users = User.objects.filter(id=user_id)
    if len(users) == 0:
        return HttpResponseBadRequest()
    user = users[0]

    job_id = request.GET.get('jobid')
    if job_id == None:
        return HttpResponseBadRequest()

    # Check if job is already saved
    results = SavedJob.objects.filter(job_id=job_id)
    if len(results) == 0:
        # Save job
        new_saved = SavedJob(user_id=user, job_id=job_id)
        new_saved.save()

    return HttpResponse(status=204)


def get_saved_jobs(request):
    # TODO
    user_id = 0
    users = User.objects.filter(id=user_id)
    if len(users) == 0:
        return HttpResponseBadRequest()
    user = users[0]

    # Get saved jobs
    saved = SavedJob.objects.filter(user_id=user)

    # Convert saved entries into jobs
    job_data = []
    for saved_job in saved:
        job = _get_job(request, saved_job.job_id)
        if job is not None:
            job_data.append(job)

    return JsonResponse({
        'jobs': job_data
    })


def delete_saved_job(request):
    # TODO
    user_id = 0
    users = User.objects.filter(id=user_id)
    if len(users) == 0:
        return HttpResponseBadRequest()
    user = users[0]

    job_id = request.GET.get('jobid')
    if job_id is None:
        return HttpResponseBadRequest()

    # Check if job is already saved
    results = SavedJob.objects.filter(user_id=user, job_id=job_id)
    for res in results:
        res.delete()

    return HttpResponse(status=204)


def _get_job(request, job_id):
    user_ip = request.GET.get('user_ip', '11.22.33.44')
    url = request.GET.get('url', 'http://www.example.com/jobsearch?q=python&l=london')
    user_agent = request.GET.get('user_agent', 'Mozilla/5.0 (X11; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0')

    # Get job
    jobs = Job.objects.filter(job_id=job_id)
    if len(jobs) > 0:
        # Have cached job, return data
        job = jobs[0]
        return json.loads(job.data)

    # Get data from API
    response = indeed_single_job_query(job_id, user_ip, user_agent)
    if len(response) > 0:
        new_job = Job(job_id=job_id,
                      data=json.dumps(response[0], sort_keys=True, indent=0, separators=(',', ': ')))
        new_job.save()
        return json.loads(new_job.data)

    return None


def get_job(request):
    job_id = request.GET.get('jobid')
    if job_id == None:
        return HttpResponseBadRequest()
    return JsonResponse({
        'job': _get_job(request, job_id)
    })

	
def get_id(request):
	token = request.GET.get('token')
	# get ID
	users = User.objects.filter(g_id=token)
	if len(users) == 0:
		user = User(g_id=token)
        user.save()
	else:
		users=users[0]
	# set session cookie
	response = HttpResponse("")
	response.set_cookie("user_id", str(user.id))
	return response
	