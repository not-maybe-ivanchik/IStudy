import { route } from "../routes.js";

export function editOneArticle(id) {
  const { title, author, content, imageLink, tags } = JSON.parse(
    localStorage.getItem("article")
  );
  const ownArticleItem = document.querySelector(".own-article__item");

  if (ownArticleItem) {
    ownArticleItem.style.display = "none";
  }
  document.querySelector(".own-article").insertAdjacentHTML(
    "afterbegin",
    `<div class="block">
    <form class="article-form" method="PUT">
    <h3 class="article-form__own-text">Edit article</h3>

      <input placeholder="title" type="text" id="title" name="title" class="article-form__title" value="${title}" required>
  
      <input placeholder="author" type="text" id="author" name="author" class="article-form__author" value="${author}">
  
      <input placeholder="content" type="text" id="content" name="content" class="article-form__content" required value="${
        content ? content : ""
      }">
  
      <input placeholder="image link" type="text" id="imageLink" name="imageLink" class="article-form__img" value="${
        imageLink ? imageLink : ""
      }">
  
      <input placeholder="keywords" type="text" id="tags" name="tags" class="article-form__tags" value="${
        tags ? tags : ""
      }">
      
      <div class="article-form__btns">
      <input type="submit" value="Submit" class="article-form__submit">
      <input type="reset" value="Reset" class="article-form__reset">
      </div>
  </form>
  </div>
  <button class="cancel-btn__form">cancel</button>"
`
  );
  const resetBtn = document.querySelector(".article-form__reset");
  if (resetBtn && !resetBtn.classList.contains("handler-set")) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault()
      document.querySelector("#title").value = "";
      document.querySelector("#author").value = "";
      document.querySelector("#content").value = "";
      document.querySelector("#imageLink").value = "";
      document.querySelector("#tags").value = "";
    });
    resetBtn.classList.add("handler-set");
  }
}
