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

export function sendLoginRequest(id_token) {
  let params = {
    token: id_token
  };
  return fetch("/_/login?" + encodeQuery(params))
    .then(checkHttpResponseStatus)
}

// Cookie functions: http://stackoverflow.com/a/24103596/7384501
function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

export function isLoggedIn() {
  let userId = readCookie("user_id");
  return userId !== null;
}

export function logOut() {
  eraseCookie("user_id");
}




