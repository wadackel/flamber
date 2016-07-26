import _ from "lodash";
import { Router } from "express";
import Board from "../../models/board";

const router = Router();

router.get("/", (req, res) => {
  Board.find({})
    .then(boards => {
      res.json({
        status: "ok",
        boards
      });
    })
    .catch(res.errorJSON);
});

router.post("/", (req, res) => {
  const board = new Board({
    name: req.body.name
  });

  board.save()
    .then(newBoard => {
      res.json({
        status: "ok",
        board: newBoard
      });
    })
    .catch(res.errorJSON);
});

router.put("/", (req, res) => {
  Board.findById(req.body._id)
    .then(board => {
      _.forEach(req.body, (value, key) => {
        board[key] = value;
      });

      board.modified = new Date();

      return board.save();
    })
    .then(board => {
      res.json({
        status: "ok",
        board
      });
    })
    .catch(res.errorJSON);
});

router.delete("/", (req, res) => {
  Board.findByIdAndRemove(req.body._id)
    .then((test, test1) => {
      res.json({ status: "ok" });
    })
    .catch(res.errorJSON);
});

export default router;
