import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { List } from "../";

const b = bem("feed-list");

export default function FeedList({
  children,
  className
}) {
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

FeedList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
