const router = require("express").Router();
const Billet = require("../models/Billet");

router.post("/", async (req, res) => {
  try {
    const newBillet = new Billet({
      billetNumber: req.body.billetNumber,
      title: req.body.title,
      billetStatus: req.body.billetStatus,
      exemptStatus: req.body.exemptStatus,
      travelRequirement: req.body.travelRequirement,
      clearanceRequirement: req.body.clearanceRequirement,
    });

    const billet = await newBillet.save();
    res.status(200).json(billet);
  } catch (error) {
    console.log({ message: "Error creating Billet" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBillet = await Billet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBillet);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const billet = await Billet.findById(req.params.id);
    res.status(200).json(billet);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const billets = await Billet.find();
    res.status(200).json(billets);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Billet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Billet deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
