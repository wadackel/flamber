Basic:

```
class BoardCardExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { select: false };
  }

  render() {
    const modified = new Date("2016-06-25T03:45:38Z");

    return (
      <BoardCard
        style={{ width: 320 }}
        selected={this.state.select}
        title="Web Application"
        image="/images/card-sample.png"
        itemCount={23}
        lastModified={modified}
        onSelect={() => this.setState({ select: !this.state.select })}
      />
    );
  }
}

<BoardCardExample />
```


List:

```
class BoardCardListExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const modified = new Date("2016-06-25T03:45:38Z");

    return (
      <BoardCard
        layout="list"
        selected={false}
        title="Web Application"
        image="/images/card-sample.png"
        itemCount={23}
        lastModified={modified}
      />
    );
  }
}

<BoardCardListExample />
```
