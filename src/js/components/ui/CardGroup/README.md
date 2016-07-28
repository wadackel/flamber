Basic:

```
class CardGroupExample extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { id: 1, title: "Card1", image: "card-sample.png", width: 540, height: 400, colors: [] },
      { id: 2, title: "Card2", image: "feed-card-sample1.png", width: 540, height: 798, colors: [] },
      { id: 3, title: "Card3", image: "feed-card-sample2.png", width: 540, height: 406, colors: [] },
      { id: 4, title: "Card4", image: "card-sample.png", width: 540, height: 400, colors: [] },
      { id: 5, title: "Card5", image: "feed-card-sample1.png", width: 540, height: 798, colors: [] },
      { id: 6, title: "Card6", image: "feed-card-sample2.png", width: 540, height: 406, colors: [] },
      { id: 7, title: "Card7", image: "card-sample.png", width: 540, height: 400, colors: [] },
      { id: 8, title: "Card8", image: "feed-card-sample1.png", width: 540, height: 798, colors: [] },
      { id: 9, title: "Card9", image: "feed-card-sample2.png", width: 540, height: 406, colors: [] }
    ];
    this.state = { items: [...this.data] };
  }

  render() {
    return (
      <div>
        <CardGroup>
          {this.state.items.map(item =>
            <ItemCard
              key={item.id}
              title={item.title}
              url="http://localhost/"
              colors={item.colors}
              image={`/images/${item.image}`}
              imageWidth={item.width}
              imageHeight={item.height}
            />
          )}
        </CardGroup>
      </div>
    );
  }
}

<CardGroupExample />
```
