import React, { useEffect } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
function Notes() {

   
    const context=useContext(NoteContext);
    let {notes,fetchallnotes}=context ;

    useEffect(()=>{
      fetchallnotes();
    },[fetchallnotes]);
  return (
    <div className="row my-3">
    {
      localStorage.getItem('token')===undefined && window.location.replace('/login')
    }
    <h1>Your Notes</h1>
    {
      notes.length===0 ? notes.length===0 && <div>empty List</div>:notes.length && notes.map((e,index)=>{
        return <NoteItem key={index} note={e}/>
      })
    }

    </div>
  )
}

export default Notes
