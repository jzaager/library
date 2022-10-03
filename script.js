const myLibrary = [];

const addBookButton = document.querySelector('[type="submit"]');
const form = document.querySelector('form');

const inputTitle = document.querySelector('#book-title');
const inputAuthor = document.querySelector('#author');
const inputPageCount = document.querySelector('#page-numbers');
const inputReadStatus = document.querySelector('#read-complete');

function Book(title, author, pageCount, readStatus) {
  this.title = title,
  this.author = author,
  this.pageCount = pageCount,
  this.haveRead = readStatus
}
Book.prototype.setIndex = function() {
  return this.index = myLibrary.indexOf(this);
} 

// Create new book, add to myLibrary array, set it's index
function addBookToLibrary() {
  const newBook = new Book(inputTitle.value, inputAuthor.value,
      inputPageCount.value, inputReadStatus.checked);

  if (inputTitle.value) {
    myLibrary.push(newBook);
    newBook.setIndex();
  }
  displayAllBooks();
  form.reset();
}

// Display books in myLibrary array on the shelf visually
function displayAllBooks() {
  const bookshelf = document.querySelector('.bookshelf');
  const bookOnShelf = document.createElement('div');
  const readButton = document.createElement('button');
  const removeButton = document.createElement('button');
  const bookTitle = document.createElement('h2');
  const bookAuthor = document.createElement('h3');
  const bookPageCount = document.createElement('p');

  const removeBook = function(e) {
    const displayBookIndex = e.target.parentElement.getAttribute('index');

    myLibrary.splice(displayBookIndex, 1);
    e.target.parentElement.remove();
    
    /* Reset indexes for books in the array and
       on display (and their read buttons) */
    myLibrary.map( book => book.setIndex());
    for (let i = 0; i < myLibrary.length; i++) {
      const books = document.querySelectorAll('.created-book');
      const readButtons = document.querySelectorAll('.read-button');
      books[i].setAttribute('index', i);
      readButtons[i].setAttribute('index', i);
    }
  }
  
  for (let i = 0; i < myLibrary.length; i++) {
    // Creates the books on the shelf
    bookOnShelf.classList.add('book', 'created-book');
    bookOnShelf.style.backgroundColor = randomBgColor();
    bookOnShelf.setAttribute('index', `${myLibrary[i].index}`);

    bookTitle.textContent = myLibrary[i].title;
    bookAuthor.textContent = myLibrary[i].author;
    bookPageCount.textContent = myLibrary[i].pageCount + 'pages';

    const setRemoveButtonText = () => {
      removeButton.classList.add('button', 'remove-button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', removeBook);
    }
  
    const setReadButtonText = () => {
      readButton.classList.add('button', 'read-button');
      readButton.setAttribute('index', myLibrary[i].index);
      readButton.addEventListener('click', toggleReadStatus);
  
      if (myLibrary[i].haveRead == true) {
        readButton.textContent = 'Read';
        readButton.style.backgroundColor = 'lime';
      } 
      else {
        readButton.textContent = 'Not yet read';
        readButton.style.backgroundColor = 'rgb(110, 110, 110)';
      }
    }
    setReadButtonText();
    setRemoveButtonText();
    bookOnShelf.append(bookTitle, bookAuthor, bookPageCount, 
        readButton, removeButton);
  }

  if (inputTitle.value) {
    bookshelf.append(bookOnShelf);
  }
}

function toggleReadStatus(event) {
  const readButtonIndex = event.target.getAttribute('index');

  if (myLibrary[readButtonIndex].haveRead !== true) {
    myLibrary[readButtonIndex].haveRead = true;
    event.target.textContent = 'Read';
    event.target.style.backgroundColor = 'lime';
  }
  else {
    myLibrary[readButtonIndex].haveRead = false;
    event.target.textContent = 'Not yet read';
    event.target.style.backgroundColor = 'rgb(110, 110, 110)';
  }
}

// Random color for each new book
function randomBgColor() {
  const randomColor1 = Math.floor(Math.random() * 256);
  const randomColor2 = Math.floor(Math.random() * 256);
  const randomColor3 = Math.floor(Math.random() * 256);
  return `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`;
}

// Event Listeners
form.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();
})
addBookButton.addEventListener('click', addBookToLibrary);
