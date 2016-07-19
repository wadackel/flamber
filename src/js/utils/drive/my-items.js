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
