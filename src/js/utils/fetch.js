import assign from "object-assign";
import fetch from "isomorphic-fetch";

export function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
}

export default function(url, params = {}) {
  const options = assign({}, {
    credentials: "include"
  }, params);

  return fetch(url, options)
    .then(checkStatus)
    .then(res => res.json());
}
