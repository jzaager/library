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

function Book() {
  this.title;
  this.author;
  this.pageCount;
  this.readStatus;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const harryPotter = new Book();