import { Router } from "express";
import models from "../../models/";


const { Board } = models;
const router = new Router();


router.get("/", (req, res) => {
  const { user } = req;

  user.getBoards()
    .then(boards => {
      res.json({ boards: boards.map(o => o.get({ plain: true })) });
    })
    .catch(res.errorJSON);
});


router.post("/", (req, res) => {
  const { user, body: { name, secret } } = req;

  Board.create({ name, secret })
    .then(board => user.addBoard(board).then(() => board))
    .then(board => {
      res.json({ board: board.get({ plain: true }) });
    })
    .catch(res.errorJSON);
});


// TODO
router.put("/", (req, res) => {
  // const { user, body } = req;
  console.log(req.body);
  res.erroJSON(new Error("TODO"));
  // body.map(
  // Promise.all(req.body.map(board => Board.updateByUserAndIdFromObject(req.user.id, board.id, board)))
  //   .then(boards => {
  //     res.json({ boards });
  //   })
  //   .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { user, body } = req;

  user.getBoards({
    where: { id: { $in: body.map(entity => entity.id) } }
  })
    .then(boards => Promise.all(boards.map(o => o.destroy())).then(() => boards))
    .then(boards => {
      res.json({ boards: boards.map(o => o.get({ plain: true })) });
    })
    .catch(res.errorJSON);
});


export default router;
