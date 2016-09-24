Basic:

```
<div>
  <ColorBar
    palette={["#1da6d4", "#fffc00", "#fff"]}
    onClick={console.log}
  />

  <div style={{ marginBottom: 20 }} />

  <ColorBar
    clickable
    palette={["#1da6d4", "#fffc00", "#fff"]}
    onClick={console.log}
  />

  <div style={{ marginBottom: 20 }} />

  <ColorBar
    palette={["#1da6d4", "#fffc00", "#fff"]}
    lineWidth={2}
    onClick={console.log}
  />
</div>
```


Clickable item:

```
<ColorBar
  itemClickable
  onClick={console.log}
  onItemClick={console.log}
/>
```
