let myLibrary = [];

const bookshelf = document.querySelector('.bookshelf');
const form = document.querySelector('form');
const addBookButton = document.querySelector('.submit-button');

function Book(title, author, pageCount, readStatus) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readStatus = readStatus;
}
Book.prototype.getIndex = function() {
  return myLibrary.indexOf(this);
}
Book.prototype.displayAllBooks = function() {

  const newDisplayBook = document.createElement('div');
  const displayBookTitle = document.createElement('h2');
  const displayBookAuthor= document.createElement('h3');
  const displayBookPageCount = document.createElement('p');
  const readButton = document.createElement('button');
  const removeButton = document.createElement('button');

  for (let i = 0; i < myLibrary.length; i++) {
  
    newDisplayBook.classList.add('book', 'created-book');
    newDisplayBook.setAttribute('index', this.getIndex());
    
    displayBookTitle.textContent = this.title;
    displayBookAuthor.textContent = this.author;
    displayBookPageCount.textContent = this.pageCount;

    readButton.classList.add('read-button');
    removeButton.classList.add('remove-button');
    readButton.textContent = (this.readStatus === true) ? 'Read' : 'Not read';
    removeButton.textContent = 'Remove';

    newDisplayBook.append(displayBookTitle, displayBookAuthor,
      displayBookPageCount, readButton, removeButton);
  }
  bookshelf.append(newDisplayBook);
}

function addBookToLibrary() {
  const inputTitle = document.querySelector('#book-title').value;
  const inputAuthor = document.querySelector('#author').value;
  const inputPageCount = document.querySelector('#page-numbers').value;
  const inputReadStatus = document.querySelector('#read-complete').checked;
  const newBook = new Book(inputTitle, inputAuthor, `${inputPageCount} pages`, inputReadStatus);
 
  if (inputTitle) {
    myLibrary.push(newBook);
    newBook.displayAllBooks();
  }
}

// Event Listeners
form.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();
  form.reset();
});

addBookButton.addEventListener('click', addBookToLibrary);

