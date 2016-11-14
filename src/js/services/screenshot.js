// @flow
import fetch from "isomorphic-fetch";
import { API_ROOT } from "../constants/application";
import { checkStatus } from "../utils/fetch";
import * as cookie from "../utils/cookie";
import { getImageElementByBlob } from "../utils/image";


export function takeScreenshot(url: string): Promise<HTMLImageElement> {
  const screenshotURL = `${API_ROOT}/screenshot/${encodeURIComponent(url)}`;

  return fetch(screenshotURL, {
    headers: {
      Authorization: `Bearer ${cookie.loadToken()}`
    }
  })
    .then(checkStatus)
    .then(res => res.blob())
    .then(getImageElementByBlob);
}
