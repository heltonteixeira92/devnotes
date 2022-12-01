// Elementos

const notesContainer = document.querySelector("#notes-container")

const noteInput = document.querySelector("#note-content")

const addNoteBtn = document.querySelector(".add-note")



// Funcões

    // para quando o browser iniciar
function showNotes() {

        // for each percorre o array, chamo cada uma de note
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed)

        notesContainer.appendChild(noteElement);
    })
}

function addNote() {
    // array
    const notes = getNotes();

    // objeto
    const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false,
    }

    const noteElement = createNote(noteObject.id, noteObject.content);


    notesContainer.appendChild(noteElement)

    // vamos preencher esse array com as notas para salvar no local storage posteriormente
    notes.push(noteObject)

    // funcao para salvar no local storage 
    saveNotes(notes)

    // limpar campo input
    noteInput. value = ""
};

/* função para gerar id para o noteObject */
function generateId() {
    return Math.floor(Math.random() * 5000)
}

 // função para criar as notas no html
function createNote(id, content, fixed) {

    // criar uma div no html pelo dom
    const element = document.createElement('div')

    // adiciono a classe note a div criada
    element.classList.add('note')

    const textarea = document.createElement('textarea')

    textarea.value = content

    textarea.placeholder = 'Adicione algum texto...'

    // adiciono a minha textarea dentro da div note 
    element.appendChild(textarea)

    return element;

}
// Local Storage

    // puxa as notas existentes do local storage quando iniciamos o navegador
function getNotes() {

        // JSON.parse para transferir de texto para obj js || "[]" digo que se undefined ele me pega um array vazio
    const notes = JSON.parse(localStorage.getItem('notes') || "[]")
    
    return notes
}

    // função para persistir os dados no local storage 
function saveNotes(notes){
    
    // mandamos em formato json
    localStorage.setItem('notes', JSON.stringify(notes))

}
// Eventos

  // escuta evento de click que vai se função addNote
addNoteBtn.addEventListener("click", () => addNote());


// Inicialização
showNotes()