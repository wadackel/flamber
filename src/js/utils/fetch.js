import assign from "object-assign";
import libFetch from "isomorphic-fetch";

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
  const options = assign({}, {
    credentials: "include"
  }, params);

  return libFetch(url, options)
    .then(checkStatus)
    .then(res => res.json());
}

// TODO: Rename
export function fetchJSON(url, body, method = "POST", params = {}) {
  const options = assign({}, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    method
  }, params);

  return fetch(url, options);
}
