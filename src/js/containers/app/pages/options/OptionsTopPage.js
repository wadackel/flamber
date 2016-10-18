// @flow
import autoBind from "auto-bind";
import deepEqual from "deep-equal";
import React, { Component } from "react";
import { connect } from "react-redux";
import bem from "../../../../helpers/bem";
import { RaisedButton, TextField } from "../../../../components/ui/";
import * as OptionActions from "../../../../actions/options";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../../types/redux";
import type { AuthState } from "../../../../types/auth";
import type { OptionsState } from "../../../../types/options";
import type { FormField } from "../../../../types/form";

const b = bem("options-top-page");

type Props = {
  dispatch: Dispatch;
  auth: AuthState;
  options: OptionsState;
};

type State = {
  userPhoto: $All<FormField<string>, {
    file: ?File
  }>;
  userName: FormField<string>;
};

export class OptionsTopPage extends Component {
  props: Props;
  state: State;

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      userPhoto: {
        value: this.getUserPhoto(props.auth),
        file: null,
        error: null
      },
      userName: {
        value: this.getUserName(props.auth),
        error: null
      }
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!deepEqual(this.props.auth, nextProps.auth)) {
      this.setState({
        userPhoto: {
          value: this.getUserPhoto(nextProps.auth),
          file: null,
          error: null
        },
        userName: {
          value: this.getUserName(nextProps.auth),
          error: null
        }
      });
    }
  }

  handlePhotoChange(e: SyntheticInputEvent) {
    if (e.currentTarget instanceof HTMLInputElement) {
      const { files } = e.currentTarget;
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.setState({
          userPhoto: {
            value: reader.result,
            error: null,
            file
          }
        });
      };

      reader.readAsDataURL(file);
    }
  }

  handlePhotoClick() {
    this.refs.photo.click();
  }

  handleUserNameChange(e: SyntheticInputEvent, value: string) {
    this.setState({
      userName: {
        error: value === "" ? "必須項目です" : null,
        value
      }
    });
  }

  handleSave() {
    const { auth: { user } } = this.props;

    const {
      userPhoto,
      userName
    } = this.state;

    if (user == null || userPhoto.error != null || userName.error != null) {
      // TODO: Error message
      return;
    }

    this.props.dispatch(OptionActions.updateProfileRequest(
      userPhoto.file,
      userName.value
    ));
  }

  // TODO: type definition
  getUserPhoto(auth: ?any) {
    if (!auth) return null;
    return auth.user.photo;
  }

  getUserName(auth: ?any) {
    if (!auth) return null;
    return auth.user.name;
  }

  render() {
    const {
      auth: { user },
      options
    } = this.props;

    const {
      userPhoto,
      userName
    } = this.state;

    if (!user || userPhoto.value == null || userName.value == null) return null;

    const saveDisabled = !!userName.error || options.isProfileUpdating ||
      (
        user.name === userName.value &&
        user.photo === userPhoto.value
      );

    return (
      <div className={b()}>
        <h2>プロフィール</h2>

        <div className="_profile-box">
          <div className="_profile-box__media">
            <span
              className="_profile-box__media__item"
              style={{ backgroundImage: `url(${userPhoto.value})` }}
              onClick={this.handlePhotoClick}
            />
            <input
              ref="photo"
              type="file"
              accept="image/*"
              onChange={this.handlePhotoChange}
            />
          </div>
          <div className="_profile-box__body">
            <p className="_profile-box__text">お手持ちの写真をプロフィール写真に設定できます。</p>
            <RaisedButton
              className="_profile-box__save"
              onClick={this.handlePhotoClick}
            >
              画像を変更
            </RaisedButton>
          </div>
        </div>

        <TextField
          label="表示名"
          value={userName.value}
          error={userName.error}
          onChange={this.handleUserNameChange}
        />

        <div className="_options-footer">
          <RaisedButton
            type="primary"
            disable={saveDisabled}
            onClick={this.handleSave}
          >
            保存
          </RaisedButton>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    auth: state.auth,
    options: state.options
  })
)(OptionsTopPage);
