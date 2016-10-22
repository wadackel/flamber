Basic:

```
<div>
  <RaisedButton type="default">Click me</RaisedButton>
  {" "}
  <RaisedButton type="primary">Click me</RaisedButton>
  {" "}
  <RaisedButton type="secondary">Click me</RaisedButton>
  {" "}
  <RaisedButton type="success">Click me</RaisedButton>
  {" "}
  <RaisedButton type="info">Click me</RaisedButton>
  {" "}
  <RaisedButton type="danger">Click me</RaisedButton>
  {" "}
  <RaisedButton type="warning">Click me</RaisedButton>
</div>
```


Link:

```
<RaisedButton href="#">Click me</RaisedButton>
```


Icons:

```
<div>
  <RaisedButton icon={<PencilIcon />}>Edit</RaisedButton>
  {" "}
  <RaisedButton icon={<PencilIcon />} type="primary">Edit</RaisedButton>
  {" "}
  <RaisedButton icon={<PencilIcon />} type="danger">Edit</RaisedButton>
  <div style={{ marginBottom: 10 }} />
  <RaisedButton iconRight={<GithubIcon />}>GitHub</RaisedButton>
  {" "}
  <RaisedButton iconRight={<GithubIcon />} type="primary">GitHub</RaisedButton>
  {" "}
  <RaisedButton iconRight={<GithubIcon />} type="danger">GitHub</RaisedButton>
</div>
```


Processing:

```
<div>
  <RaisedButton type="default" processing>Saving...</RaisedButton>
  {" "}
  <RaisedButton type="primary" processing>Saving...</RaisedButton>
  {" "}
  <RaisedButton type="danger" processing>Saving...</RaisedButton>
</div>
```
