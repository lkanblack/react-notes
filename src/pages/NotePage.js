import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// images
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

function NotePage() {
  const noteId = useParams().id;
  // useParams - to find id in parameters (react router v6)
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  const getNote = async () => {
    if (noteId === "new") return;
    const response = await fetch(`http://localhost:5000/notes/${noteId}`);
    const data = await response.json();

    setNote(data);
  };

  const createNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const handleSubmit = () => {
    if (noteId !== "new" && !note.body) {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    }
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  //const note = notes.find((note) => note.id == noteId);

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== "new" ? (
          <Link to="/">
            <button onClick={deleteNote}>Delete</button>
          </Link>
        ) : (
          <Link to="/">
            <button onClick={handleSubmit}>Done</button>
          </Link>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>

      {/* With onChange and parameters we can add text in textarea */}
      {/* ? - only output if it actually exists! */}
    </div>
  );
}

export default NotePage;
