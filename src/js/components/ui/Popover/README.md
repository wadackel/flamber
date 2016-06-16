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
    console.log(e.currentTarget);
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
            <MenuItem text="Item 1" />
            <MenuItem text="Item 2" />
            <MenuItem text="Item 3" />
            <MenuItem text="Item 4" />
            <MenuItem text="Item 5" />
          </Menu>
        </Popover>
      </div>
    );
  }
}

<PopoverExample />
```


### TODO 

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
            <MenuItem text="Item 1" />
            <MenuItem text="Item 2" />
            <MenuItem text="Item 3" />
            <MenuItem text="Item 4" />
            <MenuItem text="Item 5" />
          </Menu>
        </Popover>
        <div>
          <h4>Origin</h4>
          <div>Vertical</div>
          <div>
            <label><input type="radio" checked={this.state.origin.vertical === "top"} onChange={() => this.setOrigin("vertical", "top")} /> Top</label>
            <label><input type="radio" checked={this.state.origin.vertical === "middle"} onChange={() => this.setOrigin("vertical", "middle")} /> Middle</label>
            <label><input type="radio" checked={this.state.origin.vertical === "bottom"} onChange={() => this.setOrigin("vertical", "bottom")} /> Bottom</label>
          </div>
          <div>Horizontal</div>
          <div>
            <label><input type="radio" checked={this.state.origin.horizontal === "left"} onChange={() => this.setOrigin("horizontal", "left")} /> Left</label>
            <label><input type="radio" checked={this.state.origin.horizontal === "center"} onChange={() => this.setOrigin("horizontal", "center")} /> Center</label>
            <label><input type="radio" checked={this.state.origin.horizontal === "right"} onChange={() => this.setOrigin("horizontal", "right")} /> Right</label>
          </div>
        </div>
        <div>
          <h4>TriggerOrigin</h4>
          <div>Vertical</div>
          <div>
            <label><input type="radio" checked={this.state.triggerOrigin.vertical === "top"} onChange={() => this.setTriggerOrigin("vertical", "top")} /> Top</label>
            <label><input type="radio" checked={this.state.triggerOrigin.vertical === "middle"} onChange={() => this.setTriggerOrigin("vertical", "middle")} /> Middle</label>
            <label><input type="radio" checked={this.state.triggerOrigin.vertical === "bottom"} onChange={() => this.setTriggerOrigin("vertical", "bottom")} /> Bottom</label>
          </div>
          <div>Horizontal</div>
          <div>
            <label><input type="radio" checked={this.state.triggerOrigin.horizontal === "left"} onChange={() => this.setTriggerOrigin("horizontal", "left")} /> Left</label>
            <label><input type="radio" checked={this.state.triggerOrigin.horizontal === "center"} onChange={() => this.setTriggerOrigin("horizontal", "center")} /> Center</label>
            <label><input type="radio" checked={this.state.triggerOrigin.horizontal === "right"} onChange={() => this.setTriggerOrigin("horizontal", "right")} /> Right</label>
          </div>
        </div>
      </div>
    );
  }
}

<PopoverCustomOriginExample />
```
