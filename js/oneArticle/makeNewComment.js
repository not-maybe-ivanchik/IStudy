import { route } from "../routes.js";

export function makeNewComment(id) {
  const formData = {
    text: document.querySelector(".new-comment__text").value,
    author: document.querySelector(".new-comment__author").value,
  };
  const url = `https://wt.kpi.fei.tuke.sk/api/article/${id}/comment`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((jsonResponse) => {
      localStorage.setItem("lastResponse", JSON.stringify(jsonResponse));
      console.log("Article updated:", jsonResponse);
      document.querySelector(".new-comment").remove();
      route("#article", id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
