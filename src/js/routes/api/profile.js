import { Router } from "express";
import multer from "multer";

const router = new Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.put("/", upload.single("photo"), (req, res) => {
  const { user, file, body: { name } } = req;

  Promise.resolve()
    .then(() => {
      if (file != null) return user.updatePhoto(file);
      return Promise.resolve(user);
    })
    .then(entity => entity.update({ name }))
    .then(entity => {
      res.json({ user: entity.get({ plain: true }) });
    })
    .catch(res.errorJSON);
});


export default router;
