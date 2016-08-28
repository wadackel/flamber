Basic:

```
const selectColorPopoverColors = [
  { color: "#992220" },
  { color: "#d2241e" },
  { color: "#ec6598" },
  { color: "#4b4fa8" },
  { color: "#1da6d4" },
  { color: "#87cf3b" },
  { color: "#4b7610" },
  { color: "#787710" },
  { color: "#fffc00", checkMarkColor: "#adab35" },
  { color: "#ffa400" },
  { color: "#ff780d" },
  { color: "#784b1b" },
  { color: "#222" },
  { color: "#767676" },
  { color: "#fff", borderColor: "#bebebe", checkMarkColor: "#bebebe" }
];

class SelectColorPopoverExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectColors: [],
      triggerElement: null
    };
  }

  render() {
    const { open, triggerElement, selectColors } = this.state;

    return (
      <div>
        <h3>Result</h3>
        <div>
          {selectColors.map(color =>
            <div
              style={{
                display: "inline-block",
                width: 40,
                height: 40,
                background: color
              }}
            />
          )}

          <div style={{ marginBottom: 20 }} />

          <RaisedButton onClick={e => this.setState({ open: true, triggerElement: e.currentTarget })}>{selectColors.length === 0 ? "Add color" : "Edit color"}</RaisedButton>
        </div>

        <SelectColorPopover
          open={open}
          origin={{ vertical: "bottom", horizontal: "center" }}
          triggerOrigin={{ vertical: "top", horizontal: "center" }}
          triggerElement={triggerElement}
          colors={selectColorPopoverColors}
          selectColors={selectColors}
          onComplete={colors => this.setState({ selectColors: colors, open: false })}
          onRequestClose={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

<SelectColorPopoverExample />
```
