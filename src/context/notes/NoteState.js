import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://inotebook-server-pp25.onrender.com"
  const notesinitial = [
    {
      "_id": "6488dd53a0daae5e036800ea1",
      "user": "6488c6b5d62e3a13e6ea0bc0",
      "title": "My Title",
      "description": "Please wake up",
      "tag": "personal",
      "date": "2023-06-13T21:19:15.872Z",
      "__v": 0
    },
    {
      "_id": "6488dd54a01daae5e036800ec",
      "user": "6488c6b5d62e3a13e6ea0bc0",
      "title": "My Title",
      "description": "Please wake up",
      "tag": "personal",
      "date": "2023-06-13T21:19:16.680Z",
      "__v": 0
    },
    {
      "_id": "6488dec88702dd296a018f2fc",
      "user": "6488c6b5d62e3a13e6ea0bc0",
      "title": "My Title",
      "description": "Please wake up",
      "tag": "personal",
      "date": "2023-06-13T21:25:28.855Z",
      "__v": 0
    }
  ]

  const [Notes, setNotes] = useState(notesinitial)
  // get all  note
  const getNotes = async( ) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
  
      },
    });

    const json  = await response.json()
    setNotes(json)
  }

  // Addnote
  const addNote = async(title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
  
      },
  
      body: JSON.stringify({title,description,tag}),
    });

   const Note = await response.json();
   setNotes(Notes.concat(Note));

  }

  // Deletenote
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    console.log(json)
    const newNotes = Notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // editNote
  const editNote = async(id, title, description, tag)=> {
  // API call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')

    },

    body: JSON.stringify({title,description,tag}),
  });
  const json = await response.json();
  console.log(json)


// logic to edit in client
for (let index = 0; index < Notes.length; index++) {
  const element = Notes[index];
  if (element._id === id) {
    Notes[index].title = title;
    Notes[index].description = description;
    Notes[index].tag = tag;
  }
  break;
 }
 setNotes(Notes);
}
return (
  <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote,getNotes}}>
    {props.children}
  </NoteContext.Provider>
)
}

export default NoteState;