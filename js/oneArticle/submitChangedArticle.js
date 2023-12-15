import { route } from "../routes.js";

export function putArticle(id) {
  const formData = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value
      ? document.getElementById("author").value
      : "by Anonimus",
    content: document.getElementById("content").value,
    imageLink: document.getElementById("imageLink").value
      ? document.getElementById("imageLink").value
      : "",
    tags: document
      .getElementById("tags")
      .value.split(", ")
      .map((tag) => tag.trim()),
  };
  const url = `https://wt.kpi.fei.tuke.sk/api/article/${id}`
  fetch(url, {
    method: "PUT",
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
      localStorage.setItem('lastResponse', JSON.stringify(jsonResponse));
      console.log("Article updated:", jsonResponse);
      history.pushState(null, null, '#articles');
      route("#articles");
    })
    .catch((error) => {
      console.error("Error:", error);
      localStorage.setItem('lastResponse', error);
    });
}

export function postArticle() {
  const formData = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value
      ? document.getElementById("author").value
      : "by Anonimus",
    content: document.getElementById("content").value,
    imageLink: document.getElementById("imageLink").value
      ? document.getElementById("imageLink").value
      : "",
    tags: document
      .getElementById("tags")
      .value.split(", ")
      .map((tag) => tag.trim()),
  };
  const url = `https://wt.kpi.fei.tuke.sk/api/article`;
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
      localStorage.setItem('lastResponse', JSON.stringify(jsonResponse));
      console.log("Article updated:", jsonResponse);
      route("#articles");
    })
    .catch((error) => {
      console.error("Error:", error);
      localStorage.setItem('lastResponse', error);
    });
}