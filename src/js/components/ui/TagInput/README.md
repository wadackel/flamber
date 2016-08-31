Basic:

```
class TagInputExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] };
  }

  render() {
    return (
      <div>
        <TagInput
          placeholder="Type tag name"
          tags={this.state.tags}
          dataSource={[
            { label: "Tokyo", value: 1 },
            { label: "Tokushima", value: 2 },
            { label: "Kyoto", value: 3 },
            { label: "Oosaka", value: 4 },
            { label: "Nara", value: 5 },
            { label: "Iwate", value: 6 }
          ]}
          onAddTag={tag => this.setState({ tags: [...this.state.tags, tag] })}
          onRemoveTag={tag => this.setState({ tags: this.state.tags.filter(o => o.value !== tag.value) })}
        />
      </div>
    );
  }
}

<TagInputExample />
```
