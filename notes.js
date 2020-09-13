const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const fileNotes = loadNotes();

    const notes = fileNotes.notes;
    let duplicateTitle = notes.filter(note => note.title === title);

    if(duplicateTitle.length != 0){
        console.log(chalk.red.inverse("Duplicate Note Found!"));
    } else {
    fileNotes.notes.push({
        title,body
    });
    saveNote(fileNotes);
    console.log(chalk.green.inverse("Note added"));
    }
};

const saveNote = (fileNotes) => {
    fs.writeFileSync('./notes.json', JSON.stringify(fileNotes));
}

const loadNotes = () => {
    try {
        const fileNotes = fs.readFileSync('./notes.json');
        return JSON.parse(fileNotes);
    } catch (exception) {
        return {
            'notes' : []
        };
    }
};

const removeNote = (title) => {
    let fileNotes = loadNotes();

    let newFileNotes = fileNotes.notes.filter(note => note.title != title);

    if(fileNotes.notes.length === newFileNotes.length){
        console.log(chalk.red.inverse("No Notes Found to delete!"))
    } else {
        saveNote({notes : newFileNotes});
        console.log(chalk.green.inverse("Note is deleted"))
    }
}

const readNote = (title) => {
    let fileNotes = loadNotes();

    let readNote = fileNotes.notes.find(note => note.title === title);

    if(!!readNote) {
        console.log(chalk.inverse(readNote.title));
        console.log(readNote.body);
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    readNote : readNote
}