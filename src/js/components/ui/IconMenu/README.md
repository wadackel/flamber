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
          <MenuItem primary="Delete" />
          <MenuItem primary="Select" />
          <MenuItem primary="Move" />
          <MenuItem primary="Share" />
        </IconMenu>
        <IconMenu
          icon={<IconButton icon={<MoreVertIcon />} />}
          origin={{ vertical: "top", horizontal: "right" }}
          triggerOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem primary="Delete" />
          <MenuItem primary="Select" />
          <MenuItem primary="Move" />
          <MenuItem primary="Share" />
        </IconMenu>
        <IconMenu
          icon={<IconButton icon={<MoreVertIcon />} />}
          origin={{ vertical: "bottom", horizontal: "left" }}
          triggerOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MenuItem primary="Delete" />
          <MenuItem primary="Select" />
          <MenuItem primary="Move" />
          <MenuItem primary="Share" />
        </IconMenu>
        <IconMenu
          icon={<IconButton icon={<MoreVertIcon />} />}
          origin={{ vertical: "bottom", horizontal: "right" }}
          triggerOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <MenuItem primary="Delete" />
          <MenuItem primary="Select" />
          <MenuItem primary="Move" />
          <MenuItem primary="Share" />
        </IconMenu>
      </div>
    );
  }
}

<IconMenuExample />
```
