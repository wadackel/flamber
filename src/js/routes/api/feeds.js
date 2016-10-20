import { Router } from "express";
import models from "../../models/";

const { Feed } = models;
const router = new Router();


router.get("/", (req, res) => {
  const { user } = req;

  user.getFeeds()
    .then(feeds => {
      res.json({ feeds: feeds.map(entity => entity.get({ plain: true })) });
    })
    .catch(res.errorJSON);
});


router.post("/", (req, res) => {
  const { user, body: { url } } = req;

  Feed.createByURL(url)
    .then(feed => user.addFeed(feed).then(() => feed))
    .then(feed => {
      res.json({ feed: feed.get({ plain: true }) });
    })
    .catch(res.errorJSON);
});


export default router;
