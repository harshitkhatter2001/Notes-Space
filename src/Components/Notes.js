import React, { useContext, useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { Notes, getNotes ,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()
    }
    else{
    navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)

  const [Note, setNote] = useState({ id: "",etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    console.log("incd");
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
  }

  const handleClick = (e) => {
    console.log("updating the note..",Note)
    editNote(Note.id, Note.etitle, Note.edescription, Note.etag)
     refClose.current.click();
    
  }
  
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value })
  }
  
  return (
    <>
      <AddNote />
<button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={Note.etitle}
            aria-describedby="emailHelp"
            onChange={onChange} minLength={5} required
          />

        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={Note.edescription}
            onChange={onChange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value={Note.etag}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={Note.etitle.length<5 || Note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
        {Notes.length===0 && 'No notes to display'}
        </div>
        {Notes?.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes