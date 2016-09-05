export function getItemThumbnail(drive, id) {
  return new Promise((resolve, reject) => {
    drive.files.get({
      fileId: id,
      fields: "id, thumbnailLink, imageMediaMetadata(width, height)"
    }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function updateItemThumbnail(drive, item) {
  return new Promise((resolve, reject) => {
    const date = new Date();

    drive.files.update({
      fileId: item.fileId,
      resource: {
        modifiedTime: date.toISOString()
      },
      fields: "id"
    }, err => {
      if (err) return reject(err);

      getItemThumbnail(drive, item.fileId)
        .then(file => {
          item.thumbnail = file.thumbnailLink;
          item.modified = date;
          item.save().then(savedItem => resolve(savedItem)).catch(reject);
        })
        .catch(reject);
    });
  });
}

export function updateItemThumbnailIfNeeded(drive, item) {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const diff = (date - item.modified) / 1000 / 60;

    if (diff < 50) {
      return resolve(item);
    }

    updateItemThumbnail(drive, item)
      .then(resolve)
      .catch(reject);
  });
}

export function updateItemsThumbnailIfNeeded(drive, items) {
  return Promise.all(items.map(item => updateItemThumbnailIfNeeded(drive, item)));
}

export function uploadItemFile(drive, file) {
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
      fields: "id"
    }, (err, res) => {
      if (err) return reject(err);

      getItemThumbnail(drive, res.id)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function updateItemFile(drive, id, file) {
  return new Promise((resolve, reject) => {
    drive.files.update({
      fileId: id,
      resource: {
        name: file.originalname,
        mimeType: file.mimetype
      },
      media: {
        mimeType: file.mimetype,
        body: file.buffer
      },
      fields: "id"
    }, (err, res) => {
      if (err) return reject(err);

      getItemThumbnail(drive, res.id)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function deleteItemFile(drive, id) {
  return new Promise((resolve, reject) => {
    drive.files.delete({
      fileId: id
    }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(id);
      }
    });
  });
}
