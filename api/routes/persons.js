const router = require("express").Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const newPerson = new Person({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      securityClearance: req.body.securityClearance,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    });

    const person = await newPerson.save();
    res.status(200).json(person);
  } catch (error) {
    console.log({ message: "Error creating Person" });
  }
});

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    res.status(200).json(person);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Person deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
