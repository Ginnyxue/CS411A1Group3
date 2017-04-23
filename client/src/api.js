import {parse as parseQuery, stringify as encodeQuery} from "query-string";

export function checkHttpResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.status);
    error.response = response;
    throw error;
  }
}

export function createJsonPostRequest(body) {
  return {
    method: 'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  };
}

export function sendJobsRequest(job, location) {
  let params = {
    job: job,
    location: location
  };
  return fetch("/_/jobs?" + encodeQuery(params))
    .then(checkHttpResponseStatus)
    .then(response => response.json());
}

export function sendSaveJobRequest(jobId) {
  let params = {
    jobid: jobId
  };
  return fetch("/_/job/save?" + encodeQuery(params))
    .then(checkHttpResponseStatus)
}

export function sendGetJobRequest(jobId) {
  let params = {
    jobid: jobId
  };
  return fetch("/_/job/get?" + encodeQuery(params))
    .then(checkHttpResponseStatus)
    .then(response => response.json());
}

export function sendDeleteSavedJobRequest(jobId) {
  let params = {
    jobid: jobId
  };
  return fetch("/_/job/del?" + encodeQuery(params))
    .then(checkHttpResponseStatus)
}

export function sendGetAllSavedJobsRequest() {
  let params = {
  };
  return fetch("/_/jobs/saved?" + encodeQuery(params))
    .then(checkHttpResponseStatus)
    .then(response => response.json());
}
