// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { List } from "../";

const b = bem("feed-list");

type Props = {
  children?: React$Element<any>;
  className?: string;
};

export default function FeedList(props: Props) {
  const {
    children,
    className
  } = props;

  return (
    <List className={mergeClassNames(b(), className)}>
      {React.Children.map(children, item =>
        React.cloneElement(item, {
          key: item.props.name,
          className: b("item")()
        })
      )}
    </List>
  );
}
