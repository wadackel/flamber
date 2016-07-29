Basic:

```
class ToolBoxExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={() => this.setState({ open: !this.state.open })}>Toggle</RaisedButton>
        <ToolBox
          open={this.state.open}
          text="Tool box text"
          actions={[
            <IconButton type="primary" tooltip="Move item" icon={<FolderIcon />} />,
            <IconButton type="primary" tooltip="Delete item" icon={<TrashIcon />} />
          ]}
        />
      </div>
    );
  }
}

<ToolBoxExample />
```
