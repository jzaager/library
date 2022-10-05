let myLibrary = [];

const bookshelf = document.querySelector('.bookshelf');
const form = document.querySelector('form');
const addBookButton = document.querySelector('.submit-button');
const buttonReadCompleteColor = 'rgba(132, 251, 194, 0.7)';
const buttonReadIncompleteColor = 'rgba(227, 227, 227, 0.7)';

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

  for (let i = 0; i < myLibrary.length; i++) {
    
    newDisplayBook.classList.add('book', 'created-book');
    newDisplayBook.setAttribute('book-index', this.getIndex());
    
    displayBookTitle.textContent = this.title;
    displayBookAuthor.textContent = this.author;
    displayBookPageCount.textContent = this.pageCount;

    //            //

    
  }
  const boundCreateRemoveButton = createRemoveButton.bind(newDisplayBook);
  const boundCreateReadButton = createReadButton.bind(newDisplayBook);

  newDisplayBook.append(displayBookTitle, displayBookAuthor,
    displayBookPageCount, boundCreateReadButton(), boundCreateRemoveButton());

  bookshelf.append(newDisplayBook);
}

function createReadButton() {
  const readButton = document.createElement('button');
  const index = this.getAttribute('book-index');

  readButton.classList.add('read-button');
  readButton.textContent = (myLibrary[index].readStatus === true) ? 'Read' : 'Not read';
  readButton.style.backgroundColor = (myLibrary[index].readStatus === true) ? buttonReadCompleteColor : buttonReadIncompleteColor;
  readButton.addEventListener('click', toggleReadStatus);

  return readButton;
}

function createRemoveButton() {
  const removeButton = document.createElement('button');

  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', deleteBook);

  return removeButton;
}

function toggleReadStatus() {
  const bookTarget = this.parentNode.getAttribute('book-index');

  if (!(myLibrary[bookTarget].readStatus === true)) {
    myLibrary[bookTarget].readStatus = true;
    this.textContent = 'Read';
    this.style.backgroundColor = buttonReadCompleteColor;
  } else {
    myLibrary[bookTarget].readStatus = false;
    this.textContent = 'Not read';
    this.style.backgroundColor = buttonReadIncompleteColor;
  }
}

function deleteBook() {
  const index = this.parentNode.getAttribute('book-index')
  bookshelf.querySelector(`[book-index="${index}"`).remove();
  myLibrary.splice([index], 1);

  const domBooks = document.querySelectorAll('.created-book');
  for (let i = 0; i < myLibrary.length; i++) {
    domBooks[i].setAttribute('book-index', i);
  }
}

function addBookToLibrary() {
  const inputTitle = document.querySelector('#book-title').value;
  const inputAuthor = document.querySelector('#author').value;
  const inputPageCount = document.querySelector('#page-numbers').value;
  const inputReadStatus = document.querySelector('#read-complete').checked;
  const newBook = new Book(inputTitle, inputAuthor, inputPageCount, inputReadStatus);
 
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

