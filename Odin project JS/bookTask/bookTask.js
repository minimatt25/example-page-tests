const library = [];

function book(name,author,pages,read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `Name: ${this.name}<br>Author: ${this.author}<br>Pages: ${this.pages}<br>Read: ${this.read}<br><br>`;
    }
}

function addBookToLib(){
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    for (let i=0; i<library.length; i++){
        bookList.innerHTML += library[i].info() + "<br>";
    }
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

    if(bookName!="" && bookAuthor!="" && bookPages!=""){
        this.book = new book(bookName, bookAuthor, bookPages, radioRead)
        library.push(this.book)
        addBookToLib();
    }
    
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPages").value = "";
};


const book1 = new book("Ready Player One", "Ernest Cline", 200, "Yes");
library.push(book1);

addBookToLib();