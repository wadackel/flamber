/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import {
  DriveCapacity,
  RaisedButton,
  RadioGroup,
  Radio
} from "../../components/ui/";
import { GithubIcon } from "../../components/svg-icons";
import { updateSettingsRequest } from "../../actions/settings";

const b = bem("settings");

export class Settings extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      auth: { user }
    } = this.props;

    return (
      <div className={b()}>
        <DriveCapacity
          className={b("drive-capacity")}
          limit={parseInt(user.limit, 10)}
          usage={parseInt(user.usage, 10)}
        />

        <section className={b("group")}>
          <h3 className={b("group__title")}>テーマ</h3>
          <div className={b("group__body")}>
            <RadioGroup>
              <Radio label="Dark" value={0} />
              <Radio label="Light" value={1} />
            </RadioGroup>
          </div>
        </section>

        <section className={b("group")}>
          <h3 className={b("group__title")}>全ファイルを削除</h3>
          <div className={b("group__body")}>
            <p>dripupに関する全ての情報を削除します。<br />この操作は取り消すことは出来ません。</p>
            <div><RaisedButton type="danger">Delete</RaisedButton></div>
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
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    settings: state.settings
  })
)(Settings);