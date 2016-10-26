import { Router } from "express";
import models from "../../models/";


const { Board } = models;
const router = new Router();


router.get("/", (req, res) => {
  Board.findAllByUser(req.user.id)
    .then(boards => {
      res.json({ boards });
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


router.put("/", (req, res) => {
  Promise.all(req.body.map(board => Board.updateByUserAndIdFromObject(req.user.id, board.id, board)))
    .then(boards => {
      res.json({ boards });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { body, user } = req;

  Promise.all(body.map(board => Board.removeByUserAndId(user.id, board.id)))
    .then(boards => {
      res.json({ boards });
    })
    .catch(res.errorJSON);
});


export default router;
