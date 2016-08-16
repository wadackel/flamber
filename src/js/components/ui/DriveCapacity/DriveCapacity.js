import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ProgressBar } from "../";

const b = bem("drive-capacity");

function toGB(value, digit = 0) {
  return (value / 1024 / 1024 / 1024).toFixed(digit);
}

export default class DriveCapacity extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    limit: PropTypes.number,
    usage: PropTypes.number
  };

  render() {
    const {
      className,
      limit,
      usage
    } = this.props;

    return (
      <div className={mergeClassNames(b(), className)}>
        <div className={b("text")()}>
          <div className={b("google-drive")()}>
            <img
              src="/images/google-drive-icon@2x.png"
              width={14}
              height={12}
              alt="Google Drive"
            />
            Google Drive
          </div>
          <div className={b("usage")()}>{toGB(usage, 2)}GB / {toGB(limit)}GBを使用中</div>
        </div>
        <ProgressBar
          className={b("progress-bar")()}
          max={limit}
          min={0}
          value={usage}
        />
      </div>
    );
  }
}
