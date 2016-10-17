// @flow
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../../helpers/bem";
import {
  RadioGroup,
  Radio,
  Spinner
} from "../../../../components/ui/";
import * as OptionActions from "../../../../actions/options";

import type { Dispatch } from "redux";
import type { Theme } from "../../../../types/prop-types";
import type { OptionsState } from "../../../../types/options";

const b = bem("options-account-page");

// TODO: type definition
type Props = {
  dispatch: Dispatch;
  options: OptionsState;
};

type ConnectProps = {
  auth: any;
  options: OptionsState;
};

export class OptionsAccountPage extends Component {
  props: Props;

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleThemeChange(value: Theme) {
    this.props.dispatch(OptionActions.updateThemeRequest(value));
  }

  render() {
    const { theme } = this.context;

    const {
      options
    } = this.props;
    console.log("OPTIONSACCOUNTPAGE", this.context);

    return (
      <div className={b()}>
        <h2>アカウント</h2>

        <h3>
          テーマ
          {options.isThemeUpdating &&
            <Spinner
              style={{ marginLeft: 10 }}
              size={16}
            />
          }
        </h3>
        <RadioGroup
          value={theme}
          onChange={this.handleThemeChange}
        >
          <Radio
            label="Dark"
            value="dark"
          />
          <Radio
            label="Light"
            value="light"
          />
        </RadioGroup>
      </div>
    );
  }
}

export default connect(
  (state: ConnectProps) => ({
    auth: state.auth,
    options: state.options
  })
)(OptionsAccountPage);
