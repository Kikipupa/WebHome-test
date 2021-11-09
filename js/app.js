const apiUrl = "https://jordan.ashton.fashion/api/goods/30/comments";
async function getCommentsData(page = 1) {
  const dataObj = await fetch(`${apiUrl}?page=${page}`).then((response) =>
    response.json()
  );
  dataObj.data.forEach((comment, index) => {
    renderComment(comment, index);
  });
  dataObj.links.forEach((link, index) => {
    renderLink(link, index);
  });
}
getCommentsData(4);

function renderComment(comment, index) {
  const commentList = document.querySelector(".comment-list");
  const commentWrapper = document.createElement("div");
  commentWrapper.classList.add("comment-wrapper");
  const nameOfComment = document.createElement("p");
  nameOfComment.classList.add("comment-name");
  nameOfComment.textContent = `${comment.name}`;
  commentWrapper.appendChild(nameOfComment);
  const textOfComment = document.createElement("p");
  textOfComment.classList.add("comment-text");
  textOfComment.textContent = `${comment.text}`;
  commentWrapper.appendChild(textOfComment);
  commentList.appendChild(commentWrapper);
  //   console.log(` ${index} ${comment.name} ${comment.text}`);
}

function renderLink(link, index) {
  console.log(`${index} ${link.label} ${link.url}`);
}
