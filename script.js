let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

hobbit = new Book("The Hobbit", "Tolkein", 305, true);
harryPotter = new Book(
  "Harry Potter and the Order of the Phoenix",
  "Rowling",
  766,
  true);
godfather = new Book("The Godfather", "Mario Puzo", 608, false);

addBookToLibrary(hobbit);
addBookToTable(hobbit);
addBookToLibrary(harryPotter);
addBookToTable(harryPotter);
addBookToLibrary(godfather);
addBookToTable(godfather);

function addBookToLibrary(book) {
  myLibrary.push(book);
};

function addBookToTable(book) {
  let bookTable = document.querySelector('#main-book-table');
  // TODO condense this into a loop
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
  let readButton = document.createElement('button');
  book.read ? readButton.innerHTML = 'Read' : readButton.innerHTML = 'Not read';
  readCell.appendChild(readButton);
  readButton.addEventListener('click', (e) => {
    toggleReadStatus(e);
  })

  let deleteCell = newRow.insertCell(4);
  let deleteIcon = document.createElement('img');
  deleteIcon.src = './imgs/delete.png'
  deleteIcon.className = `trash-icon ${bookTable.rows.length - 1}`;
  deleteCell.appendChild(deleteIcon);

  // Find the index number of the book in the library
  let bookIndexNumber = myLibrary.findIndex(object => {
    return object === book;
  })
  newRow.dataset.indexNumber = bookIndexNumber; //dataset is a HTML attribute on <tr>

  deleteIcon.addEventListener('click', (e) => {
    removeBookFromLibrary(e);
    removeBookFromTable(e);
  })
};

function removeBookFromLibrary(e) {
  console.log(e);
  index = e.target.parentElement.parentElement.dataset.indexNumber; //gets the <tr> element
  delete myLibrary[index]; // is there a better solution than delete...?
};

function removeBookFromTable(e) {
  let rowIndex = e.target.parentElement.parentElement.rowIndex;
  let bookTable = e.target.parentElement.parentElement.parentElement.parentElement;
  bookTable.deleteRow(rowIndex); 
};

function toggleReadStatus(e) {
  index = e.target.parentElement.parentElement.dataset.indexNumber;
  myLibrary[index].read = !myLibrary[index].read
  myLibrary[index].read ? e.srcElement.innerHTML = 'Read' : e.srcElement.innerHTML = 'Not Read';
}

let form = document.getElementById('newBookForm');
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // TODO condense this into a loop
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let isRead;
  document.getElementById('isRead').value ==='true' ? isRead = true : isRead = false;
  let newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);
  addBookToTable(newBook);
  form.reset();
});

function openForm() {
  document.getElementById('div-newBookForm').style.display= 'block';
};

function closeForm() {
  document.getElementById('div-newBookForm').style.display = 'none';
};