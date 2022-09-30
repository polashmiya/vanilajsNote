const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const headerTitle = document.querySelector("header p");
const addBtn = document.querySelector(".add-btn");
let titleValue = document.querySelector("input");
let descriptionValue = document.querySelector("textarea");
const monthInWord = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updatedId;
addBox.addEventListener("click", () => {
  titleValue.focus();
  titleValue.value = "";
  descriptionValue.value = "";
  popupBox.classList.add("show");

  headerTitle.textContent = !isUpdate ? "Add a new note" : "Update a note";
  addBtn.innerHTML = !isUpdate ? "Add" : "Update";
});
closeIcon.addEventListener("click", () => {
  isUpdate = false;
  updatedId = null;
  popupBox.classList.remove("show");
});
const showNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  document.querySelectorAll(".note").forEach((note) => note?.remove());
  notes?.forEach((note, i) => {
    let singleNote = `
    <li class="note">
    <div class="details">
      <p>${note?.title}</p>
      <span
        >${note?.description}</span
      >
    </div>
    <div class="bottom-content">
      <span>${note?.time}</span>
      <div class="settings">
        <i onclick="showMenu(this)" class="fa fa-ellipsis-h" aria-hidden="true"></i>
        <ul class="menu">
        <li onclick="updateNote(${i},'${note.title}','${note.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
        <li onclick="deleteNote(${i})"><i class="fa-solid fa-trash"></i>Delete</li>
      </ul>
      </div>
    </div>
  </li>
  `;
    addBox.insertAdjacentHTML("afterend", singleNote);
  });
};
showNotes();
const showMenu = (elem) => {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target?.tagName !== "I" || e.target !== elem) {
      elem.parentElement.classList.remove("show");
    }
  });
};
const deleteNote = (index) => {
  const updatedNotes = notes?.filter((item, i) => i !== index);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  showNotes();
  window.reload();
};

const updateNote = (id, title, desc) => {
  isUpdate = true;
  updatedId = id;
  addBox.click();
  titleValue.value = title;
  descriptionValue.value = desc;
};
addBtn.addEventListener("click", (e) => {
  e?.preventDefault();
  // if (!titleValue?.value || !descriptionValue?.value) {
  //   return alert("Please Add Title And Description");
  // }
  let date = new Date();
  let month = monthInWord[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();
  const note = {
    title: titleValue?.value,
    description: descriptionValue?.value,
    time: `${month} ${day} , ${year}`,
  };
  if (!isUpdate) {
    notes.push(note);
  } else {
    notes[updatedId] = note;
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  closeIcon.click();
  showNotes();
});
