Basic:

```
class FileDnDExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FileDnD
        style={{
          width: "100%",
          height: 300
        }}
        overlay={
          <div>Drag me!!</div>
        }
        onDrop={dataTransfer => console.log(dataTransfer.files[0])}
      >
        <div>
          Result:
        </div>
      </FileDnD>
    );
  }
}

<FileDnDExample />
```
