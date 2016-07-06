Basic:

```
class BoardCardExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const modified = new Date("2016-06-25T03:45:38Z");

    return (
      <BoardCard
        style={{ width: 270 }}
        selected={false}
        title="Web Application"
        image="/images/card-sample.png"
        itemCount={23}
        lastModified={modified}
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
