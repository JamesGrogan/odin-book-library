class Library {
  constructor() {
    this.library = []
  }

  addBookToLibrary(book) {
    this.library.push(book);
  }

  removeBookFromLibrary(e) {
    let index = e.target.parentElement.parentElement.dataset.indexNumber; //gets the <tr> element
    delete this.library[index]; // is there a better solution than delete...?
  };

  toggleReadStatus(e) {
    let index = e.target.parentElement.parentElement.dataset.indexNumber;
    this.library[index].read = !this.library[index].read
    this.library[index].read ? e.srcElement.innerHTML = 'Read' : e.srcElement.innerHTML = 'Not Read';
  }
};

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
};

class TableController {
  bookTable = document.querySelector('#main-book-table');
  
  constructor() {}

  addBookToTable(book) {
    let newRow = this.bookTable.insertRow(-1);
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
      myLibrary.toggleReadStatus(e);
    })

    let deleteCell = newRow.insertCell(4);
    let deleteIcon = document.createElement('img');
    deleteIcon.src = './imgs/delete.png'
    deleteIcon.className = `trash-icon ${this.bookTable.rows.length - 1}`;
    deleteCell.appendChild(deleteIcon);

    // Find the index number of the book in the library
    let bookIndexNumber = myLibrary.library.findIndex(object => {
      return object === book;
    })
    newRow.dataset.indexNumber = bookIndexNumber; //dataset is a HTML attribute on <tr>

    deleteIcon.addEventListener('click', (e) => {
      myLibrary.removeBookFromLibrary(e);
      this.removeBookFromTable(e);
    })
  }

  removeBookFromTable(e) {
    let rowIndex = e.target.parentElement.parentElement.rowIndex;
    //let bookTable = e.target.parentElement.parentElement.parentElement.parentElement;
    this.bookTable.deleteRow(rowIndex); 
  };
}

class BookFormController {
  formContainer = document.getElementById('div-newBookForm');
  form = document.getElementById('newBookForm');
  openFormButton = document.getElementById('add-new-book')
  closeFormButton = document.getElementById('close-form-button')
  
  constructor() {
    this.openFormButton.addEventListener("click", (e) => {
      this.openForm()
    })

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      // TODO condense this into a loop
      let title = document.getElementById('title').value;
      let author = document.getElementById('author').value;
      let pages = document.getElementById('pages').value;
      let isRead;
      document.getElementById('isRead').value ==='true' ? isRead = true : isRead = false;
      let newBook = new Book(title, author, pages, isRead);
      myLibrary.addBookToLibrary(newBook);
      tableController.addBookToTable(newBook);
      this.form.reset();
    });

    this.closeFormButton.addEventListener("click", (e) => {
      this.form.reset()
      this.closeForm();
    })
  }
  
  openForm() {
    this.formContainer.style.display= 'block';
  };
  
  closeForm() {
    this.formContainer.style.display = 'none';
  };
}

// initial table set up
const hobbit = new Book("The Hobbit", "Tolkein", 305, true);
const harryPotter = new Book(
  "Harry Potter and the Order of the Phoenix",
  "Rowling",
  766,
  true);
const godfather = new Book("The Godfather", "Mario Puzo", 608, false);

const myLibrary = new Library();
myLibrary.addBookToLibrary(hobbit);
myLibrary.addBookToLibrary(harryPotter);
myLibrary.addBookToLibrary(godfather);

const tableController = new TableController();
tableController.addBookToTable(hobbit);
tableController.addBookToTable(harryPotter);
tableController.addBookToTable(godfather);

const bookFormController = new BookFormController()