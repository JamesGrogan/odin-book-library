let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
};

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
  let readText = document.createTextNode(book.read);
  readCell.appendChild(readText);

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

  let deleteIconButton = document.getElementsByClassName(`trash-icon ${bookTable.rows.length - 1}`)[0];
  deleteIconButton.addEventListener('click', (e) => {
    removeBookFromLibrary(e);
    removeBookFromTable(e);
  })
};

function removeBookFromLibrary(e) {
  index = e.path[2].dataset.indexNumber; //path[2] is the <tr> element
  delete myLibrary[index]; // is there a better solution than delete...?
};

function removeBookFromTable(e) {
  rowIndex = e.path[2].rowIndex;
  e.path[4].deleteRow(rowIndex); //path[4] is the <table> element
};

let form = document.getElementById('newBookForm');
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // TODO condense this into a loop
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let isRead = document.getElementById('isRead').value;
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