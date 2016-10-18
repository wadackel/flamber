// @flow
import autoBind from "auto-bind";
import isURL from "validator/lib/isURL";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import bem from "../../../../helpers/bem";
import {
  TextFieldGroup,
  RaisedButton,
  FeedList,
  FeedListItem
} from "../../../../components/ui/";

import type { ConnectState } from "../../../../types/redux";
import type { AuthState } from "../../../../types/auth";
import type { OptionsState } from "../../../../types/options";
import type { FormField } from "../../../../types/form";

const b = bem("options-feed-page");

type Props = {
  auth: AuthState;
  options: OptionsState;
};

type State = {
  feedURL: FormField<string>;
};

export class OptionsFeedPage extends Component {
  props: Props;
  state: State;

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      feedURL: {
        value: "",
        error: null
      }
    };

    autoBind(this);
  }

  handleFeedURLChange(e: SyntheticInputEvent, value: string) {
    this.setState({
      feedURL: {
        error: null,
        value
      }
    });
  }

  handleFeedURLSubmit() {
    const { feedURL } = this.state;
    const value = feedURL.value || "";

    if (!isURL(value, { require_protocol: true })) {
      this.setState({
        feedURL: { ...feedURL, error: "URLの形式が正しくありません" }
      });
      return;
    }

    // TODO: Send to action
    console.log(value);
  }

  render() {
    const { feedURL } = this.state;
    const isFeedURLEmpty = (feedURL.value || "").trim() === "";

    return (
      <div className={b()}>
        <h2>フィード設定</h2>
        <p>Feedsのページで表示されるフィードの設定を行うことが出来ます。</p>
        <TextFieldGroup
          className={b("feed-url")()}
          label="フィードURL"
          placeholder="http://example.com/rss/"
          value={feedURL.value}
          error={isFeedURLEmpty ? null : feedURL.error}
          onChange={this.handleFeedURLChange}
          onEnter={this.handleFeedURLSubmit}
          addonRight={
            <RaisedButton
              type="primary"
              disable={isFeedURLEmpty}
              onClick={this.handleFeedURLSubmit}
            >
              追加
            </RaisedButton>
          }
        />

        <FeedList
          className={b("feed-list")()}
        >
          <FeedListItem
            name="Title 1"
            url="http://example.com"
            value={1}
            onClick={console.log}
            onDelete={console.log}
          />
          <FeedListItem
            name="Title 2"
            url="http://example.com"
            value={2}
            onClick={console.log}
            onDelete={console.log}
          />
          <FeedListItem
            name="Title 3"
            url="http://example.com"
            value={3}
            onClick={console.log}
            onDelete={console.log}
          />
        </FeedList>
      </div>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    auth: state.auth,
    options: state.options
  })
)(OptionsFeedPage);
