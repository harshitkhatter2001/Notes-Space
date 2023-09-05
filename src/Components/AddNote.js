import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
// import { useState } from "react";
const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [Note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(Note.title, Note.description, Note.tag);
    setNote({ title: "", description: "", tag: "" })
  }
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value })
  }
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={Note.title}
            onChange={onChange}  minLength={5} required
          />

        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={Note.description}
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
            id="tag"
            name="tag"
            value={Note.tag}
            onChange={onChange} minLength={5} required
          />
        </div>

        <button disabled={Note.title.length<5 || Note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
