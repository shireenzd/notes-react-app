import React, { useState ,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import NotesList from "./components/NotesList";
import AddNoteForm from "./components/AddNoteForm";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      category: "home",
      content: "Buy groceries",
      priority: "priority-2",
      author: {
        userName: "shireen",
        profile:"/profile-pic.webp"
      },
    },
    {
      id: 2,
      category: "hobbies",
      priority: "priority-1",
      content: "Note 2",
      author: {
        userName: "shireen",
        profile:"/profile-pic.webp"
      },
    },
  ]);

  const [noteBeingEdited, setNoteBeingEdited] = useState({});
 
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  function addNote(note: any) {
    const newNote = { ...note, id: uuidv4() };
    const newNotesArray = [...notes, newNote];
    localStorage.setItem('notes', JSON.stringify(newNotesArray));
    setNotes(newNotesArray);
  }

 

  function editNote(noteID: number) {
    let noteToEdit = notes.find((note) => note.id === noteID);
  
    if (noteToEdit) {
      
      setNoteBeingEdited(noteToEdit);

      // Filter out the edited note from the form
      let updatedNotes = notes.filter((note) => note.id !== noteID);
      setNotes(updatedNotes);
    }
  }

  function deleteNote(noteID: number) {
    console.log('Before Deletion:', notes);
    const updatedNotes = notes.filter((note) => note.id !== noteID);
    console.log('After Deletion:', updatedNotes);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }
  
  

  function sortNotesAsc() {
    const sortedNotes = [...notes];
  
    sortedNotes.sort((a, b) => {
      // Extract numerical parts of priority and compare
      const priorityA = parseInt(a.priority.split('-')[1]);
      const priorityB = parseInt(b.priority.split('-')[1]);
  
      return priorityA - priorityB;
    });
  
    setNotes(sortedNotes);
  }
  
  function sortNotesDesc() {
    const sortedNotes = [...notes];
  
    sortedNotes.sort((a, b) => {
      // Extract numerical parts of priority and compare
      const priorityA = parseInt(a.priority.split('-')[1]);
      const priorityB = parseInt(b.priority.split('-')[1]);
  
      return priorityB - priorityA;
    });
  
    setNotes(sortedNotes);
  }

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event:any) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };


  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.category === selectedCategory)
    : notes;


   
  return (
    <div className="App flex justify-center items-center h-screen gap-[2rem] bg-[var(--accent-light)]">
      <NotesList
        deleteNote={deleteNote}
        editNote={editNote}
        notes={notes}
        sortNotesAsc={sortNotesAsc}
        sortNotesDesc={sortNotesDesc} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} filteredNotes={filteredNotes}      />
      <AddNoteForm noteBeingEdited={noteBeingEdited} addNote={addNote}/>
    </div>
  );
}

export default App;
