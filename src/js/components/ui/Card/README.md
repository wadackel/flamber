Basic:

```
class CardExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    return (
      <Card style={{ width: 270 }} >
        <CardMedia
          image="/images/card-sample.png"
          overlay={<CardOverlay
            actions={<FlatButton label="Add item" />}
            moreActions={<IconButton icon={<TrashIcon />} />}
            selectable={true}
            selected={this.state.selected}
            onSelect={() => this.setState({ selected: !this.state.selected })}
          />}
        />
        <CardBody>
          <CardTitle>Card Title</CardTitle>
          <CardText>Card text</CardText>
          <CardAction>
            <IconButton icon={<StarIcon />} />
          </CardAction>
        </CardBody>
      </Card>
    );
  }
}

<CardExample />
```
