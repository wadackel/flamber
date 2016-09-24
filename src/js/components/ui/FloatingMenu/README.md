Basic:

```
class FloatingMenuExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <FloatingMenu
          open={this.state.open}
          onRequestOpen={() => this.setState({ open: true })}
          onRequestClose={() => this.setState({ open: false })}
        >
          <FloatingButton type="primary" icon={<BoardIcon />} />
          <FloatingButton type="primary" icon={<PictureLinkIcon />} />
          <FloatingButton type="primary" icon={<UploadIcon />} />
        </FloatingMenu>
      </div>
    );
  }
}

<FloatingMenuExample />
```
