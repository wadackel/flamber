Basic:

```
class LocalNavExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { href: "/profile/" };
  }

  render() {
    return <LocalNav
      style={{ width: 220 }}
      href={this.state.href}
      onItemClick={(href, target) => {
        this.setState({ href });
      }}
    >
      <LocalNavItem href="/profile/">Profile</LocalNavItem>
      <LocalNavItem href="/account/">Account</LocalNavItem>
      <LocalNavItem href="/help/">Help</LocalNavItem>
      <LocalNavItem href="/privacypolicy/" target="_blank">Privacy policy</LocalNavItem>
    </LocalNav>;
  }
}

<LocalNavExample />
```
