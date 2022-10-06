let username;
let socket = io();

do {
  username = prompt("Enter User name");
} while (!username);

const textarea = document.querySelector("#textarea");
const submitBtn = document.querySelector("#submitBtn");
const commentBox = document.querySelector("#commentBox");
const typingDiv = document.querySelector(".typing");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let comment = textarea.value;

  if (!comment) {
    return;
  }

  postComment(comment);
});

function postComment(comment) {
  // Append comment
  let data = {
    username,
    comment,
  };

  appendToDown(data);
  // Broadcast
  broadcastComment(data);

  // Sync mongo
  syncWithDb(data);
}

function appendToDown(data) {
  // commentBox.
  let lTag = document.createElement("li");
  lTag.classList.add("comment", "mb-3");

  let markup = `
            <div class="card border-light mb-3">
                <div class="card-body">
                    <h6>${data.username}</h6>
                    <p>${data.comment}</p>
                    <div>
                        <img src="./img/clock.png" alt="">
                        <span>${moment(data?.time).format("LT")}</span>
                    </div>
                </div>
            </div>
        `;

  textarea.value = "";

  lTag.innerHTML = markup;
  commentBox.prepend(lTag);
}

function broadcastComment(data) {
  socket.emit("comment", data);
}

socket.on("serverComment", (data) => {
  appendToDown(data);
});

let timerId = null;

function debounce(func, timer) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    func();
  }, timer);
}

socket.on("serverTyping", (data) => {
  typingDiv.innerText = data.username + " is typing...";

  debounce(function () {
    typingDiv.innerText = "";
  }, 1000);
});

// Event on textarea

textarea.addEventListener("keyup", (e) => {
  // console.log('sasa');
  socket.emit("typing", { username });
});

// API Calls

function syncWithDb(data) {
    const headers = {
        'Content-Type':'application/json'
    }
  fetch("./api/comments", { method: "Post", body: JSON.stringify(data), headers }).then(
    response => response.json()
  ).then(result=>{
    console.log(result);
  });
}
