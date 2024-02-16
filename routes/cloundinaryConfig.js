const cloudinary = require('cloudinary').v2;

const config = {
  cloud_name: "dwzejho0w",
  api_key: "887686983359352",
  api_secret: "HwW-uVjqTseOL4a5DyzHc61fhFk"
};

cloudinary.config(config);

module.exports = cloudinary;
