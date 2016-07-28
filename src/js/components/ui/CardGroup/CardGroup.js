import React, { Component, PropTypes } from "react";
import {
  SpringGrid,
  layout as GridLayout,
  measureItems,
  makeResponsive,
  enterExitStyle
} from "react-stonecutter";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card-group");
const CardGrid = makeResponsive(measureItems(SpringGrid), {
  maxWidth: 1920
});

export default class CardGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    layout: PropTypes.oneOf([Layout.RANDOM_GRID, Layout.GRID, Layout.LIST]),
    columnWidth: PropTypes.number,
    gutter: PropTypes.number
  };

  static defaultProps = {
    layout: Layout.GRID,
    columnWidth: 300,
    gutter: 5
  };

  render() {
    const {
      children,
      className,
      layout,
      columnWidth,
      gutter
    } = this.props;

    const modifier = { [layout]: true };
    const layoutType = layout === Layout.RANDOM_GRID
      ? GridLayout.pinterest
      : GridLayout.simple;

    return (
      <CardGrid
        component="div"
        className={mergeClassNames(b(modifier), className)}
        columnWidth={columnWidth}
        gutterWidth={gutter}
        gutterHeight={gutter}
        layout={layoutType}
        enter={enterExitStyle.fromTop.enter}
        entered={enterExitStyle.fromTop.entered}
        exit={enterExitStyle.fromTop.exit}
        springConfig={{
          stiffness: 160,
          damping: 20
        }}
      >
        {React.Children.map(children, card =>
          <div key={card.id} className={b("card")}>
            {card}
          </div>
        )}
      </CardGrid>
    );
  }
}
