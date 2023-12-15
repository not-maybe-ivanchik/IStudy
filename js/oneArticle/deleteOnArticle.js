import { route } from "../routes.js";

export function deleteOneArticle(id) {
    const url = `https://wt.kpi.fei.tuke.sk/api/article/${id}`;
    const deleteAlertHTML = `<div class="delete-alert">
      <h2 class="delete-alert__title">Are you sure?</h2>
      <button class="delete-alert__btn delete-alert__btn">Delete</button>
      <button class="delete-alert__btn cancel-alert__btn">Cancel</button>
    </div>`;
    const container = document.querySelector(".own-article");

    container.insertAdjacentHTML("afterbegin", deleteAlertHTML);

    const deleteButton = document.querySelector(".delete-alert__btn");
    const cancelButton = document.querySelector(".cancel-alert__btn");
    const deleteAlert = document.querySelector(".delete-alert");

    deleteButton.onclick = () => {
      deleteAlert.remove();
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            return response.text().then(text => text ? JSON.parse(text) : {});
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((jsonResponse) => {
          history.pushState(null, null, '#articles');
          route('#articles');
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    cancelButton.onclick = () => {
      deleteAlert.remove();
    };
}
