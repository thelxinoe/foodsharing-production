import { Mongo } from 'meteor/mongo';

const imagePreprocessing = function(fileObj, readStream, writeStream) {
  readStream.pipe(writeStream);
}
const thumbPreprocessing = function(fileObj, readStream, writeStream) {
  readStream.pipe(writeStream);
}

const thumbStore = new FS.Store.GridFS("thumbs", {
    transformWrite: imagePreprocessing, //optional
    chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                          // Default: 2MB. Reasonable range: 512KB - 4MB
  });

const imageStore = new FS.Store.GridFS("images", {
    transformWrite: imagePreprocessing, //optional
    chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                          // Default: 2MB. Reasonable range: 512KB - 4MB
  });

export const Images = new FS.Collection("images", {
  stores: [
    thumbStore,
    imageStore
  ]
});

//Need to do authorisation here because the lib will be called clientside
Images.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
