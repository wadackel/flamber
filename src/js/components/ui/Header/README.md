Basic:

```
class HeaderExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <FlatButton onClick={() => this.setState({ show: !show })}>Toggle</FlatButton>
        {show && <Header
          navItems={[
            <NavItem active>Boards</NavItem>,
            <NavItem>All items</NavItem>,
            <NavItem>Feeds</NavItem>
          ]}
          user={{
            id: "avatar",
            name: "User name",
            provider: "google",
            providerId: "google-id",
            photo: "/images/avatar-sample.png",
            todayUpload: 10,
            installed: true,
            created_at: new Date(),
            updated_at: new Date()
          }}
          subTitle="Total 6 board"
          colors={["#7b7b7b", "#904e13"]}
        />}
      </div>
    );
  }
}

<HeaderExample />
```
