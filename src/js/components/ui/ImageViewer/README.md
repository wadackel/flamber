Basic:

```
const ImageViewerSampleImages = {
  IMAGE1: "/images/sample-picture1.png",
  IMAGE2: "/images/sample-picture2.png"
};

class ImageViewerExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ImageViewerSampleImages.IMAGE1,
      zoom: 1,
      forceFitViewport: false
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleZoomChange = this.handleZoomChange.bind(this);
  }

  handleItemClick(menuItem, value) {
    switch (value) {
      case "100%":
        this.setState({ zoom: 1 });
        break;

      case "zoomup":
        this.setState({ zoom: Math.min(2.5, this.state.zoom + 0.2) });
        break;

      case "zoomdown":
        this.setState({ zoom: Math.max(0.5, this.state.zoom - 0.2) });
        break;

      case "change":
        const nextImage = this.state.image === ImageViewerSampleImages.IMAGE1
          ? ImageViewerSampleImages.IMAGE2
          : ImageViewerSampleImages.IMAGE1;
        this.setState({ image: nextImage });
        break;
    }
  }

  handleZoomChange(value) {
    this.setState({
      zoom: value,
      forceFitViewport: false
    });
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <ToolBar
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 10
          }}
          title="Image title"
          right={[
            <ToolBarItem>
              <IconMenu
                icon={<IconButton icon={<MoreVertIcon />} />}
                origin={{ vertical: "top", horizontal: "right" }}
                triggerOrigin={{ vertical: "top", horizontal: "right" }}
                onItemClick={this.handleItemClick}
              >
                <MenuItem primary="100%" value="100%" />
                <MenuItem primary="Zoom up" value="zoomup" />
                <MenuItem primary="Zoom down" value="zoomdown" />
                <MenuItem primary="Change image" value="change" />
              </IconMenu>
            </ToolBarItem>
          ]}
          left={<ToolBarItem><IconButton icon={<CloseIcon />} /></ToolBarItem>}
        />

        <div style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            zIndex: 10,
            width: 150
        }}>
          <Slider
            min={0.5}
            max={2.5}
            step={0.1}
            value={this.state.zoom}
            onChange={this.handleZoomChange}
          />
        </div>

        <ImageViewer
          style={{
            minWidth: "100%",
            height: 500
          }}
          zoom={this.state.zoom}
          forceFitViewport={this.state.forceFitViewport}
          image={this.state.image}
          onZoomChange={zoom => this.setState({ zoom })}
          onDoubleClick={() => this.setState({ zoom: 1 })}
        />
      </div>
    );
  }
}

<ImageViewerExample />
```
