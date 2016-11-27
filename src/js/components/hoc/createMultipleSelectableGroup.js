// @flow
import React, { Component } from "react";
import { SelectableGroup } from "react-selectable";
import KeyHandler from "react-key-handler";
import wrapDisplayName from "recompose/wrapDisplayName";


type Props = {
  selectedKeys: Array<any>;
  onSelection: ?Function;
};

type State = {
  mergeSelection: boolean;
};

const createMultipleSelectableGroup = (WrappedComponent: SelectableGroup) => (
  class MultipleSelectableGroup extends Component {
    props: Props;
    state: State = { mergeSelection: false };

    static displayName = wrapDisplayName(SelectableGroup, "MultipleSelectableGroup");

    handleClearSelection = () => {
      this.callSelection([]);
    }

    handleSelection = (keys: Array<any>) => {
      const { selectedKeys } = this.props;
      const { mergeSelection } = this.state;
      const selectKeys = mergeSelection
        ? [...selectedKeys, ...keys].filter((k, i, s) => s.indexOf(k) === i && i === s.lastIndexOf(k))
        : keys;

      this.callSelection(selectKeys);
    }

    enableMergeSelection = () => {
      this.setState({ mergeSelection: true });
    }

    disableMergeSelection = () => {
      this.setState({ mergeSelection: false });
    }

    callSelection(keys: Array<any>) {
      if (typeof this.props.onSelection === "function") {
        this.props.onSelection(keys);
      }
    }

    render() {
      const {
        onSelection, // eslint-disable-line no-unused-vars
        ...props
      } = this.props;

      return (
        <div>
          <span style={{ display: "none" }}>
            <KeyHandler keyEventName="keydown" keyValue="Escape" onKeyHandle={this.handleClearSelection} />
            <KeyHandler keyEventName="keydown" keyValue="Shift" onKeyHandle={this.enableMergeSelection} />
            <KeyHandler keyEventName="keyup" keyValue="Shift" onKeyHandle={this.disableMergeSelection} />
          </span>

          <WrappedComponent
            {...props}
            onSelection={this.handleSelection}
          />
        </div>
      );
    }
  }
);

createMultipleSelectableGroup.defaultProps = {
  selectedKeys: []
};

export default createMultipleSelectableGroup;
