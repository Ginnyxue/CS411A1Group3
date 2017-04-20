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
  return fetch("_/jobs?" + encodeQuery(params))
    .then(checkHttpResponseStatus)
    .then(response => response.json());
}