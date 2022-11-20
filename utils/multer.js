const multer = require('multer');
const SharpMulter  =  require("sharp-multer");

const storage = multer.diskStorage({})

let upload = multer({
    storage
})

module.exports = upload;