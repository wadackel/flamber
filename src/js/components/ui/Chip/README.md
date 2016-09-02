Basic:

```
<div>
  <Chip>Text chip</Chip>

  <Chip onClick={() => console.log("Click")}>Clickable chip</Chip>

  <Chip
    value="deletable chip"
    onClick={(e, value) => console.log(`Click ${value}`)}
    onRequestDelete={value => console.log(`Delete ${value}`)}
  >
    Deletable chip
  </Chip>

  <Chip
    processing
    onClick={console.log}
    onRequestDelete={console.log}
  >
    Processing chip
  </Chip>
</div>
```
