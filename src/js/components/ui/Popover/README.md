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
        <RaisedButton type="primary" onClick={this.handleClick}>Open</RaisedButton>
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

<PopoverCustomOriginExample />
```
