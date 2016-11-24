Basic:

```
const selectColorMenuColors = [
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

<CardGroupControl
  sortTypes={[
    { name: "名前", value: "name" },
    { name: "作成", value: "created_at" },
    { name: "最終閲覧", value: "viewed_at" }
  ]}
  sortOrder="desc"
  sortOrderBy="name"
  colors={selectColorMenuColors}
/>
```

