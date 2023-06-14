import React from "react";
import { useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
function Register() {
    const context=useContext(NoteContext);
    let {Register1}=context;
    const[login,setlogin]=useState({name:"",email:"",password:""});
    const handlChange=(e)=>{
        setlogin({...login,[e.target.name]:e.target.value});
    }
    const clicked=(e)=>{
        e.preventDefault();
        Register1(login);
    }
  return (
    <div className="container">
      <form>
      <div className="form-group my-2">
          <label htmlFor="name">name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            placeholder="name"
            autoComplete="on"
            onChange={handlChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            placeholder="Enter email"
            autoComplete="on"
            onChange={handlChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
            autoComplete="on"
            onChange={handlChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={clicked}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Register
