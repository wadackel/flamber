import { Router } from "express";
import Board from "../../models/board";


const router = Router();


router.get("/", (req, res) => {
  Board.findAllByUser(req.user.id)
    .then(boards => {
      res.json({ boards });
    })
    .catch(res.errorJSON);
});


router.post("/", (req, res) => {
  const board = new Board({
    user: req.user.id,
    name: req.body.name
  });

  board.save()
    .then(savedBoard => {
      res.json({ board: savedBoard });
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
