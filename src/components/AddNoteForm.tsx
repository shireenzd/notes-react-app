import React, { useState,useEffect } from 'react'
import { minHeight, minWidth } from "../shared/constants"

function AddNoteForm({addNote,noteBeingEdited}:{addNote:Function,noteBeingEdited:any}) {

  const [noteContent, setNoteContent] = useState(''); 
  const [notePriority, setNotePriority] = useState('');
  const [noteCategory, setNoteCategory] = useState(''); 

  useEffect(() => {

    if (noteBeingEdited) {
    setNoteContent(noteBeingEdited.content || '');
    setNotePriority(noteBeingEdited.priority || '');
    setNoteCategory(noteBeingEdited.category || '');
    }
  }, [noteBeingEdited]);

  const handleContentChange = (event:any) => {
    setNoteContent(event.target.value);
  };

  const handlePriorityChange = (event: any) => {
    setNotePriority(event.target.value);
  };

  const handleCategoryChange = (event:any) => {
    setNoteCategory(event.target.value);
  };



  const handleSubmit = () => {
    const newNote = {
      content: noteContent,
      priority: notePriority,
      category: noteCategory,
      author:{
        userName:"shireen",
        profile:"/profile-pic.webp"
      }
    };
  
    addNote(newNote);
  
    // Clear form fields after submitting the note
    setNoteContent('');
    setNotePriority('');
    setNoteCategory('');
  };





  return (
    <form style={{ width: minWidth, height: minHeight }} className="Form flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-xl">
      <div className="flex flex-col text-start">
        <label htmlFor="note-content">Content</label>
        <textarea className="border-[1px] p-2 rounded border-black" name="note-content" id="note-content"
        onChange={handleContentChange}
        value={noteContent}></textarea>
      </div>
      <div className="flex flex-col text-start">
        <label htmlFor="note-priority">Priority</label>
        {[1, 2, 3, 4, 5].map((priority) => {
          return (
            <span key={priority} className="flex gap-4 items-center">
              <input type="radio"
          name="priority"
          id={'priority-' + priority}
          value={'priority-' + priority}
          checked={notePriority === 'priority-' + priority}
          onChange={handlePriorityChange}
                 />
              <label htmlFor={'priority-' + priority}>{'priority-' + priority}</label>
            </span>
          )
        })}
      </div>

      <div className="flex flex-col justify-start text-start">

        <label htmlFor="note-category">Category</label>
        <select name="note-category" id="note-category" onChange={handleCategoryChange} value={noteCategory}>
          <option value="">Select Category</option>
          <option value="home">home</option>
          <option value="hobbies">hobbies</option>
          <option value="work">work</option>
        </select>
      </div>

      <button type="button" className="bg-green-300" onClick={handleSubmit}>
        Add Note
      </button>
    </form>
  )
}

export default AddNoteForm