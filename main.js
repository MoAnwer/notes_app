
// Select All Elements

const popup = document.querySelector(".popup-box"),
	addNoteBtn = document.querySelector(".add-note-btn"),
	PopupInputTitle = document.querySelector("#title"),
	PopupInputCont = document.querySelector("#note-content"),
	PopupAddBtn = document.querySelector(".popup .add"),
	notes = document.querySelector(".notes"),
  colors = document.querySelectorAll(".colors ul li"),
  closePopup = document.querySelector(".popup-box .popup i");

  // Array Of Notes
  let notesArr = [];

  // Check if The Local Storage Contains The Notes Object 
  if (localStorage.getItem("notes")) {
    notesArr = JSON.parse(localStorage.getItem("notes"));
    getData(notesArr);
  }

  // Popup Box Styling
  addNoteBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    popup.style.opacity= 1;
  });

  closePopup.addEventListener("click" , function () {
    popup.style.display = "none";
  })

  // Add Popup Box Values To Page
  PopupAddBtn.addEventListener("click" , function () {
    addNote(notesArr);
    popup.style.display = "none";
    closePopup.click();
  });

// Add Notes Main Function
function addNote(arr) {
  if (PopupInputTitle.value == "" || PopupInputCont.value == "") {
    return false;
  } else {
    const note = {
      id: Date.now(),
      title: PopupInputTitle.value,
      content: PopupInputCont.value,
      date: new Date().toDateString().substring(4)
    };
    PopupInputTitle.value = "";
    PopupInputCont.value = "";

    // Add Note To Array Of Notes
    arr.push(note);

    // Add Note To Page
    addNoteToPage(note);
    let notesJson = JSON.stringify(arr);

    // Add Note To Notes Object In Local Storage
    addToStorage(notesJson);
  }
}

  // Add Note Page 
function addNoteToPage(noteContent) {
  let theNote;
  notesArr.forEach((note) => {
    theNote = `
    <div class="note" id=${noteContent.id}>
        <header>
        <h3>${noteContent.title}</h3>
        <p class="date">${noteContent.date}</p>
        </header>
        <div class="note-body">${noteContent.content}</div>
    </div>
    `;
  });
  notes.insertAdjacentHTML("beforeend", theNote);
}

// Add Note To Local Storage Main Function
function addToStorage(notes) {
  localStorage.setItem("notes", notes);
}

// Get Note To Local Storage Main Function
function getData(data) {
  let noteData = JSON.parse(localStorage.getItem("notes"));
  let date = noteData.forEach((i) => {
    // Add Notes To Page From Local Storage
    addNoteToPage(i);
  });
}

let deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", (e) => {
  deleteNote(e.target.parentElement.parentElement.id);
})


// Delete Notes Function

// function deleteNote(id) {
//   notesArr = notesArr.filter((filters) => {
//     return filters.id == id;
//   })
//   addToStorage(notesArr)
// }

// localStorage.removeItem("notes")