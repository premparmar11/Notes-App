const yargs = require('yargs');
const { string } = require('yargs');
const notes = require('./notes');

yargs.version("1.0.0")

yargs.command({
    command : "Add",
    describe: "Adding note in notes",
    builder : {
        // param name
        title : {
            describe : "Title of note",
            demandOption : true,
            type : "string"
        },
        body : {
            describe : "Task description",
            demandOption : true,
            type : "string"
        }
    },
    handler : (argv) => {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command : "Remove",
    describe : "Remove note from notes",
    builder : {
        title : {
            describe : "title of note",
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => {
        notes.removeNote(argv.title);
    }
})

yargs.parse();