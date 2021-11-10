const apiUrl = "https://jordan.ashton.fashion/api/goods/30/comments";
const paginationList = document.querySelector(".pagination");
const commentList = document.querySelector(".comment-list");
const btnLoadMore = document.querySelector(".btn-load-more");
const commentForm = document.querySelector(".comment-form");
let currentPageNumber = null;
let nextPageNumber = null;

function removeComments() {
  commentList.innerHTML = "";
}

btnLoadMore.addEventListener("click", () => getCommentsData(nextPageNumber));

async function getCommentsData(page = 1) {
  const dataObj = await fetch(`${apiUrl}?page=${page}`).then((response) =>
    response.json()
  );
  dataObj.data.forEach((comment, index) => {
    renderComment(comment, index);
  });
  paginationList.innerHTML = "";
  dataObj.links.forEach((link, index) => {
    renderLink(link, index);
  });
  // button load next page

  const linksCount = dataObj.links.length;
  const lastLink = dataObj.links[linksCount - 1];
  nextPageNumber = getPageFromLink(lastLink);

  btnLoadMore.hidden = nextPageNumber === null;
  const currentLink = dataObj.links.find((link) => link.active === true);
  currentPageNumber = getPageFromLink(currentLink);
  // current page
}

function getPageFromLink(link) {
  if (link.url === null) {
    return null;
  } else {
    const [, pageNumber] = link.url.split("?page=");
    return pageNumber;
  }
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
  if (link.active) {
    pageButton.classList.add("active");
  }
  pageButton.classList.add("btn-pages");
  pageButton.innerHTML = link.label;
  paginationList.appendChild(pageButton);
  pageButton.addEventListener("click", () => {
    let pageNumber = getPageFromLink(link);
    removeComments();
    getCommentsData(pageNumber);
  });
  console.log(`${index} ${link.label} ${link.url}`);
}

commentForm.addEventListener("submit", postComment);

async function postComment(event) {
  if (!commentForm.checkValidity()) {
    return;
  }
  event.preventDefault();
  let formData = new FormData(commentForm);
  let formDataJson = JSON.stringify(Object.fromEntries(formData));
  let result = await fetch(apiUrl, {
    method: "POST",
    redirect: "follow",
    body: formDataJson,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text());

  console.log("💎" + result);
  removeComments();
  getCommentsData(currentPageNumber);
}
