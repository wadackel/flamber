import { Router } from "express";
import multer from "multer";
import models from "../../models/";

const { User } = models;
const router = new Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put("/", upload.single("photo"), (req, res) => {
  const { file, body: { id, name } } = req;

  User.findById(id)
    .then(user => {
      if (file != null) return user.updatePhoto(file);
      return Promise.resolve(user);
    })
    .then(user => user.update({ name }))
    .then(user => {
      res.json({ user: user.get({ plain: true }) });
    })
    .catch(res.errorJSON);
});


export default router;
