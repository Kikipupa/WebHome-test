const apiUrl = "https://jordan.ashton.fashion/api/goods/30/comments?page=";
const paginationList = document.querySelector(".pagination");
const commentList = document.querySelector(".comment-list");

async function getCommentsData(page = 1) {
  const dataObj = await fetch(`${apiUrl}${page}`).then((response) =>
    response.json()
  );
  commentList.innerHTML = "";
  dataObj.data.forEach((comment, index) => {
    renderComment(comment, index);
  });
  paginationList.innerHTML = "";
  dataObj.links.forEach((link, index) => {
    renderLink(link, index);
  });
}
getCommentsData(1);

function renderComment(comment, index) {
  const commentWrapper = document.createElement("div");
  commentWrapper.classList.add("comment-wrapper");
  const nameOfComment = document.createElement("p");
  nameOfComment.classList.add("comment-name");
  nameOfComment.textContent = comment.name;
  commentWrapper.appendChild(nameOfComment);
  const textOfComment = document.createElement("span");
  textOfComment.classList.add("comment-text");
  textOfComment.textContent = comment.text;
  commentWrapper.appendChild(textOfComment);
  commentList.appendChild(commentWrapper);
  //   console.log(` ${index} ${comment.name} ${comment.text}`);
}

function renderLink(link, index) {
  const pageButton = document.createElement("button");
  pageButton.classList.add("btn-pages");
  pageButton.innerHTML = link.label;
  paginationList.appendChild(pageButton);

  pageButton.addEventListener("click", () => {
    let [, pageNumber] = link.url.split("?page=");
    getCommentsData(pageNumber);
  });
  console.log(`${index} ${link.label} ${link.url}`);
}
