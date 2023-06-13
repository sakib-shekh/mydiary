const express = require("express");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware.js/fetchuser.js");
const Notes = require("../models/Notes.js");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const reqId = req.user.id;
  const NotesT = await Notes.find({ user: reqId });
  res.json(NotesT);
});

router.post(
  "/addallnotes",
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    try
    {const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: "just" });
    }
    const { title, description, tag } = req.body;
    const reqId = req.user.id;
    console.log(reqId);
    const note2 = new Notes({
      title,
      description,
      tag,
      user: reqId,
    });
    note2.save();
    res.json(note2);}
    catch(error)
    {
      console.log(error);
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote={};
  if(title)
  newNote.title=title;
  if(description)
  newNote.description=description;
  if(tag)
  newNote.tag=tag;
    let note= await Notes.findById(req.params.id);
    if(!note)
    return res.send("not found");
    if(note.user.toString() !== req.user.id)
    return res.send("not allowed");
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    let note= await Notes.findById(req.params.id);
    if(!note)
    return res.send("not found");
    if(note.user.toString() !== req.user.id)
    return res.send("not allowed");
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Delete Successfully");
  });
module.exports = router;
