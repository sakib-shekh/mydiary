import { useState } from "react";
import NoteContext from "./NoteContext";


const host = "http://localhost:5000";

const NoteState =  (props) => {
  // getting all notes created by user

  const fetchallnotes=async()=>{
    
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/login');
      return;
    }
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem('token'),
    },
  });
  let res=await response.json();
  setNotes(res);
}
 
  // add a note
  const addNote = async(title, description, tag) => {
    console.log(title,description,tag);
    if(tag==="")
    tag="General"
    
    const obj={
      title:title,
      description:description,
      tag:tag
    }
    const response = await fetch(`${host}/api/notes/addallnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body:JSON.stringify(obj)
    });
    console.log(response);
  };

  const deleteNote = async(temp) => {
    const response = await fetch(`${host}/api/notes/deletenote/${temp}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });
    console.log(response);
  };
  const updateNote = async(note1,temp) => {
    console.log(note1);
    if(note1.tag==="")
    note1.tag="General";
    const response = await fetch(`${host}/api/notes/updatenote/${temp}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body:JSON.stringify(note1)
    });
    console.log(response.json());

  };
  const Login1 = async(obj) => {

    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(obj)
    });
    let res=await response.json();
    console.log(res);
    if(res.status===200)
    {
      localStorage.setItem('token',res.token);
      window.location.replace('/');
    }
    else
    {
      console.log("wrong credential");
    }

  };
  const Register1 = async(obj) => {

    const response = await fetch(`${host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(obj)
    });
    let res=await response.json();
    console.log(res);
    if(res.status===200)
    {
      await localStorage.setItem('token',res.token);
      await window.location.replace('/');
    }
    else
    {
      console.log("wrong credential");
    }

  };


  const [notes, setNotes] = useState([]);
  return (
    <>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, fetchallnotes,Login1,Register1 }}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
