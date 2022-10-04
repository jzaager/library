let myLibrary = [];

const form = document.querySelector('form');
const addBookButton = document.querySelector('.submit-button');

function Book(title, author, pageCount, readStatus) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  const inputTitle = document.querySelector('#book-title').value;
  const inputAuthor = document.querySelector('#author').value;
  const inputPageCount = document.querySelector('#page-numbers').value;
  const inputReadStatus = document.querySelector('#read-complete').checked;

  const newBook = new Book(inputTitle, inputAuthor, inputPageCount, inputReadStatus);
  return myLibrary.push(newBook);
}

// Event Listeners
form.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();
  form.reset();
});

addBookButton.addEventListener('click', addBookToLibrary);
