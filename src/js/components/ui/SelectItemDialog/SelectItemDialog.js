// @flow
import React, { Component, PureComponent } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { FlatButton, Dialog, Checkbox } from "../";
import { PicturesIcon } from "../../svg-icons/";

const b = bem("select-item-dialog");


type ItemValue = {
  id: any;
  image: string;
};

type Props = {
  children?: React$Element<any>;
  className?: string;
  processing: boolean | string;
  width: number;
  open: boolean;
  items: Array<ItemValue>;
  selectedId: ?any;
  onRequestClose: Function;
  onComplete?: Function;
};

type State = {
  selectId: ?any;
};


class SelectableItem extends PureComponent {
  props: $All<ItemValue, {
    selected: boolean;
    onClick: Function;
  }>;

  handleClick = (e: SyntheticMouseEvent) => {
    e.preventDefault();
    this.props.onClick(this.props.id);
  }

  render() {
    const {
      image,
      selected
    } = this.props;

    return (
      <li
        className={b("item", { selected })()}
        style={{
          backgroundImage: `url("${image}")`
        }}
        onClick={this.handleClick}
      >
        <div className={b("overlay", { selected })()} />
        <Checkbox checked={selected} />
      </li>
    );
  }
}


export default class SelectItemDialog extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    items: [],
    selectedId: null
  };

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      selectId: props.selectedId
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.selectedId !== nextProps.selectedId) {
      this.setState({ selectId: nextProps.selectedId });
    }
  }

  handleItemClick = (id: any) => {
    if (this.state.selectId === id) {
      this.setState({ selectId: null });

    } else {
      this.setState({ selectId: id });
    }
  }

  handleComplete = () => {
    if (typeof this.props.onComplete === "function") {
      this.props.onComplete(this.state.selectId);
    }
  }

  render() {
    const {
      className,
      items,
      ...props
    } = this.props;

    const { selectId } = this.state;

    return <Dialog
      {...props}
      title="カバー画像を選択"
      titleIcon={<PicturesIcon />}
      width={760}
      className={mergeClassNames(b(), className)}
      actions={[
        <FlatButton type="primary" onClick={this.props.onRequestClose}>Cancel</FlatButton>,
        <FlatButton type="primary" onClick={this.handleComplete}>Select</FlatButton>
      ]}
    >
      <ul className={b("list")()}>
        {items.map(item =>
          <SelectableItem
            {...item}
            key={item.id}
            selected={item.id === selectId}
            onClick={this.handleItemClick}
          />
        )}
      </ul>
    </Dialog>;
  }
}
