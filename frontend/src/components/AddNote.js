import React, { useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
function AddNote() {
    const context=useContext(NoteContext);
    const {addNote}=context;
    const[note,setNote]=useState({title:"",description:"",tag:""});
   
    const handleclick=(e)=>{

        setNote({...note,[e.target.name]:e.target.value});
    }
    const clicked=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }   
  return (
    <div className="container">
      <h1>Add a Note</h1>
      <form>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter title here"
            autoComplete="on"
            onChange={handleclick}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="sescription"
            name="description"
            placeholder="Enter description here"
            autoComplete="on"
            onChange={handleclick}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={clicked}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
