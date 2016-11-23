// @flow
import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import type { GridLayout, GalleryLayout, ListLayout } from "../../../types/prop-types";

const b = bem("card-group");

type Props = {
  children?: React$Element<any>;
  className?: string;
  layout: GridLayout | GalleryLayout | ListLayout;
  columnWidth: number;
  gutter: number;
};

export default class CardGroup extends Component {
  props: Props;

  static defaultProps = {
    layout: Layout.GRID,
    columnWidth: 280,
    gutter: 20
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
    const isList = layout === Layout.LIST;
    const width = isList ? "100%" : columnWidth;

    return (
      <StackGrid
        className={mergeClassNames(b(modifier)(), className)}
        columnWidth={width}
        gutterWidth={gutter}
        gutterHeight={gutter}
      >
        {React.Children.map(children, card =>
          <div
            key={card.id}
            className={b("card")()}
          >
            {card}
          </div>
        )}
      </StackGrid>
    );
  }
}
