import Note from "./components/Note";
import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();

    const newObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(newObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    console.log("e", e.target.value);
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note.important };

    noteService.update(id, changeNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
    }).catch(error => {
      setErrorMessage(
        `Note ${note.content} was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setNotes(notes.filter(note => note.id !== id))
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} type="text" />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
