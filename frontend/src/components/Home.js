import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
export default function Home() {
(!localStorage.getItem('token'))&& window.location.replace('/login')
  return (
    localStorage.getItem('token') &&<div className="container">
      <AddNote />
      <Notes />
    </div>
  );
}
