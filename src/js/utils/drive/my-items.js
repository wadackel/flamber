import _ from "lodash";
import uuid from "node-uuid";
import {
  findJSON,
  getJSON,
  createJSON,
  updateJSON
} from "../drive-json";

const FILE_NAME = "my-items.json";

export function fetchMyItems(drive) {
  return new Promise((resolve, reject) => {
    findJSON(drive, FILE_NAME)
      .then(file => getJSON(drive, file.id))
      .then(resolve)
      .catch(reject);
  });
}

export function createMyItems(drive, myItems) {
  return new Promise((resolve, reject) => {
    createJSON(drive, FILE_NAME, myItems)
      .then(file => getJSON(drive, file.id))
      .then(resolve)
      .catch(reject);
  });
}

export function updateMyItems(drive, myItems) {
  return new Promise((resolve, reject) => {
    findJSON(drive, FILE_NAME)
      .then(file => updateJSON(drive, file.id, FILE_NAME, myItems))
      .then(file => getJSON(drive, file.id))
      .then(resolve)
      .catch(reject);
  });
}

// FIXME: Refactor
export function findBoard(drive, id) {
  return new Promise((resolve, reject) => {
    fetchMyItems(drive)
      .then((myItems) => {
        const { boards } = myItems;
        const board = _.find(boards, o => o.id === id);
        board ? resolve({ myItems, board }) : reject(new Error("Not found"));
      })
      .catch(reject);
  });
}

// FIXME: Refactor
export function updateBoard(drive, id, props) {
  return new Promise((resolve, reject) => {
    fetchMyItems(drive)
      .then(myItems => updateMyItems(drive, {
        ...myItems,
        boards: myItems.boards.map(board =>
          board.id === id ? Object.assign({}, board, props) : board
        )
      }))
      .then(({ boards }) => {
        const board = _.find(boards, o => o.id === id);
        board ? resolve(board) : reject(new Error("Not found"));
      })
      .catch(reject);
  });
}

function uploadImage(drive, file) {
  return new Promise((resolve, reject) => {
    drive.files.create({
      resource: {
        parents: ["appDataFolder"],
        name: file.originalname,
        mimeType: file.mimetype
      },
      media: {
        mimeType: file.mimetype,
        body: file.buffer
      },
      fields: "id, mimeType"
    }, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

function fetchImageThumbnail(drive, id) {
  return new Promise((resolve, reject) => {
    drive.files.get({
      fileId: id,
      fields: "id, name, mimeType, thumbnailLink"
    }, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

export function addItemByFile(drive, boardId, file, palette) {
  return new Promise((resolve, reject) => {
    let resultMyItems;
    let resultBoard;

    findBoard(drive, boardId)
      .then(({ myItems, board }) => {
        resultMyItems = myItems;
        resultBoard = board;

        return uploadImage(drive, file);
      })
      .then(res => fetchImageThumbnail(drive, res.id))
      .then(res => {
        const dateString = new Date().toString();
        const item = {
          id: res.id,
          url: "",
          description: "",
          name: file.originalname,
          thumbnail: res.thumbnailLink,
          mimeType: res.mimeType,
          tags: [],
          created: dateString,
          modified: dateString,
          palette,
          boardId
        };

        resultBoard.items.push(item);

        return updateBoard(drive, boardId, resultBoard);
      })
      .then(resolve)
      .catch(reject);
  });
}
