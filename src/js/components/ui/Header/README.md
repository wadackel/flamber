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
        />}
      </div>
    );
  }
}

<HeaderExample />
```
