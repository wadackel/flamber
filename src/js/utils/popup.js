// @flow
import _ from "lodash";
import type { Offset } from "../types/prop-types";

type YesOrNo = "yes" | "no";

type PopupSettings = {
  width: number;
  height: number;
  top?: number;
  left?: number;
  scrollbars: YesOrNo;
  toolbar: YesOrNo;
  location: YesOrNo;
  titlebar: YesOrNo;
  directories: YesOrNo;
  status: YesOrNo;
  menubar: YesOrNo;
};

const defaults: PopupSettings = {
  width: 500,
  height: 500,
  scrollbars: "no",
  toolbar: "no",
  location: "no",
  titlebar: "no",
  directories: "no",
  status: "no",
  menubar: "no"
};


function getPopupOffset(width: number, height: number): Offset {
  const wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  const wTop = window.screenTop ? window.screenTop : window.screenY;
  const left = wLeft + (window.innerWidth / 2) - (width / 2);
  const top = wTop + (window.innerHeight / 2) - (height / 2);

  return { top, left };
}

export default function openPopup(url: string, name: string, settings: PopupSettings = defaults) {
  const params: PopupSettings = { ...defaults, ...settings };
  const { top, left } = getPopupOffset(params.width, params.height);
  params.top = top;
  params.left = left;

  const settingString = _.map(params, (key, val) => `${val}=${key}`).join(",");

  return window.open(url, name, settingString);
}
