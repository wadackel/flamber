Basic:

```
<div>
  <IconButton icon={<StarIcon />} />
  {" "}
  <IconButton icon={<SearchIcon />} />
  {" "}
  <IconButton icon={<MoreVertIcon />} />
</div>
```


Sizes:

```
<div>
  <IconButton icon={<StarIcon />} size="xl" />
  {" "}
  <IconButton icon={<StarIcon />} size="lg" />
  {" "}
  <IconButton icon={<StarIcon />} size="md" />
  {" "}
  <IconButton icon={<StarIcon />} size="sm" />
  {" "}
  <IconButton icon={<StarIcon />} size="xs" />
</div>
```


Tooltip:

```
<div style={{ padding: 100 }}>
  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "top", horizontal: "left" }} />
  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "top", horizontal: "center" }} />
  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "top", horizontal: "right" }} />

  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "middle", horizontal: "left" }} />
  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "middle", horizontal: "center" }} />
  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "middle", horizontal: "right" }} />

  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "bottom", horizontal: "left" }} />
  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "bottom", horizontal: "center" }} />
  <IconButton icon={<StarIcon />} tooltip="Favorite" tooltipOrigin={{ vertical: "bottom", horizontal: "right" }} />
</div>
```


Processing:

```
<div>
  <IconButton processing />
</div>
```
