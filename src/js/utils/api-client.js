import _ from "lodash";
import { API_ROOT } from "../constants/application";
import fetch from "./fetch";
import * as cookie from "./cookie";

export default class ApiClient {
  constructor(endpoint, basicRoot = true) {
    const normalizedEndpoint = _.trim(endpoint, "/");

    this.endpoint = basicRoot ? `${API_ROOT}/${normalizedEndpoint}` : _.trimEnd(endpoint, "/");
  }

  request(method, url, request = {}, useToken = true) {
    const normalizedURL = _.trimStart(url, "/");
    const params = {
      ...request,
      method
    };

    let headers = params.hasOwnProperty("headers") ? params.headers : {};

    if (useToken) {
      const token = cookie.loadToken();
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`
      };
    }

    if (params.hasOwnProperty("body") && (_.isPlainObject(params.body) || Array.isArray(params.body))) {
      headers = {
        ...headers,
        Accept: "application/json",
        "Content-Type": "application/json"
      };

      params.body = JSON.stringify(params.body);
    }

    params.headers = headers;

    return fetch(`${this.endpoint}/${normalizedURL}`, params);
  }

  get(url, request = {}, useToken = true) {
    return this.request("GET", url, request, useToken);
  }

  post(url, request = {}, useToken = true) {
    return this.request("POST", url, request, useToken);
  }

  put(url, request = {}, useToken = true) {
    return this.request("PUT", url, request, useToken);
  }

  delete(url, request = {}, useToken = true) {
    return this.request("DELETE", url, request, useToken);
  }
}
