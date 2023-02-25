const comment = document.querySelector("#comment");
const displayComments = document.querySelector("#displayComments");

let comments = JSON.parse(localStorage.getItem("comments")) || [];

const addComment = () => {
  let data = {
    title: comment.value,
    subComments: [],
    id: comments.length + 1,
  };
  if (data.title) {
    comments.push(data);
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  console.log("Comments", comments);
  comment.value = "";
  display();
};

const addSubComment = (id) => {
  comments = JSON.parse(localStorage.getItem("comments")) || [];
  let data = document.getElementById("subComment" + id).value;
  if (data != "") {
    comments[id].subComments.push(data);
    localStorage.setItem("comments", JSON.stringify(comments));
    display();
    console.log("Comments: ", comments);
  }
};

const cancelBtn = () => {
  display();
};

const editComment = (id) => {
  const commentData = document.getElementById("comment" + id);
  const commentText = document.getElementById("commText" + id).innerText;

  commentData.innerHTML = `
  <div class='edit-box'>
    <p id='editComment${id}' contenteditable="true"> ${commentText} </p>
    <button class='save-btn' onclick='updateComment(${id})'>Save Changes</button>
    <button class='cancel-btn' onclick='cancelBtn()'>Cancel</button>
  </div>
  `;
};

const editSubComment = (id, j) => {
  const commentData = document.getElementById("comment" + id + "_" + j);
  const commentText = document.getElementById(
    "commText" + id + "_" + j
  ).innerText;

  commentData.innerHTML = `
  <div class='edit-box'>
    <p id='editComment${id}_${j}' contenteditable="true"> ${commentText} </p>
    <button class='save-btn' onclick='updateSubComment(${id},${j})'>Save Changes</button>
    <button class='cancel-btn' onclick='cancelBtn()'>Cancel</button>
  </div>
  `;
};
const updateComment = (id) => {
  comments = JSON.parse(localStorage.getItem("comments")) || [];
  let data = document.getElementById("editComment" + id).innerText;
  console.log(data);
  if (data != "") {
    comments[id].title = data;
    localStorage.setItem("comments", JSON.stringify(comments));
  }
  display();
};

const updateSubComment = (id, j) => {
  comments = JSON.parse(localStorage.getItem("comments")) || [];
  let data = document.getElementById("editComment" + id + "_" + j).innerText;
  console.log(data);
  if (data != "") {
    comments[id].subComments[j] = data;
    localStorage.setItem("comments", JSON.stringify(comments));
  }
  display();
};

const replyComment = (id) => {
  display();
  let commentData = document.getElementById("fullComment" + id);
  commentData.innerHTML += `
  <div class='sub-box'>
    <input type='text' id='subComment${id}' placeholder='Add a reply...'/>
    <button class='save-btn' onclick='addSubComment(${id})'>Post</button>
  </div>
  `;
};

const removeComment = (id) => {
  comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(id, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  console.log(comments);
  display();
};

const removeSubComment = (id, j) => {
  comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments[id].subComments.splice(j, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  console.log(comments);
  display();
};

const display = () => {
  comments = JSON.parse(localStorage.getItem("comments")) || [];
  displayComments.innerHTML = "";
  for (let i = comments.length - 1; i > -1; i--) {
    let subCommentData = "";
    for (let j = 0; j < comments[i].subComments.length; j++) {
      subCommentData += `
        <div class='comment-data-1' id='comment${i}_${j}'>
          <p id='commText${i}_${j}' class='commentText'>${comments[i].subComments[j]}</p>
          <div class='comment-footer'><button class='special-btn' onclick='replyComment(${i})'>Reply</button>
          <div class='v-line'></div>
            <button class='special-btn' onclick='editSubComment(${i},${j})'>Edit</button>
            <div class='v-line'></div>
            <button class='special-btn' onclick='removeSubComment(${i},${j})'>Delete</button>
          </div>
        </div>
        `;
    }

    displayComments.innerHTML += `
    <div class='comment-data' id='fullComment${i}'>
      <div id='comment${i}'>
        <p id='commText${i}' class='commentText'>${comments[i].title}</p>
        <div class='comment-footer'>
          <button class='special-btn' onclick='replyComment(${i})'>Reply</button>
          <div class='v-line'></div>
          <button class='special-btn' onclick='editComment(${i})'>Edit</button>
          <div class='v-line'></div>
          <button class='special-btn' onclick='removeComment(${i})'>Delete</button>
        </div>
      </div>
      ${subCommentData}
    </div>`;
  }
};

display();
