import uuid from "node-uuid";
import { Router } from "express";
import { fetchSettings, updateSettings } from "../utils/drive/settings";
import {
  fetchMyItems,
  createMyItems,
  updateMyItems,
  findBoard,
  updateBoard
} from "../utils/drive/my-items";

const router = Router();


function errorResponse(res, error) {
  console.log(error); // eslint-disable-line no-console
  res.json({
    status: "error",
    error
  });
}


// Settings
router.get("/settings", (req, res) => {
  const { drive } = req;

  fetchSettings(drive)
    .then(settings => {
      res.json({
        status: "ok",
        settings
      });
    })
    .catch(error => {
      errorResponse(res, error);
    });
});

router.post("/settings", (req, res) => {
  const { drive } = req;

  updateSettings(drive, req.body)
    .then(settings => {
      res.json({
        status: "ok",
        settings
      });
    })
    .catch(error => {
      errorResponse(res, error);
    });
});


// Boards
router.get("/boards", (req, res) => {
  const { drive } = req;

  fetchMyItems(drive)
    .then(({ boards }) => {
      res.json({
        status: "ok",
        boards
      });
    })
    .catch(error => {
      errorResponse(res, error);
    });
});

router.post("/boards", (req, res) => {
  const { drive, body } = req;
  const dateString = new Date().toString();

  fetchMyItems(drive)
    .then(myItems => createMyItems(drive, {
      ...myItems,
      boards: [...myItems.boards, {
        id: uuid.v4(),
        name: body.name,
        image: "",
        itemCount: 0,
        created: dateString,
        modified: dateString
      }]
    }))
    .then(({ boards }) => {
      res.json({
        status: "ok",
        board: boards.pop()
      });
    })
    .catch(error => {
      errorResponse(res, error);
    });
});

router.delete("/boards/", (req, res) => {
  const { drive, body } = req;

  fetchMyItems(drive)
    .then(myItems => updateMyItems(drive, {
      ...myItems,
      boards: myItems.boards.filter(board =>
        board.id !== body.id
      )
    }))
    .then(() => {
      res.json({
        status: "ok",
        id: body.id
      });
    })
    .catch(error => {
      errorResponse(res, error);
    });
});

router.get("/boards/:id", (req, res) => {
  const { drive, params } = req;

  findBoard(drive, params.id)
    .then(board => {
      res.json({
        status: "ok",
        board
      });
    })
    .catch(error => errorResponse(res, error));
});

router.put("/boards/:id", (req, res) => {
  const { drive, params, body } = req;

  updateBoard(drive, params.id, body)
    .then(board => {
      res.json({
        status: "ok",
        board
      });
    })
    .catch(error => errorResponse(res, error));
});


export default router;
