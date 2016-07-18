const mimeType = "application/json";
const folder = "appDataFolder";

export function getJSON(drive, fileId) {
  return new Promise((resolve, reject) => {
    drive.files.get({
      alt: "media",
      fileId,
      mimeType
    }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function findJSON(drive, name) {
  return new Promise((resolve, reject) => {
    drive.files.list({
      q: `name = '${name}'`,
      spaces: folder
    }, (err, res) => {
      if (err) {
        reject(err);
      } else if (res.files.length === 0) {
        reject("Not found");
      } else {
        resolve(res.files.shift());
      }
    });
  });
}

export function createJSON(drive, name, body) {
  return new Promise((resolve, reject) => {
    drive.files.create({
      resource: {
        parents: [folder],
        name,
        mimeType
      },
      media: {
        body: JSON.stringify(body),
        mimeType
      }
    }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function updateJSON(drive, fileId, name, body) {
  return new Promise((resolve, reject) => {
    drive.files.update({
      fileId,
      resouce: {
        parents: [folder],
        name
      },
      media: {
        body: JSON.stringify(body)
      }
    }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function updateOrCreateJSON(drive, name, body) {
  return new Promise((resolve, reject) => {
    findJSON(drive, name)
      .then(file => {
        if (file) {
          return updateJSON(drive, file.id, name, body);
        } else {
          return createJSON(drive, name, body);
        }
      })
      .then(resolve)
      .catch(reject);
  });
}
