let library = [];

const storedLib = localStorage.getItem("library");
if(storedLib){
    const parseLib = JSON.parse(storedLib);
    library = parseLib.map(book => new Book(book.name, book.author, book.pages, book.genre, book.read))
}

function Book(name,author,pages,genre,read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
    this.info = function(){
        return `Name: ${this.name}<br>Author: ${this.author}<br>Pages: ${this.pages}<br>Genre: ${this.genre}<br>Read: ${this.read}<br>`;
    }
}

function addBookToLib(){
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    for (let i=0; i<library.length; i++){
        bookList.innerHTML += '<div class="book">' + library[i].info() + "</div>";
    }
    localStorage.setItem("library", JSON.stringify(library));
}


const bookButton = document.getElementById("newBook");
bookButton.onclick = function(){
    document.getElementById("quiz").style.display = "block";
};

const doneButton = document.getElementById("done");
doneButton.onclick = function(){
    document.getElementById("quiz").style.display = "none";

    let radioRead = "";

    if(document.getElementById("read").checked){
        radioRead = "Yes";
    } else if (document.getElementById("reading").checked){
        radioRead = "Reading";
    } else{
        radioRead = "No";
    }

    const bookName = document.getElementById("bookName").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookPages = document.getElementById("bookPages").value;
    const bookGenre = document.getElementById("bookGenre").value;

    if(bookName!="" && bookAuthor!="" && bookPages!="" && bookGenre!=""){
        this.book = new book(bookName, bookAuthor, bookPages, bookGenre, radioRead)
        library.push(this.book)
        addBookToLib();
    }
    
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPages").value = "";
    document.getElementById("bookGenre").value = "";
};


/*const book1 = new book("Ready Player One", "Ernest Cline", 200, "Fantasy/Sci-fi", "Yes");
library.push(book1);*/

addBookToLib();