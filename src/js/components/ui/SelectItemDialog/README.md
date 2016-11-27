Basic:

```
const selectItems = [
  { id: 0, image: "/images/feed-card-sample1.png" },
  { id: 1, image: "/images/feed-card-sample2.png" },
  { id: 2, image: "/images/feed-card-sample1.png" },
  { id: 3, image: "/images/feed-card-sample2.png" },
  { id: 4, image: "/images/card-sample.png" },
  { id: 5, image: "/images/feed-card-sample1.png" },
  { id: 6, image: "/images/feed-card-sample1.png" },
  { id: 7, image: "/images/feed-card-sample2.png" },
  { id: 8, image: "/images/feed-card-sample1.png" },
  { id: 9, image: "/images/feed-card-sample2.png" },
  { id: 10, image: "/images/card-sample.png" },
  { id: 11, image: "/images/feed-card-sample1.png" }
];

class SelectItemDialogExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      processing: false,
      open: false,
      selectedId: 5
    };

    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(id) {
    this.setState({ processing: true, selectedId: id });

    setTimeout(() => {
      this.setState({ processing: false, open: false });
    }, 1000);
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={() => this.setState({ open: true })} type="primary">Open</RaisedButton>

        <SelectItemDialog
          processing={this.state.processing}
          selectedId={this.state.selectedId}
          open={this.state.open}
          items={selectItems}
          onRequestClose={() => this.setState({ open: false })}
          onComplete={this.handleComplete}
        />
      </div>
    );
  }
}

<SelectItemDialogExample />
```
