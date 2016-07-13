Basic:

```
class SearchFieldExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    return (
      <div>
        <SearchField
          placeholder="Type search keyword"
          onSearch={value => this.setState({ value })}
        />
        <div>
          value: {this.state.value}
        </div>
      </div>
    );
  }
}

<SearchFieldExample />
```
