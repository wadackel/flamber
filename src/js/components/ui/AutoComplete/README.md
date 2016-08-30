Basic:

```
class AutoCompleteExample extends React.Component {
  render() {
    return (
      <div style={{ padding: "60px 0" }}>
        <AutoComplete
          label="Type 't'"
          dataSource={[
            "test",
            "trace",
            "testing"
          ]}
          onNewRequest={console.log}
        />

        <AutoComplete
          openOnFocus
          label="Type 't'"
          dataSource={[
            { text: "Test", value: "test" },
            { text: "Trace", value: "trace" },
            { text: "Testing", value: "testing" }
          ]}
          onNewRequest={console.log}
        />
      </div>
    );
  }
}

<AutoCompleteExample />
```
