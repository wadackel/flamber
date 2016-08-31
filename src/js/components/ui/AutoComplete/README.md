Basic:

```
class AutoCompleteExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value1: "", value2: "" };
  }

  render() {
    const dataSource2 = [
      { text: "Test", value: "test" },
      { text: "Trace", value: "trace" },
      { text: "Testing", value: "testing" }
    ];

    return (
      <div style={{ padding: "60px 0" }}>
        <AutoComplete
          label="Type 't'"
          searchText={this.state.value1}
          dataSource={[
            "test",
            "trace",
            "testing"
          ]}
          onNewRequest={value => this.setState({ value1: value })}
        />

        <AutoComplete
          openOnFocus
          label="Type 't'"
          searchText={this.state.value2}
          dataSource={dataSource2}
          onNewRequest={(value, index) => {
            if (index > -1) {
              this.setState({
                value2: dataSource2.filter(o => o.value === value).shift().label}
              );
            }
          }}
        />
      </div>
    );
  }
}

<AutoCompleteExample />
```
