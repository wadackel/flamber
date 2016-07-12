Basic:

```
class NavExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 0 };
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Nav>
        <NavItem active={activeItem === 0} onClick={() => this.setState({ activeItem: 0 })}>My items</NavItem>
        <NavItem active={activeItem === 1} onClick={() => this.setState({ activeItem: 1 })}>Feeds</NavItem>
        <NavItem active={activeItem === 2} onClick={() => this.setState({ activeItem: 2 })}>Settings</NavItem>
      </Nav>
    );
  }
}

<NavExample />
```
