/* eslint-disable */
import _ from "lodash";
import { Router } from "express";
import Board from "../../models/board";


const router = Router();


router.get("/", (req, res) => {
  Board.findAll(req.drive)
    .then(boards => {
      res.json({ boards });
    })
    .catch(res.errorJSON);
});


router.post("/", (req, res) => {
  const board = new Board({
    name: req.body.name
  });

  board.save()
    .then(savedBoard => {
      res.json({ board: savedBoard });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { drive, body } = req;

  Promise.all(body.map(board => Board.removeById(drive, board.id)))
    .then(boards => {
      res.json({ boards });
    })
    .catch(res.errorJSON);
});

export default router;
