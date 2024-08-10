document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
});

const addNote = () => {
    const noteInput = document.getElementById("note-input");
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("La nota no puede estar vacía.");
        return;
    }

    const note = {
        text: noteText,
        important: false,
        id: Date.now(),
    };

    saveNoteToLocalStorage(note);
    noteInput.value = "";
    renderNotes();
}; 

const renderNotes = () => {
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";
    const notes = getNotesFromLocalStorage();

    notes.forEach((note) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = `note ${note.important ? "important" : ""}`;

        const noteText = document.createElement("div");
        noteText.textContent = note.text;

        const noteButtons = document.createElement("div");
        noteButtons.className = "note-buttons";

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => editNote(note.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => deleteNote(note.id);

        const importantButton = document.createElement("button");
        importantButton.textContent = note.important
            ? "Quitar Importante"
            : "Marcar Importante";
        importantButton.onclick = () => toggleImportant(note.id);

        noteButtons.appendChild(editButton);
        noteButtons.appendChild(deleteButton);
        noteButtons.appendChild(importantButton);

        noteDiv.appendChild(noteText);
        noteDiv.appendChild(noteButtons);
        notesContainer.appendChild(noteDiv);
    });
};

const saveNoteToLocalStorage = (note) => {
    const notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
};

const getNotesFromLocalStorage = () => {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
};

const loadNotes = () => {
    renderNotes();
};

const editNote = (id) => {
    const newText = prompt("Edita la nota:");
    if (newText !== null) {
        const notes = getNotesFromLocalStorage();
        const noteIndex = notes.findIndex((note) => note.id === id);
        if (noteIndex !== -1) {
            notes[noteIndex].text = newText;
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNotes();
        }
    }
};

const deleteNote = (id) => {
    const notes = getNotesFromLocalStorage();
    const filteredNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    renderNotes();
};

const toggleImportant = (id) => {
    const notes = getNotesFromLocalStorage();
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
        notes[noteIndex].important = !notes[noteIndex].important;
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    }
};
