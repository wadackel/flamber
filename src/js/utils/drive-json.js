const mimeType = "application/json";

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
      q: `name = "${name}" and mimeType = "${mimeType}"`,
      spaces: "appDataFolder"
    }, (err, res) => {
      if (err) {
        reject(err);
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
        parents: ["appDataFolder"],
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
        parents: ["appDataFolder"],
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
