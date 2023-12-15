import { route } from "../routes.js";

export function makeNewArticle() {
  const articleList = document.querySelector(".article_list");

  if (articleList) {
    articleList.innerHTML = ""
  }

  document.querySelector(".article_list").insertAdjacentHTML(
    "afterbegin",
    `<div class="block">
    <form class="new-article" method="POST">
    <h3 class="article-form__own-text">Make newarticle</h3>

      <input placeholder="title" type="text" id="title" name="title" class="article-form__title" required>
  
      <input placeholder="author" type="text" id="author" name="author" class="article-form__author">
  
      <input placeholder="content" type="text" id="content" name="content" class="article-form__content" required>
  
      <input placeholder="image link" type="text" id="imageLink" name="imageLink" class="article-form__img">
  
      <input placeholder="keywords" type="text" id="tags" name="tags" class="article-form__tags">
      
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
