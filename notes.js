const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const fileNotes = loadNotes();

    const notes = fileNotes.notes;
    let duplicateTitle = notes.filter(note => note.title === title);

    if(duplicateTitle.length != 0){
        console.log(chalk.red.bold("Duplicate Note Found!"));
    } else {
    fileNotes.notes.push({
        title,body
    });
    saveNote(fileNotes);
    }
};

const saveNote = (fileNotes) => {
    console.log(chalk.green.bold("Note added"));
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

module.exports = {
    addNote : addNote
}