Basic:

```
class CropperExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { src: "" };
    this.handleCropImage = this.handleCropImage.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleCropImage() {
    const canvas = this.refs.cropper.getCroppedCanvas();

    if (typeof canvas === "undefined") {
      return;
    }

    this.setState({
      src: canvas.toDataURL()
    });
  }

  handleDoubleClick(e) {
    e.preventDefault();
    this.refs.cropper.reset();
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 50, textAlign: "center" }}>
          <RaisedButton onClick={this.handleCropImage}>Crop!!</RaisedButton>
        </div>

        <Cropper
          ref="cropper"
          src="/images/sample-picture1.png"
          style={{ height: 400, marginBottom: 50 }}
          center
          viewMode={2}
          dragMode="move"
          toggleDragModeOnDblclick={false}
          onDoubleClick={this.handleDoubleClick}
        />

        <div>
          <img src={this.state.src} />
        </div>
      </div>
    );
  }
}

<CropperExample />
```
