import React, { useState, useEffect } from "react";
import AddButton from "../components/AddButton";
import ListItem from "../components/ListItem";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  // useEffect with , [] - makes call just one time NB

  const getNotes = async () => {
    const response = await fetch("http://localhost:5000/notes");
    const data = await response.json();
    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782;Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
          //NB Each value must have a key value
        ))}
      </div>
      <AddButton />
    </div>
  );
}

export default NotesPage;
