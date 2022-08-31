let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

hobbit = new Book("The Hobbit", "Tolkein", 305, true);
harryPotter = new Book(
  "Harry Potter and the Order of the Phoenix",
  "Rowling",
  766,
  true);
godfather = new Book("The Godfather", "Mario Puzo", 608, false);

addBookToLibrary(hobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(godfather);

function displayBooks() {
  let bookTable = document.querySelector('#main-book-table');
  myLibrary.forEach((book) => {
    // TODO condense this into another loop
    let newRow = bookTable.insertRow(-1);
    let titleCell = newRow.insertCell(0);
    let titleText = document.createTextNode(book.title);
    titleCell.appendChild(titleText);

    let authorCell = newRow.insertCell(1);
    let authorText = document.createTextNode(book.author);
    authorCell.appendChild(authorText);

    let pagesCell = newRow.insertCell(2);
    let pagesText = document.createTextNode(book.pages);
    pagesCell.appendChild(pagesText);

    let readCell = newRow.insertCell(3);
    let readText = document.createTextNode(book.read);
    readCell.appendChild(readText);
  });
};

let predefinedButton = document.querySelector('#add-predefined-books');
predefinedButton.addEventListener("click", displayBooks);