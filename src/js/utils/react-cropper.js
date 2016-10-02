// @flow
import ExecutionEnvironment from "../constants/execution-environment";

/* eslint-disable no-unused-vars */
class ReactCropperMock {}
/* eslint-enable no-unused-vars */

let ReactCropper = null;

if (ExecutionEnvironment.canUseDOM) {
  ReactCropper = require("react-cropper").default;
} else {
  ReactCropper = ReactCropperMock;
}

export default ReactCropper;
