//list of books
let library = [];

//taking books from local storage on page reload
const storedLib = localStorage.getItem("library");
if(storedLib){
    const parseLib = JSON.parse(storedLib);
    library = parseLib.map(book => new Book(book.name, book.author, book.pages, book.genre, book.read, book.stars))
}

//making of book
function Book(name,author,pages,genre,read,stars){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
    this.stars = stars;
    this.info = function(){
        return `Name: ${this.name}<br>Author: ${this.author}<br>Pages: ${this.pages}<br>Genre: ${this.genre}<br>Read: ${this.read}<br>Stars: ${this.stars}`;
    }
}

//checking the order changes and calling addBookToLib
document.getElementById("orderDropdown").addEventListener("change", function(){addBookToLib(this.value)});

//add book to library (called when new book made by user)
function addBookToLib(order){
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    let usedLibrary = [...library]

    //order of library depending on dropdown
    switch(order){
        case 'bookAlphabetical': 
            usedLibrary.sort((a,b) => a.name.localeCompare(b.name));
            break;
        case 'authorAlphabetical':
            usedLibrary.sort((a,b) => a.author.localeCompare(b.author));
            break;
        case 'starHighest':
            usedLibrary = usedLibrary.filter(book => book.stars && book.stars!=="unrated");
            usedLibrary.sort((a,b) => a.stars.length - b.stars.length);
            break;
        case 'starLowest':
            usedLibrary = usedLibrary.filter(book => book.stars && book.stars!=="unrated");
            usedLibrary.sort((a,b) => b.stars.length - a.stars.length);
            break;
        default:
            usedLibrary.sort((a,b) => a.name.localeCompare(b.name));
    }
    
    for (let i=0; i<usedLibrary.length; i++){
        bookList.innerHTML += `<div class="book"> <button class="delete" data-index="${i}">` + '<img src="cross.png" alt="cross" class="cross"> </button><div class="bookText">' + usedLibrary[i].info() + "</div></div>";
    }
    localStorage.setItem("library", JSON.stringify(library));

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {button.onclick = function(){const index = this.getAttribute("data-index"); deleteBook(index);}});
}

//user deletes book on cross press by using its assigned data-index
function deleteBook(index){
    document.getElementById("popup").style.display = "block";
    const finalButton = document.getElementById("finalButton");
    finalButton.setAttribute("data-index",index)
}

finalButton.onclick = function(){
    const index = this.getAttribute("data-index");
    if(document.getElementById("deleteYes").checked){
        const index = this.getAttribute("data-index");
        library.splice(index, 1);
        addBookToLib(document.getElementById("orderDropdown").value);
        document.getElementById("popup").style.display = "none";
    } else{
        document.getElementById("popup").style.display = "none";
    }
}

//user presses new book button and quiz appears
const bookButton = document.getElementById("newBook");
bookButton.onclick = function(){
    document.getElementById("quiz").style.display = "block";
};

//check if stars section needed
function starsNeeded(){
    const readYes = document.getElementById("read").checked;
    document.getElementById("starStuff").style.display = readYes ? "block":"none";
}

//event listener always checks a change in the radio button selected and calls starsNeeded
document.querySelectorAll('input[name="quiz"]').forEach(radio => {radio.addEventListener("change", starsNeeded)});

//user done with quiz and all data is made into new book
const doneButton = document.getElementById("done");
doneButton.onclick = function(){
    document.getElementById("quiz").style.display = "none";

    let radioRead = "";
    let stars = "unrated";

    if(document.getElementById("read").checked){
        radioRead = "Yes";
        
        let starList = document.getElementsByName("rating");
        for(let i=0; i<starList.length; i++){
            if(starList[i].checked){
                //stars = starList[i].value;
                stars = `<div class="boxStars"><div class="stars">`
                for(let j=0; j<starList[i].value; j++){
                    stars += `<div class="fa fa-star"></div>`
                }
                if(starList[i].value!=5){
                    for(let x=0; x<(5-starList[i].value); x++){
                        stars += `<div class="fa fa-star" style="color: #838383"></div>`
                    }
                }
                stars += "</div></div>"
                break;
            }
        }
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
        this.book = new Book(bookName, bookAuthor, bookPages, bookGenre, radioRead, stars)
        library.push(this.book)
        addBookToLib(document.getElementById("orderDropdown").value);
    }
    
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPages").value = "";
    document.getElementById("bookGenre").value = "";
};

//alphabetical order default
library.sort((a,b) => a.name.localeCompare(b.name));

starsNeeded();
addBookToLib(document.getElementById("orderDropdown").value);