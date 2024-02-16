const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloundinaryConfig'); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images', 
    public_id: (req, file) => new Date().toISOString() + '-avatar' 
  }
});

module.exports = storage;
