Basic:

```
class SpinnerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle"
          onClick={() => this.setState({ show: !this.state.show })}
        />
        <div>
          {this.state.show && <Spinner />}
        </div>
      </div>
    );
  }
}

<SpinnerExample />
```


Sizes:

```
class SpinnerSizeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle"
          onClick={() => this.setState({ show: !this.state.show })}
        />
        {this.state.show &&
          <div>
            <Spinner size="xl" />
            <div style={{ marginRight: 10 }} />
            <Spinner size="lg" />
            <div style={{ marginRight: 10 }} />
            <Spinner size="md" />
            <div style={{ marginRight: 10 }} />
            <Spinner size="sm" />
            <div style={{ marginRight: 10 }} />
            <Spinner size="xs" />
            <div style={{ marginRight: 10 }} />
            <Spinner customSize={30} />
          </div>
        }
      </div>
    );
  }
}

<SpinnerSizeExample />
```
