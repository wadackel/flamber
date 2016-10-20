// @flow
import request from "request";
import FeedParser from "feedparser";

export type XMLParseOptions = {
  normalize?: boolean;
  addmeta?: boolean;
  feedurl?: string;
  resume_saxerror?: boolean;
  itemFilter?: (item: Object) => Object;
};

export type XMLData = {
  meta: Object;
  items: Array<Object>;
};

export default function requestXML(url: string, options?: XMLParseOptions = {}): Promise<XMLData> {
  return new Promise((resolve, reject) => {
    const req = request(url);
    const parser = new FeedParser(options);
    const itemFilter = options.itemFilter ? options.itemFilter : item => item;
    const data: XMLData = {
      meta: {},
      items: []
    };

    req.on("error", error => reject(error));
    parser.on("error", error => reject(error));

    req.on("response", function(res) {
      if (res.statusCode !== 200) {
        this.emit("error", new Error("Bad status code"));
      } else {
        this.pipe(parser);
      }
    });

    parser.on("readable", function() {
      data.meta = this.meta;

      /* eslint-disable no-cond-assign */
      let item = null;
      while (item = this.read()) {
        item = itemFilter(item);
        if (item) {
          data.items.push(item);
        }
      }
      /* eslint-enable no-cond-assign */
    });

    parser.on("end", () => {
      resolve(data);
    });
  });
}
