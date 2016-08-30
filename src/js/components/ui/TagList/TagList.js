import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import {
  CSSGrid,
  layout,
  easings,
  enterExitStyle
} from "react-stonecutter";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Tag } from "../";

const b = bem("tag-list");

export default class TagList extends Component {
  static propTypes = {
    className: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })),
    onItemDelete: PropTypes.func
  };

  static defaultProps = {
    onItemDelete: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = { hover: false };

    autoBind(this);
  }

  handleItemDelete(value) {
    this.props.onItemDelete(value);
  }

  renderTags() {
    return this.props.tags.map(tag =>
      <div className={b("item")()} key={tag.value}>
        <Tag
          value={tag.value}
          label={tag.label}
          onDelete={this.handleItemDelete}
        />
      </div>
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={mergeClassNames(b(), className)}>
        <CSSGrid
          component="div"
          columns={1}
          layout={layout.simple}
          enter={enterExitStyle.fromTop.enter}
          entered={enterExitStyle.fromTop.entered}
          exit={enterExitStyle.fromTop.exit}
          duration={260}
          easing={easings.expoOut}
          itemHeight={30}
        >
          {this.renderTags()}
        </CSSGrid>
      </div>
    );
  }
}
