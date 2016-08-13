Basic:

```
class SortSwitcherExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderBy: "name", order: "ASC" };
  }

  render() {
    return (
      <SortSwitcher
        order={this.state.order}
        orderBy={this.state.orderBy}
        types={[
          { name: "名前", value: "name" },
          { name: "作成日時", value: "date" },
          { name: "最終閲覧日時", value: "lastview" }
        ]}
        onChange={(orderBy, order) => this.setState({ orderBy, order })}
        onTypeChange={console.log}
        onOrderChange={console.log}
      />
    );
  }
}

<SortSwitcherExample />
```
