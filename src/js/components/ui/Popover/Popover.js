// @flow
import autoBind from "auto-bind";
import React from "react";
import shareConfig from "../../../share-config.json";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import RenderToLayer from "../internal/RenderToLayer";
import PopoverAnimation from "../internal/PopoverAnimation";
import type { Origin } from "../../../types/prop-types";

const b = bem("popover");

type OffsetDetail = {
  top: number;
  middle: number;
  bottom: number;
  right: number;
  center: number;
  left: number;
};

type TriggerPosition = $All<OffsetDetail, {
  width: number;
  height: number;
}>;

type Props = {
  children: React$Element<any>;
  className?: string;
  open: boolean;
  origin: Origin;
  triggerElement: ?HTMLElement;
  triggerOrigin: Origin;
  useLayerForClickAway: boolean;
  onRequestClose?: Function;
};

type State = {
  open: boolean;
  closing: boolean;
};

export default class Popover extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    open: false,
    origin: {
      vertical: "top",
      horizontal: "left"
    },
    triggerOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    useLayerForClickAway: true,
    onRequestClose: () => {}
  };

  timer: number = 0;
  triggerElement: ?HTMLElement = null;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      open: props.open,
      closing: false
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.open !== this.state.open) {
      if (nextProps.open) {
        this.bindCloseEvents();
        this.triggerElement = nextProps.triggerElement || this.props.triggerElement;
        this.setState({ open: true });

      } else {
        this.setState({ closing: true });
        this.timer = setTimeout(() => {
          this.unbindCloseEvents();
          this.setState({
            open: false,
            closing: false
          });
        }, shareConfig["popover-duration"]);
      }
    }
  }

  componentDidUpdate() {
    this.setPositions();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClickAway() {
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose("clickAway");
    }
  }

  handleClose(e: Event) {
    this.setPositions();
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose(e.type);
    }
  }

  bindCloseEvents(): void {
    window.addEventListener("scroll", this.handleClose, false);
    window.addEventListener("resize", this.handleClose, false);
  }

  unbindCloseEvents(): void {
    window.removeEventListener("scroll", this.handleClose, false);
    window.removeEventListener("resize", this.handleClose, false);
  }

  setPositions(): void {
    const { open, closing } = this.state;

    if (!open || !this.refs.layer) return;

    const { origin, triggerOrigin } = this.props;
    const triggerElement = this.props.triggerElement || this.triggerElement;
    const layer = this.refs.layer.getLayer();

    if (!layer) return;

    const popoverElement = layer.children[0];

    if (!popoverElement || !triggerElement) return;

    const trigger = this.getTriggerPosition(triggerElement);
    const popover = this.getPopoverPosition(popoverElement);

    popover.top = trigger[triggerOrigin.vertical] - popover[origin.vertical];
    popover.left = trigger[triggerOrigin.horizontal] - popover[origin.horizontal];

    popoverElement.style.top = `${Math.max(closing ? popover.top : 0, popover.top)}px`;
    popoverElement.style.left = `${Math.max(closing ? popover.left : 0, popover.left)}px`;
  }

  getTriggerPosition(el: HTMLElement): TriggerPosition {
    const { top, left } = el.getBoundingClientRect();
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const right = left + width;
    const bottom = top + height;
    const center = left + width / 2;
    const middle = top + height / 2;

    return {
      width,
      height,
      top,
      right,
      bottom,
      left,
      center,
      middle
    };
  }

  getPopoverPosition(el: HTMLElement): OffsetDetail {
    const { offsetWidth, offsetHeight } = el;

    return {
      top: 0,
      middle: offsetHeight / 2,
      bottom: offsetHeight,
      left: 0,
      center: offsetWidth / 2,
      right: offsetWidth
    };
  }

  renderLayer(): React$Element<any> {
    const {
      children,
      className,
      origin
    } = this.props;

    const {
      open,
      closing
    } = this.state;

    return (
      <PopoverAnimation
        className={mergeClassNames(b(), className)}
        baseClassName="popover-animation"
        open={open && !closing}
        origin={origin}
      >
        {children}
      </PopoverAnimation>
    );
  }

  render() {
    const { useLayerForClickAway } = this.props;

    return (
      <RenderToLayer
        ref="layer"
        open={this.state.open}
        componentClickAway={this.handleClickAway}
        useLayerForClickAway={useLayerForClickAway}
        render={this.renderLayer}
      />
    );
  }
}
