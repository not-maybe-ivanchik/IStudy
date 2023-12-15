export function initializeMainJS() {
  const feedbackBtn = document.querySelector(".feedback__btn");
  const body = document.querySelector(".body-page");
  const feedbackSection = document.querySelector(".feedback__form_box");
  const disableFeedbackBtn = document.querySelector(".feedback__disable");
  const feedbackForm = document.querySelector(".feedback__form");

  const disableForm = () => {
    feedbackSection.classList.remove("active");
  };

  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", () => {
      feedbackSection.classList.add("active");
    });
  }

  if (disableFeedbackBtn) {
    disableFeedbackBtn.addEventListener("click", () => {
      disableForm();
    });
  }

  function loadFeedbacks() {
    return JSON.parse(localStorage.getItem("feedbackData") || "[]");
  }

  if (feedbackBtn) {
    feedbackForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        imageUrl: document.getElementById("image-url").value,
        opinion: document.querySelector('input[name="opinion"]:checked').value,
        subscribe: document.getElementById("subscribe").checked,
        keywords: document.getElementById("keywords").value,
        comment: document.getElementById("comment").value,
        date: new Date(),
      };

      let feedbackArray = loadFeedbacks();

      feedbackArray.push(formData);

      localStorage.setItem("feedbackData", JSON.stringify(feedbackArray));
      feedbackForm.reset();
      disableForm();
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeMainJS);
