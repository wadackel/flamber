import { Router } from "express";
import webshot from "webshot";
import useragent from "express-useragent";

const router = Router();


function takeScreenshot(url, options = {}) {
  return new Promise((resolve, reject) => {
    webshot(url, options, (err, renderStream) => {
      if (err) return reject(err);

      const chunks = [];
      renderStream.on("data", data => chunks.push(new Buffer(data)));
      renderStream.on("error", reject);
      renderStream.on("end", () => {
        const data = Buffer.concat(chunks);
        resolve(data);
      });
    });
  });
}


router.get("/:url", useragent.express(), (req, res) => {
  const options = {
    windowSize: {
      width: 1280,
      height: 768
    },
    shotSize: {
      width: "window",
      height: "all"
    },
    userAgent: req.get("User-Agent")
  };

  takeScreenshot(req.params.url, options)
    .then(buffer => {
      res.status(200).end(buffer, "binary");
    })
    .catch(res.errorJSON);
});


export default router;
