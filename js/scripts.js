// Elementos

const notesContainer = document.querySelector("#notes-container")

const noteInput = document.querySelector("#note-content")

const addNoteBtn = document.querySelector(".add-note")



// Funcões

    // para quando o browser iniciar
function showNotes() {
    cleanNotes()
        // for each percorre o array, chamo cada uma de note
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed)

        notesContainer.appendChild(noteElement);
    })
}

function cleanNotes() {
    notesContainer.replaceChildren([]) // lista vazia, faz limpar as notes
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

        // Pin Icon
    const pinIcon = document.createElement('i')

    // ... permite adicionar mais de uma classe ao elemento de uma vez
    pinIcon.classList.add(...["bi", "bi-pin"])

    element.appendChild(pinIcon)

        // Delete Icon
    const deleteIcon = document.createElement('i')

    // ... permite adicionar mais de uma classe ao elemento de uma vez
    deleteIcon.classList.add(...["bi", "bi-x-lg"])

    element.appendChild(deleteIcon)

    // Duplicate Icon
    const duplicateIcon = document.createElement('i')

    // ... permite adicionar mais de uma classe ao elemento de uma vez
    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"])

    element.appendChild(duplicateIcon)

    if(fixed) {
        element.classList.add("fixed")
    }

    // Eventos do elemento criados dinamicamente
    element.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id)
    })

    element.querySelector(".bi-x-lg").addEventListener("click", () => {
        deleteNote(id, element)
    })

    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        copyNote(id)
    })

    return element;

}

function toggleFixNote(id) {
    const notes = getNotes()

    // pelo metodo filter é filtrado a lista para achar a nota que queremos
    const targetNote = notes.filter((note) => note.id === id)[0] // condicional note que check sd o id é igual o id passado para a função, é retornato em lista e acessamos o elemento 0

    targetNote.fixed = !targetNote.fixed; // targetNote.fixed = ao contrario de targetNote.fixed, ta fixo, desfixa, não fixo, fixa - o mesmo botão realiza ambas ações

    saveNotes(notes)

    showNotes()
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id) // a notas que vão permanecer são as que tem o id diferente da que eu passei

    saveNotes(notes)

    notesContainer.removeChild(element)
}

function copyNote(id) {

    const notes = getNotes()

    const targetNote = notes.filter((note) => note.id === id)[0]

    // crio um novo objeto
    const noteObject = {
        id: generateId(),
        content: targetNote.content,
        fixed: false,
    }

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed)

    // coloco na dom
    notesContainer.appendChild(noteElement)

    // coloco na local stora
    notes.push(noteObject)

    saveNotes(notes)

}
// Local Storage

    // puxa as notas existentes do local storage quando iniciamos o navegador
function getNotes() {

        // JSON.parse para transferir de texto para obj js || "[]" digo que se undefined ele me pega um array vazio
    const notes = JSON.parse(localStorage.getItem('notes') || "[]")
    
        // ordenação das notas
    const OrderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1)) // compara os booleanos como se fossem 0 e 1
    
    return OrderedNotes
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