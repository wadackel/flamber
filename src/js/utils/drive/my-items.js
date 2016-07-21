import _ from "lodash";
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

export function findBoard(drive, id) {
  return new Promise((resolve, reject) => {
    fetchMyItems(drive)
      .then(({ boards }) => {
        const board = _.find(boards, o => o.id === id);
        board ? resolve(board) : reject(new Error("Not found"));
      })
      .catch(reject);
  });
}

export function updateBoard(drive, id, newBoard) {
  return new Promise((resolve, reject) => {
    console.log(id, newBoard);
    fetchMyItems(drive)
      .then(myItems => updateMyItems(drive, {
        ...myItems,
        boards: myItems.boards.map(board =>
          board.id === id ? newBoard : board
        )
      }))
      .catch(reject);
  });
}
