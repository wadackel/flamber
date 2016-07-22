Basic:

```
class FileDnDExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { src: "" };
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(dataTransfer) {
    const { files } = dataTransfer;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.setState({ src: reader.result });
    };

    reader.readAsDataURL(file);
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
        onDrop={this.handleDrop}
      >
        <div>
          <div>Result:</div>
          {this.state.src && <img src={this.state.src} />}
        </div>
      </FileDnD>
    );
  }
}

<FileDnDExample />
```
