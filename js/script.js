let library = []
const bookContainer = document.querySelector(".book-container")
const formContainer = document.querySelector(".form-container")
const addBookButton = document.querySelector(".add")
const form = document.querySelector(".form")
let formCheck = document.getElementById("read")

addBookButton.addEventListener("mouseup", displayBookForm)



function Book(title, author, pages, index, read){
    title = this.title
    author = this.author
    pages = this.pages
    index = this.index
    read = false
    
}

function clickOff(e){
    let isClickInsideElement = form.contains(e.target);
    if (!isClickInsideElement) {
        displayMain()  
    }
}

function displayBookForm(){
    bookContainer.style = "display: none;"
    formContainer.style = "display: flex"
    addBookButton.style = "display: none"
    formCheck.checked = false
    document.addEventListener('mousedown', clickOff);
}

function removeBook(){
    console.log(this.parentNode.id + " is the id")
    library = library.filter(book => book.title !== this.parentNode.id)
    this.parentNode.remove();
}

function displayMain(){
    formContainer.style = "display: none"
    bookContainer.style = "display: flex"
    addBookButton.style = "display: inline-block"
    document.removeEventListener('mousedown', clickOff);
}

function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
        return false;
        }
    }
    return true;
}

function createBookCard(book){
    let bookCard = document.createElement("div")
    bookCard.classList.add("book-card")
    let bookInfo = Object.keys(book)
    createCardElements(book, bookInfo, bookCard)
    bookCard.id = book.title
    bookContainer.appendChild(bookCard)
    displayMain()
}

function createCardElements(book, bookInfo, bookCard) {
    for (let i = 0; i < 3; i++) {
        let para = document.createElement("p")
        let paraText = document.createTextNode(book[bookInfo[i]])
        para.appendChild(paraText)
        bookCard.appendChild(para)
    }
    bookCard.appendChild(createReadCheckbox(book.read))
    let removeButton = document.createElement("div")
    removeButton.classList.add("button3")
    removeButton.classList.add("remove")
    removeButton.addEventListener("click", removeBook)
    removeText = document.createTextNode("Remove Book")
    removeButton.appendChild(removeText)
    bookCard.appendChild(removeButton)
}

function createReadCheckbox(read) {
    let readBox = document.createElement("label")
    readBox.classList.add("switch")
    let switchInput = document.createElement("input")
    switchInput.classList.add("switch-input")
    switchInput.setAttribute("type", "checkbox")
    if(read){
        switchInput.checked = true
    }
    let switchLabel = document.createElement("span")
    switchLabel.classList.add("switch-label")
    switchLabel.setAttribute("data-on", "Read")
    switchLabel.setAttribute("data-off", "Unread")
    let switchHandle = document.createElement("span")
    switchHandle.classList.add("switch-handle")
    readBox.appendChild(switchInput)
    readBox.appendChild(switchLabel)
    readBox.appendChild(switchHandle)
    return readBox
}

function addBookToLibrary(){
    let title = document.getElementById("title")
    let author = document.getElementById("author")
    let pages = document.getElementById("pages")
    let read = document.getElementById("read")
    let newBook = new Book();
    
    if(read.checked){
        newBook.title = title.value
        newBook.author = author.value
        newBook.pages = pages.value
        newBook.read = true
    }else{
        newBook.title = title.value
        newBook.author = author.value
        newBook.pages = pages.value
        newBook.read = false
    }

    let bookExists = checkBookExists(newBook);

    console.log(bookExists)

    if(!bookExists){
        library.push(newBook)
        createBookCard(newBook)

    }
    title.value = ""
    author.value = ""
    pages.value = ""
    newBook.read = false
    library.forEach(e => console.log(e))
    
    
}

function checkBookExists(newBook) {
    return library.some(function (e) {
        const keys1 = Object.keys(newBook)
        const keys2 = Object.keys(e)
        for (let i = 0; i < 2; i++) {
            if (newBook[keys1[i]] !== e[keys2[i]]) {
                return false
            }
        }
        return true
    })
}


