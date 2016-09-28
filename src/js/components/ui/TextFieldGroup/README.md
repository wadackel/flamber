Basic:

```
<div>
  <TextFieldGroup
    addonLeft={<TagIcon style={{ width: 25, height: 25 }} />}
  />

  <div style={{ marginBottom: 20 }} />

  <TextFieldGroup
    label="Type tag name"
    addonRight={<TagIcon style={{ width: 25, height: 25 }} />}
  />

  <div style={{ marginBottom: 20 }} />

  <TextFieldGroup
    label="Type tag name"
    addonLeft={<TagIcon style={{ width: 25, height: 25 }} />}
    addonRight={<IconButton
      icon={<SearchIcon />}
      onClick={console.log}
    />}
  />
</div>
```
