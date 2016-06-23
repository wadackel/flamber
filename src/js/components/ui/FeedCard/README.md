Basic:

```
class FeedCardExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FeedCard
        style={{ width: 270 }}
        url="http://example.com/path/to/"
        site="https://blog.wadackel.me/"
        favicon="/images/sample-favicon.ico"
        title="Dripup Creative Design Pallete"
        image="/images/feed-card-sample1.png"
        imageWidth={540}
        imageHeight={798}
      />
    );
  }
}

<FeedCardExample />
```
