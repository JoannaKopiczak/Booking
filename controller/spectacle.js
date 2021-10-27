const mongoose = require("mongoose");
const Spectacle = require("../models/spectacle");
const multer = require("multer");
const fs = require("fs");

exports.getAllSpectacles = (req, res) => {
  Spectacle.find()
    .then((spectacles) =>
      res.status(200).json({
        count: spectacles.length,
        spectacles: spectacles,
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

exports.addSpectacle = (req, res) => {
  // upload(req, res, (err) => {
  //   if (err) res.status(500).json(err);
  //   else {
  //     fs.readFile(req.file.path, function (err, data) {
  //       if (err) throw err;
  //       else {
  //        const contentType = req.file.mimetype;
          const newSpectacle = new Spectacle({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
           // numberInStock: req.body.numberInStock,
            genre: req.body.genre,
            description: req.body.description,
            spectacleLength: req.body.spectacleLength,
           // image: { data, contentType },
            rate: req.body.rate,
          });

          //Saving new spectalce in db
          newSpectacle.save((err, spectacle) => {
            if (err) res.status(500).json({ error: err });
            else {
              res.status(201).json({
                message: "A new spectacle added.",
                spectacle: spectacle,
              });
            }
          });
        }
//       });
//     }
//   });
// };

