import { Router } from "express";
import models from "../../models/";


const { Board, Item, Tag } = models;
const router = new Router();


router.get("/", (req, res) => {
  Board.findAll({
    where: { user_id: req.user.id },
    include: [{ model: Item, include: [{ model: Tag }] }]
  })
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
      res.json({ board });
    })
    .catch(res.errorJSON);
});


router.put("/", (req, res) => {
  const { user, body } = req;

  Promise.all(body.map(attributes =>
    Board.find({ where: { id: attributes.id, user_id: user.id } })
      .then(board => {
        if (!board) throw new Error("Not found board");
        return board.update(Board.filterEditableAttributes(attributes));
      })
      .then(board => board.includeAll())
  ))
    .then(boards => {
      res.json({ boards });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { user, body } = req;

  user.getBoards({
    where: { id: { $in: body.map(entity => entity.id) } }
  })
    .then(boards => Promise.all(boards.map(o => o.destroy())).then(() => boards))
    .then(boards => {
      res.json({ boards });
    })
    .catch(res.errorJSON);
});


export default router;
