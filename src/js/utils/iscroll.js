// @flow
import ExecutionEnvironment from "../constants/execution-environment";

/* eslint-disable no-unused-vars */
class IScrollMock {
  scrollTo(x: number, y: number, time?: number, easing?: any): void {}
  scrollBy(x: number, y: number, time?: number, easing?: any): void {}
  scrollToElement(el: HTMLElement, time?: number, offsetX?: number, offsetY?: number, easing?: any): void {}
  goToPage(x: number, y: number, time?: number, easing?: any): void {}
  next(): void {}
  prev(): void {}
  zoom(scale: number, x?: number, y?: number, time?: number): void {}
  on(type: string, handler: Function): void {}
  off(type: string, hanlder: Function): void {}
  refresh(): void {}
  destroy(): void {}
}
/* eslint-enable no-unused-vars */


let IScroll = null;

if (ExecutionEnvironment.canUseDOM) {
  IScroll = require("iscroll");
} else {
  IScroll = IScrollMock;
}

export default IScroll;
