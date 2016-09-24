Basic:

```
class PopoverExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      triggerElement: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      open: true,
      triggerElement: e.currentTarget
    });
  }

  render() {
    return (
      <div>
        <FlatButton onClick={this.handleClick}>Open</FlatButton>
        <Popover
          open={this.state.open}
          triggerElement={this.state.triggerElement}
          onRequestClose={() => this.setState({ open: false })}
        >
          <Menu>
            <MenuItem primary="Item 1" />
            <MenuItem primary="Item 2" />
            <MenuItem primary="Item 3" />
            <MenuItem primary="Item 4" />
            <MenuItem primary="Item 5" />
          </Menu>
        </Popover>
      </div>
    );
  }
}

<PopoverExample />
```


Custom origin:

```
class PopoverCustomOriginExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      triggerElement: null,
      origin: {
        vertical: "top",
        horizontal: "left"
      },
      triggerOrigin: {
        vertical: "bottom",
        horizontal: "left"
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      open: true,
      triggerElement: e.currentTarget
    });
  }

  setOrigin(prop, value) {
    const { origin } = this.state;
    this.setState({
      origin: Object.assign({}, origin, { [prop]: value })
    });
  }

  setTriggerOrigin(prop, value) {
    const { triggerOrigin } = this.state;
    this.setState({
      triggerOrigin: Object.assign({}, triggerOrigin, { [prop]: value })
    });
  }

  render() {
    return (
      <div>
        <RaisedButton type="primary" onClick={this.handleClick}>Open</RaisedButton>
        <Popover
          open={this.state.open}
          origin={this.state.origin}
          triggerElement={this.state.triggerElement}
          triggerOrigin={this.state.triggerOrigin}
          onRequestClose={() => this.setState({ open: false })}
        >
          <Menu>
            <MenuItem primary="Item 1" />
            <MenuItem primary="Item 2" />
            <MenuItem primary="Item 3" />
            <MenuItem primary="Item 4" />
            <MenuItem primary="Item 5" />
          </Menu>
        </Popover>
        <div>
          <h4>Origin</h4>
          <h5>Vertical</h5>
          <div>
            <Radio label="Top" inline={true} checked={this.state.origin.vertical === "top"} onCheck={() => this.setOrigin("vertical", "top")} style={{ marginRight: 20 }} />
            <Radio label="Middle" inline={true} checked={this.state.origin.vertical === "middle"} onCheck={() => this.setOrigin("vertical", "middle")} style={{ marginRight: 20 }} />
            <Radio label="Bottom" inline={true} checked={this.state.origin.vertical === "bottom"} onCheck={() => this.setOrigin("vertical", "bottom")} style={{ marginRight: 20 }} />
          </div>
          <h5>Horizontal</h5>
          <div>
            <Radio label="Left" inline={true} checked={this.state.origin.horizontal === "left"} onCheck={() => this.setOrigin("horizontal", "left")} style={{ marginRight: 20 }} />
            <Radio label="Center" inline={true} checked={this.state.origin.horizontal === "center"} onCheck={() => this.setOrigin("horizontal", "center")} style={{ marginRight: 20 }} />
            <Radio label="Right" inline={true} checked={this.state.origin.horizontal === "right"} onCheck={() => this.setOrigin("horizontal", "right")} style={{ marginRight: 20 }} />
          </div>
        </div>
        <div>
          <h5>Vertical</h5>
          <div>
            <Radio label="Top" inline={true} checked={this.state.triggerOrigin.vertical === "top"} onCheck={() => this.setTriggerOrigin("vertical", "top")} style={{ marginRight: 20 }} />
            <Radio label="Middle" inline={true} checked={this.state.triggerOrigin.vertical === "middle"} onCheck={() => this.setTriggerOrigin("vertical", "middle")} style={{ marginRight: 20 }} />
            <Radio label="Bottom" inline={true} checked={this.state.triggerOrigin.vertical === "bottom"} onCheck={() => this.setTriggerOrigin("vertical", "bottom")} style={{ marginRight: 20 }} />
          </div>
          <h5>Horizontal</h5>
          <div>
            <Radio label="Left" inline={true} checked={this.state.triggerOrigin.horizontal === "left"} onCheck={() => this.setTriggerOrigin("horizontal", "left")} style={{ marginRight: 20 }} />
            <Radio label="Center" inline={true} checked={this.state.triggerOrigin.horizontal === "center"} onCheck={() => this.setTriggerOrigin("horizontal", "center")} style={{ marginRight: 20 }} />
            <Radio label="Right" inline={true} checked={this.state.triggerOrigin.horizontal === "right"} onCheck={() => this.setTriggerOrigin("horizontal", "right")} style={{ marginRight: 20 }} />
          </div>
        </div>
      </div>
    );
  }
}

<PopoverCustomOriginExample />
```
