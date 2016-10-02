// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ProgressBar } from "../";
import { LogoIcon } from "../../svg-icons/";

const b = bem("upload-status");

type Props = {
  className?: string;
  limit: number;
  usage: number;
};

export default function UploadStatus(props: Props) {
  const {
    className,
    limit,
    usage
  } = props;

  return (
    <div className={mergeClassNames(b(), className)}>
      <div className={b("meta")()}>
        <div className={b("logo")()}><LogoIcon /></div>
        <div className={b("usage")()}>{usage}/{limit} 個のアイテムを作成</div>
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
