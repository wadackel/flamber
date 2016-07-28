/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import MDSpinner from "react-md-spinner";
import * as Themes from "../../constants/themes";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import {
  DriveCapacity,
  RaisedButton,
  RadioGroup,
  Radio,
  Snackbar
} from "../../components/ui/";
import { GithubIcon } from "../../components/svg-icons";
import { deleteAppRequest } from "../../actions/application";
import { fetchSettingsRequest, updateThemeRequest } from "../../actions/settings";

const b = bem("settings");

export class Settings extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      snackbarOpen: false
    };

    bindHandlers([
      "handleThemeChange",
      "handleSnackbarClose",
      "handleDeleteClick"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    const { settings } = this.props;

    if (settings.isThemeUpdating && !nextProps.settings.isThemeUpdating) {
      this.setState({ snackbarOpen: true });
    }
  }

  handleThemeChange(theme) {
    this.props.dispatch(updateThemeRequest(theme));
  }

  handleSnackbarClose() {
    this.setState({ snackbarOpen: false });
  }

  handleDeleteClick() {
    this.props.dispatch(deleteAppRequest());
  }

  render() {
    const {
      auth: { user },
      settings
    } = this.props;

    const { theme } = this.context;
    const { snackbarOpen } = this.state;

    const themes = [
      { label: "Dark", value: Themes.DARK },
      { label: "Light", value: Themes.LIGHT }
    ];

    return (
      <div className={b()}>
        <DriveCapacity
          className={b("drive-capacity")}
          limit={parseInt(user.limit, 10)}
          usage={parseInt(user.usage, 10)}
        />

        <section className={b("group")}>
          <h3 className={b("group__title")}>
            {settings.isThemeUpdating && <MDSpinner
              size={14}
              style={{ marginRight: 5 }}
            />}
            テーマ
          </h3>
          <div className={b("group__body")}>
            <RadioGroup
              value={theme}
              onChange={this.handleThemeChange}
            >
              {themes.map(obj =>
                <Radio
                  key={obj.value}
                  label={obj.label}
                  value={obj.value}
                />
              )}
            </RadioGroup>
          </div>
        </section>

        <section className={b("group")}>
          <h3 className={b("group__title")}>全ファイルを削除</h3>
          <div className={b("group__body")}>
            <p>dripupに関する全ての情報を削除します。<br />この操作は取り消すことは出来ません。</p>
            <div><RaisedButton type="danger" onClick={this.handleDeleteClick}>Delete</RaisedButton></div>
          </div>
        </section>

        <section className={b("group")}>
          <h3 className={b("group__title")}>dripupについて</h3>
          <div className={b("group__body")}>
            <p>dripupをお使いただきありがとうございます。</p>
            <p>dripupは直感的な操作感とシンプルなボード/アイテム管理で、バラけがちだったデザイン資料の管理を一元化することを第一目標に、<a href="https://github.com/tsuyoshiwada" target="_blank">@tsuyoshiwada</a>が個人的に開発を行っています。</p>
            <p>ご意見やバグレポート等を含むコントリビュートはGitHubのIssueとPRにて受け付けていますので、以下より宜しくお願いいたします。</p>
            <div><RaisedButton icon={<GithubIcon />} href="https://github.com/tsuyoshiwada/dripup" target="_blank">GitHub</RaisedButton></div>
          </div>
        </section>

        <Snackbar
          open={snackbarOpen}
          message="テーマを更新しました"
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    settings: state.settings
  }),
  null,
  null,
  { pure: false }
)(Settings);
