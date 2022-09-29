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

const bookshelf = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('[type="submit"]');
const form = document.querySelector('form');
const inputTitle = document.querySelector('#book-title');
const inputAuthor = document.querySelector('#author');
const inputPageCount = document.querySelector('#page-numbers');
const inputReadStatus = document.querySelector('#read-complete');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const removeButton = document.querySelector('.remove-button');

function Book(title, author, pageCount, readStatus) {
  this.title = title,
  this.author = author,
  this.pageCount = pageCount,
  this.haveRead = readStatus
}

Book.prototype.setIndex = function() {
  return this.index = myLibrary.indexOf(this);
} 

// Create new book and add to myLibrary array
function addBookToLibrary() {
  const newBook = new Book(inputTitle.value, inputAuthor.value,
        inputPageCount.value, inputReadStatus.checked);
  myLibrary.push(newBook);
  console.log(newBook.setIndex());
}

function getBookValues() {

}

// Display a book on the bookshelf for each book in myLibrary
function addBooksToShelf() {

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
  form.reset();
})

closeButton.addEventListener('click', () => modal.close());
addBookButton.addEventListener('click', addBookToLibrary);

// ADD AN EVENT LISTENER TO EACH DISPLAYED BOOK
  // ON CLICK --> open modal (dialog)
  // DISPLAY THE BOOK'S INFO
  // ADD BUTTON TO REMOVE BOOK
  // ADD BUTTON TO CHANGE READ STATUS