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


// TODO: Remove populate items
router.delete("/", (req, res) => {
  Promise.all(req.body.map(board => Board.findByIdAndRemove(board.id)))
    .then(() => {
      res.json({});
    })
    .catch(res.errorJSON);
});

export default router;
