const myLibrary = [];

const bookshelf = document.querySelector('.bookshelf');
const addBookButton = document.querySelector('[type="submit"]');
const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const removeButton = document.querySelector('.remove-button');
const readButton = document.querySelector('#modal-read');

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

  myLibrary.push(newBook);
  newBook.setIndex();
  displayAllBooks();
}

// Display books in myLibrary array on the shelf visually
function displayAllBooks() {
  const bookOnShelf = document.createElement('div');
  
  for (let i = 0; i < myLibrary.length; i++) {
    bookOnShelf.classList.add('book', 'created-book');
    bookOnShelf.style.backgroundColor = randomBgColor();
    bookOnShelf.setAttribute('index', `${myLibrary[i].index}`);
    bookOnShelf.textContent = myLibrary[i].title + ', ' +
        myLibrary[i].author + ', ' +
        myLibrary[i].pageCount + ', ' +
        (myLibrary[i].haveRead == true ? 'Read' : 'Not Read')
  }
  bookshelf.append(bookOnShelf);
  // Callback function here to prevent multiple callbacks on each click
  // bookOnShelf.addEventListener('click', showModalInfo);
}

function toggleReadStatus() {
  const readButtonIndex = readButton.getAttribute('index');
  console.log(readButtonIndex)

  if (myLibrary[readButtonIndex].haveRead !== true) {
    myLibrary[readButtonIndex].haveRead = true;
  }
  else {
    myLibrary[readButtonIndex].haveRead = false;
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
  form.reset();
})

closeButton.addEventListener('click', () => modal.close());
addBookButton.addEventListener('click', addBookToLibrary);
readButton.addEventListener('click', toggleReadStatus);