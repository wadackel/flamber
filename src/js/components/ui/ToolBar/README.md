Basic:

```
<ToolBar
  title={<EditableText icon={<PencilIcon />} value="ToolBar title" />}
  left={[
    <ToolBarItem><IconButton icon={<CloseIcon />} /></ToolBarItem>
  ]}
  right={[
    <ToolBarItem><IconButton icon={<CropIcon />} /></ToolBarItem>,
    <ToolBarItem><IconButton icon={<StarIcon />} /></ToolBarItem>,
    <ToolBarItem>
      <IconMenu
        icon={<IconButton icon={<MoreVertIcon />} />}
        origin={{ vertical: "top", horizontal: "right" }}
        triggerOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem text="Menu1" />
        <MenuItem text="Menu2" />
        <MenuItem text="Menu3" />
      </IconMenu>
    </ToolBarItem>
  ]}
/>
```
