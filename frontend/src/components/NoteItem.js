import React from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
function NoteItem(props) {
  const ref = useRef(null);
    const context=useContext(NoteContext);
    const {deleteNote,updateNote}=context;
  const { title, description ,_id} = props.note;

  const updateHere=()=>{
    ref.current.click();
  }
  const[note,setNote]=useState({title:"",description:"",tag:""});
   
    const handleclick=(e)=>{

        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div className="col md-3">
      <div className="card">
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{display:"none"}}>
      Launch demo modal
    </button>
    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              autoComplete="on"
              onChange={handleclick}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label" >Description</label>
            <textarea className="form-control" id="description" name="description" onChange={handleclick}></textarea>
          </div>
        </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={()=>{updateNote(note,_id)}}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}
          </p>
          <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(_id)}}></i>
          <i className="fa-solid fa-file-pen mx-2" onClick={updateHere}></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
