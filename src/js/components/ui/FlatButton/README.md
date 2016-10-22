Basic:

```
<div>
  <FlatButton type="default">Click me</FlatButton>
  {" "}
  <FlatButton type="primary">Click me</FlatButton>
  {" "}
  <FlatButton type="secondary">Click me</FlatButton>
  {" "}
  <FlatButton type="danger">Click me</FlatButton>
  {" "}
  <FlatButton type="primary" disable>Click me</FlatButton>
</div>
```


Icons:

```
<div>
  <FlatButton icon={<PencilIcon />}>Edit</FlatButton>
  {" "}
  <FlatButton icon={<PencilIcon />} type="primary">Edit</FlatButton>
  {" "}
  <FlatButton icon={<PencilIcon />} type="danger">Edit</FlatButton>
  <div style={{ marginBottom: 10 }} />
  <FlatButton iconRight={<GithubIcon />}>GitHub</FlatButton>
  {" "}
  <FlatButton iconRight={<GithubIcon />} type="primary">GitHub</FlatButton>
  {" "}
  <FlatButton iconRight={<GithubIcon />} type="danger">GitHub</FlatButton>
</div>
```


Processing:

```
<div>
  <FlatButton type="default" processing>Saving...</FlatButton>
  {" "}
  <FlatButton type="primary" processing>Saving...</FlatButton>
  {" "}
  <FlatButton type="danger" processing>Saving...</FlatButton>
</div>
```
