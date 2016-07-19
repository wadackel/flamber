Basic:

```
class FloatingMenuExample extends React.Component {
  render() {
    return (
      <div>
        <FloatingMenu>
          <FloatingButton type="primary" icon={<BoardIcon />} />
          <FloatingButton type="primary" icon={<PictureLinkIcon />} />
          <FloatingButton type="primary" icon={<UploadIcon />} />
        </FloatingMenu>
      </div>
    );
  }
}

<FloatingMenuExample />
```
