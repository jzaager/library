/* 
  ***!!!LOOK UP HOW TO USE FORM DATA ONCE SUBMITTED!!!

  Create Book constructor to be called whenever creating a new book

  Create a function that will add a book to the library array

  Create a function that loops through the array and displays
  each book on the page

  Add an event listener to each book to display its info on click
  (maybe the info is hidden and the display is toggled on click?)

  Add a button on each book's display to remove it from the library
    - see data-attribute

  Add a button on each book's display to change its read status
    - create a helper function that toggles a book's read status on 
      the Book prototype
 */

const myLibrary = [];

const addBookButton = document.querySelector('[type="submit"]');
const form = document.querySelector('form');

let titleValue = document.querySelector('#book-title');
let authorValue = document.querySelector('#author');
let pageCountValue = document.querySelector('#page-numbers');
let readStatus = document.querySelector('#read-complete');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');

function Book(title, author, pageCount, readStatus) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.haveRead = Boolean(readStatus);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Display a book on the bookshelf for each book in myLibrary
function addBooksToShelf() {
  const bookshelf = document.querySelector('.bookshelf');
  const newDisplayBook = document.createElement('div');

  for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
    if (!titleValue.value) return;

    newDisplayBook.classList.add('book');
    newDisplayBook.style.backgroundColor = randomBgColor();
    newDisplayBook.setAttribute('index', i);
    newDisplayBook.addEventListener('click', () => modal.showModal());

    if (newDisplayBook.getAttribute('index') === i) {
      continue;
    }
    bookshelf.append(newDisplayBook);
  }
}

// Random color for each new book
function randomBgColor() {
  const randomColor1 = Math.floor(Math.random() * 256);
  const randomColor2 = Math.floor(Math.random() * 256);
  const randomColor3 = Math.floor(Math.random() * 256);
  return `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`;
}

function getBookValues() {
  if (!titleValue.value) return;
  const newBook = new Book(titleValue.value, authorValue.value, 
                          pageCountValue.value, readStatus.value);
  addBookToLibrary(newBook);
  addBooksToShelf();
}

// Event Listeners
form.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();
  form.reset();
})

closeButton.addEventListener('click', () => modal.close());
addBookButton.addEventListener('click', getBookValues);

// ADD AN EVENT LISTENER TO EACH DISPLAYED BOOK
  // ON CLICK --> open modal (dialog)
  // DISPLAY THE BOOK'S INFO
  // ADD BUTTON TO REMOVE BOOK
  // ADD BUTTON TO CHANGE READ STATUS