Basic:

```
class TagListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        { label: "UI", value: "ui" },
        { label: "Web Application", value: "webapplication" },
        { label: "Tag name", value: "tagname" },
      ]
    };
  }

  render() {
    return (
      <div>
        <TextField
          placeholder="Type tag name"
          onEnter={(e, value) => this.setState({
            tags: [...this.state.tags, { label: value, value: value }]
          })}
        />
        <div style={{ marginBottom: 20 }} />
        <TagList
          tags={this.state.tags}
          onItemDelete={value => this.setState({
            tags: this.state.tags.filter(tag => tag.value !== value)
          })}
        />
      </div>
    );
  }
}

<TagListExample />
```
