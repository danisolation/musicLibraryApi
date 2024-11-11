const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const upload = require("../middlewares/fileUpload");

router.post("/", upload.single("file"), trackController.createTrack);
router.get("/", trackController.getAllTracks);
router.get("/:id", trackController.getTrackById);
router.put("/:id", trackController.updateTrack);
router.delete("/:id", trackController.deleteTrack);

module.exports = router;
