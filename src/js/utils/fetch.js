import libFetch from "isomorphic-fetch";

function handleErrors(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res;
}

export function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;

  } else {
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
}

export default function fetch(url, params = {}) {
  const options = {
    credentials: "include",
    ...params
  };

  return libFetch(url, options)
    .then(handleErrors)
    .then(checkStatus)
    .then(res => res.json());
}

// TODO: Remove
export function fetchJSON(url, body, method = "POST", params = {}) {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    method,
    ...params
  };

  return fetch(url, options);
}
