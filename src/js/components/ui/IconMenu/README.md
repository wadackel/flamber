Basic:

```
class IconMenuExample extends React.Component {
  render() {
    return (
      <div>
        <IconMenu
          icon={<IconButton icon={<MoreVertIcon />} />}
          origin={{ vertical: "top", horizontal: "left" }}
          triggerOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem text="Delete" />
          <MenuItem text="Select" />
          <MenuItem text="Move" />
          <MenuItem text="Share" />
        </IconMenu>
        <IconMenu
          icon={<IconButton icon={<MoreVertIcon />} />}
          origin={{ vertical: "top", horizontal: "right" }}
          triggerOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem text="Delete" />
          <MenuItem text="Select" />
          <MenuItem text="Move" />
          <MenuItem text="Share" />
        </IconMenu>
        <IconMenu
          icon={<IconButton icon={<MoreVertIcon />} />}
          origin={{ vertical: "bottom", horizontal: "left" }}
          triggerOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MenuItem text="Delete" />
          <MenuItem text="Select" />
          <MenuItem text="Move" />
          <MenuItem text="Share" />
        </IconMenu>
        <IconMenu
          icon={<IconButton icon={<MoreVertIcon />} />}
          origin={{ vertical: "bottom", horizontal: "right" }}
          triggerOrigin={{ vertical: "bottom", horizontal: "right" }}
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
