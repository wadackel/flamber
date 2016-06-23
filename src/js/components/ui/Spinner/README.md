Basic:

```
class SpinnerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle"
          onClick={() => this.setState({ show: !this.state.show })}
        />
        <div>
          <Spinner show={this.state.show} />
        </div>
      </div>
    );
  }
}

<SpinnerExample />
```


Sizes:

```
<div>
  <Spinner show={true} size="xl" />
  <Spinner show={true} size="lg" />
  <Spinner show={true} size="md" />
  <Spinner show={true} size="sm" />
  <Spinner show={true} size="xs" />
  <Spinner show={true} customSize={30} />
</div>
```
