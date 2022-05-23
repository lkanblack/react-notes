import React from "react";
import { Link } from "react-router-dom";

const getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const getTitle = (note) => {
  // split by new lines and get the first line
  // split will make a list of each line and will pull on the first

  const title = note.body.split("\n")[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }

  return title;
};

let getContent = (note) => {
  // get all content after title
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", "");
  content = content.replaceAll(title, "");

  if (content.length > 45) {
    return content.slice(0, 45) + "...";
  } else {
    return content;
  }
};

function ListItem({ note }) {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getTime(note)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
    // <Link /> using instead of a and href
  );
}

export default ListItem;
