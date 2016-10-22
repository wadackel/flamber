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
  FeedListItem,
  Spinner
} from "../../../../components/ui/";
import * as FeedActions from "../../../../actions/feeds";
import { getFeedEntities } from "../../../../selectors/feeds";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../../types/redux";
import type { AuthState } from "../../../../types/auth";
import type { FeedState, FeedId, FeedEntity } from "../../../../types/feed";
import type { OptionsState } from "../../../../types/options";
import type { FormField } from "../../../../types/form";

const b = bem("options-feed-page");

type Props = {
  dispatch: Dispatch;
  auth: AuthState;
  options: OptionsState;
  feeds: FeedState;
  feedEntities: Array<FeedEntity>;
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

  componentDidMount() {
    this.props.dispatch(FeedActions.fetchFeedsRequest());
  }

  componentWillReceiveProps(nextProps: Props) {
    if ((this.props.feeds.isAdding || !nextProps.feeds.isAdding) && !nextProps.feeds.error) {
      this.setState({
        feedURL: { value: "", error: null }
      });
    }
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

    this.props.dispatch(FeedActions.addFeedRequest(value));
  }

  handleFeedListItemDelete(listItem: FeedListItem, id: FeedId) {
    this.props.dispatch(FeedActions.deleteFeedRequest(id));
  }

  renderFeedList() {
    const { feeds, feedEntities } = this.props;

    if (feeds.isFetching) {
      return <div style={{ textAlign: "center" }}>
        <Spinner />
      </div>;
    }

    return (
      <FeedList
        className={b("feed-list")()}
      >
        {feedEntities.map(entity =>
          <FeedListItem
            key={entity.id}
            value={entity.id}
            processin={entity.isUpdating || entity.isDeleting}
            name={entity.name}
            url={entity.url}
            onDelete={this.handleFeedListItemDelete}
          />
        )}
      </FeedList>
    );
  }

  render() {
    const { feeds } = this.props;
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
              processing={feeds.isAdding}
              disable={isFeedURLEmpty}
              onClick={this.handleFeedURLSubmit}
            >
              追加
            </RaisedButton>
          }
        />

        {this.renderFeedList()}
      </div>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    auth: state.auth,
    options: state.options,
    feeds: state.feeds,
    feedEntities: getFeedEntities(state)
  })
)(OptionsFeedPage);
