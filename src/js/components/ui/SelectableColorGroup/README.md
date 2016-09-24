Basic:

```
const selectableColors = [
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

class SelectableColorGroupExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectColors: []
    };
    this.handleColorClick = this.handleColorClick.bind(this);
  }

  handleColorClick(color) {
    const { selectColors } = this.state;

    if (selectColors.indexOf(color) > -1) {
      this.setState({ selectColors: selectColors.filter(o => o !== color) });

    } else {
      this.setState({ selectColors: [...selectColors, color] });
    }
  }

  render() {
    return (
      <div style={{ width: 240 }}>
        <SelectableColorGroup
          selectColors={this.state.selectColors}
          onColorClick={this.handleColorClick}
        >
          {selectableColors.map(obj => 
            <SelectableColor key={obj.color} {...obj} />
          )}
        </SelectableColorGroup>
      </div>
    )
  }
}

<SelectableColorGroupExample />
```
