const myLibrary = [];

const bookshelf = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('[type="submit"]');
const form = document.querySelector('form');

const inputTitle = document.querySelector('#book-title');
const inputAuthor = document.querySelector('#author');
const inputPageCount = document.querySelector('#page-numbers');
const inputReadStatus = document.querySelector('#read-complete');

// Always 1 more than myLibrary.length to prevent extra book creation
let numberOfBooks = 1;

function Book(title, author, pageCount, readStatus) {
  this.title = title,
  this.author = author,
  this.pageCount = pageCount,
  this.haveRead = readStatus
}
Book.prototype.getIndex = function() {
  return myLibrary.indexOf(this);
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
  const bookOnShelf = document.createElement('div');
  const readButton = document.createElement('button');
  const removeButton = document.createElement('button');

  const removeBook = function(e) {
    const displayBookIndex = e.target.parentElement.getAttribute('index');
    myLibrary.splice(displayBookIndex, 1);
    e.target.parentElement.remove();
    
    myLibrary.map( book => book.setIndex());
    const books = document.querySelectorAll('.created-book');
    for (let i = 0; i < myLibrary.length; i++) {
      books[i].setAttribute('index', i);
    }
  }

  // const boundRemoveBook = removeBook.bind(bookOnShelf);
  
  for (let i = 0; i < myLibrary.length; i++) {
    // Creates the books on the shelf
    bookOnShelf.classList.add('book', 'created-book');
    bookOnShelf.style.backgroundColor = randomBgColor();
    bookOnShelf.setAttribute('index', `${myLibrary[i].index}`);
    bookOnShelf.textContent = myLibrary[i].title + ', ' +
        myLibrary[i].author + ', ' +
        myLibrary[i].pageCount;

    const setRemoveButtonText = () => {
      removeButton.classList.add('remove-button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', removeBook);
    }
  
    const setReadButtonText = () => {
      readButton.classList.add('read-button');
      readButton.setAttribute('index', myLibrary[i].index);
      readButton.addEventListener('click', toggleReadStatus);
  
      if (myLibrary[i].haveRead == true) {
        readButton.textContent = 'Read';
        readButton.style.backgroundColor = 'lime';
      } 
      else {
        readButton.textContent = 'Not yet read';
        readButton.style.backgroundColor = 'salmon';
      }
    }
    setReadButtonText();
    setRemoveButtonText();
    bookOnShelf.append(removeButton, readButton);
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
    event.target.style.backgroundColor = 'salmon';
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
