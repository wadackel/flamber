Basic:

```
class CheckboxGroupExample extends React.Component {
  render() {
    return (
      <CheckboxGroup value={1} name="checkboxtest">
        <Checkbox value={1} label="Check Item 1" />
        <Checkbox value={2} label="Check Item 2" />
        <Checkbox value={3} label="Check Item 3" />
      </CheckboxGroup>
    );
  }
}

<CheckboxGroupExample />
```
