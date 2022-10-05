let myLibrary = [];

const bookshelf = document.querySelector('.bookshelf');
const form = document.querySelector('form');
const addBookButton = document.querySelector('.submit-button');
const buttonReadCompleteColor = 'rgba(132, 251, 194, 1)';
const buttonReadIncompleteColor = 'rgba(227, 227, 227, 1)';

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
    newDisplayBook.setAttribute('book-index', this.getIndex());
    removeButton.setAttribute('index', this.getIndex());
    readButton.setAttribute('index', this.getIndex());
    
    displayBookTitle.textContent = this.title;
    displayBookAuthor.textContent = this.author;
    displayBookPageCount.textContent = this.pageCount;

    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', deleteBook);

    readButton.classList.add('read-button');
    readButton.textContent = (this.readStatus === true) ? 'Read' : 'Not read';
    readButton.style.backgroundColor = (this.readStatus === true) ? buttonReadCompleteColor : buttonReadIncompleteColor;

    newDisplayBook.append(displayBookTitle, displayBookAuthor,
      displayBookPageCount, readButton, removeButton);
  }
  
  function deleteBook() {
    console.log('test', this)
    const index = this.getAttribute('index')
    bookshelf.querySelector(`[book-index="${index}"`).remove();
    myLibrary.splice([index], 1);

    const domBooks = document.querySelectorAll('.created-book');
    const domRemoveButtons = document.querySelectorAll('.remove-button');
    const domReadButtons = document.querySelectorAll('.read-button');

    for (let i = 0; i < myLibrary.length; i++) {
      domBooks[i].setAttribute('book-index', i);
      domRemoveButtons[i].setAttribute('index', i);
      domReadButtons[i].setAttribute('index', i);
    }
  }
  function toggleReadStatus(e) {
    const bookTarget = e.target.getAttribute('index');
    if (!(myLibrary[bookTarget].readStatus === true)) {
      myLibrary[bookTarget].readStatus = true;
      readButton.textContent = 'Read';
      readButton.style.backgroundColor = buttonReadCompleteColor;
    } else {
      myLibrary[bookTarget].readStatus = false;
      readButton.textContent = 'Not read';
      readButton.style.backgroundColor = buttonReadIncompleteColor;
    }
  }
  readButton.addEventListener('click', toggleReadStatus);
  bookshelf.append(newDisplayBook);
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

