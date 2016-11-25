// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../../helpers/bem";
import {
  RadioGroup,
  Radio,
  Spinner,
  UploadStatus,
  FlatButton,
  RaisedButton,
  AlertDialog
} from "../../../../components/ui/";
import * as OptionActions from "../../../../actions/options";
import { ITEM_UPLOAD_LIMIT } from "../../../../constants/application";

import type { Dispatch } from "redux";
import type { Theme } from "../../../../types/prop-types";
import type { ConnectState } from "../../../../types/redux";
import type { AuthState } from "../../../../types/auth";
import type { OptionsState } from "../../../../types/options";

const b = bem("options-account-page");

type Props = {
  dispatch: Dispatch;
  auth: AuthState;
  options: OptionsState;
};

type State = {
  accountDeletePopupOpen: boolean;
};

export class OptionsAccountPage extends Component {
  props: Props;
  state: State = {
    accountDeletePopupOpen: false
  };

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  handleThemeChange = (value: Theme) => {
    this.props.dispatch(OptionActions.updateThemeRequest(value));
  }

  handleDeleteAccountPopupOpen = () => {
    this.setState({
      accountDeletePopupOpen: true
    });
  }

  handleDeleteAccountPopupClose = () => {
    this.setState({
      accountDeletePopupOpen: false
    });
  }

  handleDeleteAccount = () => {
    // TODO: Delete account
    this.setState({
      accountDeletePopupOpen: false
    });
  }

  render() {
    const { theme } = this.context;
    const { accountDeletePopupOpen } = this.state;
    const {
      auth: { user },
      options
    } = this.props;

    if (!user) return null;

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

        <h3>使用状況</h3>
        <UploadStatus
          limit={ITEM_UPLOAD_LIMIT}
          usage={user.today_upload}
        />
        <p>1日に200個までのアイテムを作成することが出来ます。作成数のカウントは毎日4時に行われます。システムの状態によっては多少遅延することがありますのでご了承ください。</p>

        <h3>アカウントの削除</h3>
        <p>全てのボード、アイテム、設定などのデータを削除します。一度削除したデータは復旧できないためご注意ください。</p>
        <div style={{ textAlign: "right" }}>
          <RaisedButton
            type="danger"
            onClick={this.handleDeleteAccountPopupOpen}
          >
            アカウント削除
          </RaisedButton>
        </div>
        <AlertDialog
          open={accountDeletePopupOpen}
          title="アカウントの削除確認"
          actions={[
            <FlatButton onClick={this.handleDeleteAccountPopupClose}>Cancel</FlatButton>,
            <FlatButton type="primary" onClick={this.handleDeleteAccount}>Delete</FlatButton>
          ]}
        >
          このアカウントを本当に削除してよろしいでしょうか？<br />
          削除を実行する場合は「Delete」ボタン、キャンセルする場合は「Cancel」ボタンを選択してください。
        </AlertDialog>
      </div>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    auth: state.auth,
    options: state.options
  })
)(OptionsAccountPage);
