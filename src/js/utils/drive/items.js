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
    }, (err, tmpResult) => {
      if (err) return reject(err);

      getItemThumbnail(drive, tmpResult.id).then(res => {
        resolve(res);
      }).catch(reject);
    });
  });
}
