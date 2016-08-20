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

export default class CardGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    layout: PropTypes.oneOf([Layout.GALLERY, Layout.GRID, Layout.LIST]),
    columnWidth: PropTypes.number,
    gutter: PropTypes.number
  };

  static defaultProps = {
    layout: Layout.GRID,
    columnWidth: 280,
    gutter: 20
  };

  constructor(props, context) {
    super(props, context);

    this.state = { Grid: null };
  }

  componentWillMount() {
    this.createGrid(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (
      props.columnWidth !== nextProps.columnWidth ||
      props.layout !== nextProps.layout
    ) {
      this.createGrid(nextProps);
    }
  }

  createGrid(props) {
    let Grid = null;

    if (props.layout !== Layout.LIST) {
      Grid = makeResponsive(measureItems(CSSGrid), {
        maxWidth: 1920,
        minPadding: 100
      });
    } else {
      Grid = CSSGrid;
    }

    this.setState({ Grid });
  }

  render() {
    const {
      children,
      className,
      layout,
      columnWidth,
      gutter
    } = this.props;

    const { Grid } = this.state;

    const modifier = { [layout]: true };

    const isList = layout === Layout.LIST;
    const columns = isList ? 1 : null;
    const itemHeight = isList ? 80 : null;
    const itemStyles = isList
      ? { width: "100%" }
      : { width: parseInt(columnWidth, 10) };
    const layoutType = isList
      ? GridLayout.simple
      : GridLayout.pinterest;

    return (
      <Grid
        component="div"
        className={mergeClassNames(b(modifier)(), className)}
        columns={columns}
        columnWidth={columnWidth}
        gutterWidth={gutter}
        gutterHeight={gutter}
        layout={layoutType}
        enter={enterExitStyle.fromTop.enter}
        entered={enterExitStyle.fromTop.entered}
        exit={enterExitStyle.fromTop.exit}
        duration={460}
        easing={easings.expoOut}
        itemHeight={itemHeight}
      >
        {React.Children.map(children, card =>
          <div
            key={card.id}
            className={b("card")()}
            style={itemStyles}
          >
            {card}
          </div>
        )}
      </Grid>
    );
  }
}
