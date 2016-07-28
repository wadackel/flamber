import React, { Component, PropTypes } from "react";
import {
  CSSGrid,
  layout as GridLayout,
  easings,
  measureItems,
  makeResponsive,
  enterExitStyle
} from "react-stonecutter";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card-group");
const CardGrid = makeResponsive(
  measureItems(CSSGrid, {
    measureImages: true,
    background: true
  }),
  {
    maxWidth: 1920
  }
);

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
    columnWidth: 280,
    gutter: 10
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

    return (
      <CardGrid
        component="div"
        className={mergeClassNames(b(modifier), className)}
        columnWidth={columnWidth}
        gutterWidth={gutter}
        gutterHeight={gutter}
        layout={GridLayout.pinterest}
        enter={enterExitStyle.fromTop.enter}
        entered={enterExitStyle.fromTop.entered}
        exit={enterExitStyle.fromTop.exit}
        duration={460}
        easing={easings.expoOut}
        itemHeight={null}
      >
        {React.Children.map(children, card =>
          <div
            key={card.id}
            className={b("card")}
            style={{ width: columnWidth }}
          >
            {card}
          </div>
        )}
      </CardGrid>
    );
  }
}
