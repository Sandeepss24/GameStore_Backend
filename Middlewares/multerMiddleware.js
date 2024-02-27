//1)import multer
const multer =require("multer")


 //2)create multerconfiguration
 const multerconfig =multer({
    storage,
    fileFilter
 })


 //3)export multer
 module.exports = multerconfig