/* eslint-disable */
import _ from "lodash";
import { Router } from "express";
import Board from "../../models/board";
import { updateItemThumbnailIfNeeded } from "../../utils/drive/items";


const router = Router();


router.get("/", (req, res) => {
  Board.findAll(req.drive)
    .then(boards => {
      res.json({ boards });
    })
    .catch(res.errorJSON);
});


export default router;


// router.get("/", (req, res) => {
//   const { drive } = req;
//
//   Board.find()
//     .populate("firstItem")
//     .then(boards =>
//       Promise.all(boards.map(board =>
//         !board.firstItem
//           ? board
//           : updateItemThumbnailIfNeeded(drive, board.firstItem)
//       )).then(() => boards)
//     )
//     .then(boards => {
//       res.json({ boards });
//     })
//     .catch(res.errorJSON);
// });
//
// router.post("/", (req, res) => {
//   const board = new Board({
//     name: req.body.name
//   });
//
//   board.save()
//     .then(newBoard => {
//       res.json({ board: newBoard });
//     })
//     .catch(res.errorJSON);
// });
//
// router.put("/", (req, res) => {
//   Board.findById(req.body._id)
//     .then(board => {
//       _.forEach(req.body, (value, key) => {
//         board[key] = value;
//       });
//
//       board.modified = new Date();
//
//       return board.save();
//     })
//     .then(board => {
//       res.json({ board });
//     })
//     .catch(res.errorJSON);
// });
//
// router.delete("/", (req, res) => {
//   Board.findByIdAndRemove(req.body._id)
//     .then(() => {
//       res.json({});
//     })
//     .catch(res.errorJSON);
// });
//
// export default router;
