Basic:

```
class IconMenuExample extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <IconMenu
          icon={<IconButton icon={<MoreVertIcon />} />}
          onChange={this.handleChange}
        >
          <MenuItem text="Delete" />
          <MenuItem text="Select" />
          <MenuItem text="Move" />
          <MenuItem text="Share" />
        </IconMenu>
      </div>
    );
  }
}

<IconMenuExample />
```
