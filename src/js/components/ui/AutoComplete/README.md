Basic:

```
class AutoCompleteExample extends React.Component {
  render() {
    return (
      <div>
        <AutoComplete
          label="Type 't'"
          dataSource={[
            "test",
            "trace",
            "testing"
          ]}
        />
        <AutoComplete
          label="Type 't'"
          dataSource={[
            { text: "Text 1", value: "value1" },
            { text: "Text 2", value: "value2" },
            { text: "Text 3", value: "value3" }
          ]}
        />
      </div>
    );
  }
}

<AutoCompleteExample />
```
