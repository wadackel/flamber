import {
  findJSON,
  getJSON,
  createJSON,
  updateJSON
} from "../drive-json";

const FILE_NAME = "settings.json";


export function fetchSettings(drive) {
  return new Promise((resolve, reject) => {
    findJSON(drive, FILE_NAME)
      .then(file => getJSON(drive, file.id))
      .then(resolve)
      .catch(reject);
  });
}

export function createSettings(drive, settings) {
  return new Promise((resolve, reject) => {
    createJSON(drive, FILE_NAME, settings)
      .then(file => getJSON(drive, file.id))
      .then(resolve)
      .catch(reject);
  });
}

export function updateSettings(drive, settings) {
  return new Promise((resolve, reject) => {
    findJSON(drive, FILE_NAME)
      .then(file => updateJSON(drive, file.id, FILE_NAME, settings))
      .then(file => getJSON(drive, file.id))
      .then(resolve)
      .catch(reject);
  });
}
