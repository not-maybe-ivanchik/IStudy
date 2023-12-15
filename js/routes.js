import { initializeMainJS } from "./main.js";
import { renderFeedbacks } from "./renderFeedback.js";
import { loadAndRenderArticles } from "./renderArticles.js";
import { loadAndRenderOneArticle } from "./oneArticle/renderOneArticle.js";
import { deleteOneArticle } from "./oneArticle/deleteOnArticle.js";
import { editOneArticle } from "./oneArticle/editOneArticle.js";
import { putArticle } from "./oneArticle/submitChangedArticle.js";
import { makeNewArticle } from "./oneArticle/makeNewArticle.js";
import { loadAndRenderComments } from "./oneArticle/renderComments.js";
import { postArticle } from "./oneArticle/submitChangedArticle.js";
import { makeNewComment } from "./oneArticle/makeNewComment.js";

let offset = 0;
localStorage.setItem("offset", offset);

function getCurrentArticleId() {
  return localStorage.getItem("currentArticleId");
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "#istudy";
  }
  window.addEventListener("hashchange", onHashChange);
  onHashChange();
});

function onHashChange() {
  const hash = window.location.hash;
  const articleRegex = /#article\/(\d+)/;

  if (articleRegex.test(hash)) {
    const articleId = hash.match(articleRegex)[1];
    route("#article", articleId);
  } else {
    route(hash);
  }
}

export function route(hash, articleId = null) {
  const introBlock = document.getElementById("intro_block");
  const mainBlock = document.getElementById("main_block");
  const btnSection = document.querySelector(".btn-section");
  const btnsArticle = document.querySelector(".btn-article");
  const commentSection = document.querySelector(".comments");
  introBlock.innerHTML = "";
  mainBlock.innerHTML = "";
  if (btnSection) {
    btnSection.style.display = "none";
  }
  if (btnsArticle) {
    btnsArticle.style.display = "none";
  }
  if (commentSection) {
    commentSection.style.display = "none";
  }

  switch (hash) {
    case "#istudy":
      introBlock.innerHTML = document.getElementById(
        "template-istudy_intro"
      ).innerHTML;
      mainBlock.innerHTML = document.getElementById(
        "template-istudy_main"
      ).innerHTML;
      document
        .querySelector(".footer-page")
        .classList.remove("footer-page_fix");
      initializeMainJS();
      break;
    case "#technologies":
      introBlock.innerHTML = document.getElementById(
        "template-technologies_intro"
      ).innerHTML;
      mainBlock.innerHTML = document.getElementById(
        "template-technologies_main"
      ).innerHTML;
      document
        .querySelector(".footer-page")
        .classList.remove("footer-page_fix");
      initializeMainJS();
      break;
    case "#curriculum":
      introBlock.innerHTML = document.getElementById(
        "template-curriculum_intro"
      ).innerHTML;
      mainBlock.innerHTML = document.getElementById(
        "template-curriculum_main"
      ).innerHTML;
      document
        .querySelector(".footer-page")
        .classList.remove("footer-page_fix");
      initializeMainJS();
      break;
    case "#about":
      introBlock.innerHTML = document.getElementById(
        "template-about_intro"
      ).innerHTML;
      mainBlock.innerHTML = document.getElementById(
        "template-about_main"
      ).innerHTML;
      document
        .querySelector(".footer-page")
        .classList.remove("footer-page_fix");
      initializeMainJS();
      break;
    case "#articles":
      introBlock.innerHTML = "";
      let offset = +localStorage.getItem("offset");
      let max = 20;
      const tag = ""
      introBlock.innerHTML =
        document.getElementById("template-articles").innerHTML;
      document.querySelector(".footer-page").classList.add("footer-page_fix");
      if (btnSection) {
        btnSection.style.display = "flex";
      }
      loadAndRenderArticles(offset, max, tag);
      const nextBtn = document.querySelector(".next-btn");
      const prevBtn = document.querySelector(".prev-btn");
      const newArticleBtn = document.querySelector(".new-article-btn");
      if (newArticleBtn && !newArticleBtn.classList.contains("handler-set")) {
        newArticleBtn.addEventListener("click", () => {
          if (btnSection) {
            btnSection.style.display = "none";
          }
          makeNewArticle();
          const cancelBtn = document.querySelector(".cancel-btn__form");
          if (cancelBtn && !cancelBtn.classList.contains("handler-set")) {
            cancelBtn.addEventListener("click", function () {
              route("#articles");
            });
            cancelBtn.classList.add("handler-set");
          }
          const formNewArticle = document.querySelector(".new-article");
          if (
            formNewArticle &&
            !formNewArticle.classList.contains("handler-set")
          ) {
            formNewArticle.addEventListener("submit", (e) => {
              e.preventDefault();
              postArticle();
            });
            formNewArticle.classList.add("handler-set");
          }
        });
        newArticleBtn.classList.add("handler-set");
      }
      if (nextBtn && !nextBtn.classList.contains("handler-set")) {
        nextBtn.addEventListener("click", () => {
          offset += max;
          localStorage.setItem("offset", offset);
          let articles = document
            .querySelector(".article_list")
            .getElementsByTagName("article");
          loadAndRenderArticles(offset, max, tag);
          for (
            var i = articles.length - 1;
            i >= Math.max(articles.length - 20, 0);
            i--
          ) {
            articles[i].parentNode.removeChild(articles[i]);
          }
        });
        nextBtn.classList.add("handler-set");
      }
      if (prevBtn && !prevBtn.classList.contains("handler-set")) {
        prevBtn.addEventListener("click", () => {
          offset -= max;
          localStorage.setItem("offset", offset);
          let articles = document
            .querySelector(".article_list")
            .getElementsByTagName("article");
          loadAndRenderArticles(offset, max, tag);
          for (
            var i = articles.length - 1;
            i >= Math.max(articles.length - 20, 0);
            i--
          ) {
            articles[i].parentNode.removeChild(articles[i]);
          }
        });
        prevBtn.classList.add("handler-set");
      }
      break;
    case "#feedback":
      introBlock.innerHTML =
        document.getElementById("template-feedback").innerHTML;
      document.querySelector(".footer-page").classList.add("footer-page_fix");
      renderFeedbacks();
      break;
    case "#article":
      let offsetOfCommnts = 0;
      const maxComments = 10;
      if (articleId) {
        introBlock.innerHTML = document.getElementById(
          "template-article-one"
        ).innerHTML;
        if (commentSection) {
          commentSection.style.display = "block";
        }
        document.querySelector(".footer-page").classList.add("footer-page_fix");
        loadAndRenderOneArticle(articleId);
        const currentArtId = getCurrentArticleId();
        loadAndRenderComments(currentArtId, offsetOfCommnts);
        if (btnsArticle) {
          btnsArticle.style.display = "flex";
        }
        const deleteBtn = document.querySelector(".delete-btn");
        const editBtn = document.querySelector(".change-btn");
        const newCommentBtn = document.querySelector(".btn-commnets__new");
        const prevCommentsBtn = document.querySelector(".btn-comments__prev");
        const nextCommentsBtn = document.querySelector(".btn-comments__next");
        if (
          nextCommentsBtn &&
          !nextCommentsBtn.classList.contains("handler-set")
        ) {
          nextCommentsBtn.addEventListener("click", () => {
            const totalComments = parseInt(
              localStorage.getItem("totalCommentsCount")
            );
            if (offsetOfCommnts + maxComments < totalComments) {
              offsetOfCommnts += maxComments;
              loadAndRenderComments(currentArtId, offsetOfCommnts);
              prevCommentsBtn.disabled = false;
              if (offsetOfCommnts + maxComments >= totalComments) {
                nextCommentsBtn.disabled = true;
              }
            }
          });
          nextCommentsBtn.classList.add("handler-set");
        }
        if (prevCommentsBtn && !prevCommentsBtn.classList.contains("handler-set")) {
          prevCommentsBtn.addEventListener("click", () => {
            if (offsetOfCommnts > 0) {
              offsetOfCommnts -= maxComments;
              offsetOfCommnts = Math.max(offsetOfCommnts, 0); // Защита от отрицательного значения
              loadAndRenderComments(currentArtId, offsetOfCommnts);
              nextCommentsBtn.disabled = false; // Активируем кнопку "Следующая"
              if (offsetOfCommnts === 0) {
                prevCommentsBtn.disabled = true; // Деактивируем кнопку "Предыдущая", если достигли начала
              }
            }
          });
          prevCommentsBtn.classList.add("handler-set")
        }
        if (newCommentBtn && !newCommentBtn.classList.contains("handler-set")) {
          newCommentBtn.addEventListener("click", () => {
            commentSection.insertAdjacentHTML(
              "beforeend",
              `<form method="POST" class="new-comment">
            <h2 class="new-comment__title">New Comment</h2>
            <input placeholder="author" type="text" id="author" name="author" class="new-comment__author" required>
            <input placeholder="text" type="text" id="text" name="text" class="new-comment__text" required>
            <div class="new-comment__btns">
              <input type="submit" value="Submit" class="new-comment__btn new-comment__submit">
              <button class="new-comment__btn new-comment__cancel">cancel</button>
            </div>
          </form>`
            );
            newCommentBtn.disabled = true;
            const submitComment = document.querySelector(".new-comment");
            const cancelCommentBtn = document.querySelector(
              ".new-comment__cancel"
            );
            if (
              cancelCommentBtn &&
              !cancelCommentBtn.classList.contains("handler-set")
            ) {
              cancelCommentBtn.addEventListener("click", () => {
                newCommentBtn.disabled = false;
                document.querySelector(".new-comment").remove();
              });
              cancelCommentBtn.classList.add("handler-set");
            }
            if (
              submitComment &&
              !submitComment.classList.contains("handler-set")
            ) {
              submitComment.addEventListener("submit", (e) => {
                e.preventDefault();
                newCommentBtn.disabled = false;
                const currentArticleId = getCurrentArticleId();
                makeNewComment(currentArticleId);
              });
              submitComment.classList.add("handler-set");
            }
          });
          newCommentBtn.classList.add("handler-set");
        }
        if (deleteBtn.deleteHandler) {
          deleteBtn.removeEventListener("click", deleteBtn.deleteHandler);
        }
        deleteBtn.deleteHandler = function () {
          deleteOneArticle(articleId);
        };
        deleteBtn.addEventListener("click", deleteBtn.deleteHandler);
        if (editBtn && !editBtn.classList.contains("handler-set")) {
          if (editBtn.editHandler) {
            editBtn.removeEventListener("click", editBtn.editHandler);
          }
          editBtn.editHandler = function () {
            if (btnsArticle) {
              btnsArticle.style.display = "none";
            }
            if (commentSection) {
              commentSection.style.display = "none";
            }
            editOneArticle(articleId);
            const cancelBtn = document.querySelector(".cancel-btn__form");
            if (cancelBtn && !cancelBtn.classList.contains("handler-set")) {
              cancelBtn.addEventListener("click", function () {
                const currentArticleId = getCurrentArticleId();
                route("#article", currentArticleId);
              });
              cancelBtn.classList.add("handler-set");
            }
            const formEdit = document.querySelector(".article-form");
            if (formEdit && !formEdit.classList.contains("handler-set")) {
              formEdit.addEventListener("submit", (e) => {
                e.preventDefault();
                const currentArticleId = getCurrentArticleId();
                putArticle(currentArticleId);
              });
              formEdit.classList.add("handler-set");
            }
          };
          editBtn.addEventListener("click", editBtn.editHandler);
          editBtn.classList.add("handler-set");
        }
      }
      break;
  }
}
