const multer = require('multer');


const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = upload;