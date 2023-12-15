export function loadAndRenderComments(id, startIndex) {
  const url = `https://wt.kpi.fei.tuke.sk/api/article/${id}/comment`;
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const allComments = JSON.parse(this.responseText).comments;
      console.log(allComments.length);
      localStorage.setItem("totalCommentsCount", allComments.length);
      const commentsToShow = allComments.slice(startIndex, startIndex + 10);
      const template = document.getElementById("comment-one-template").innerHTML;
      const container = document.querySelector(".commnets-block");

      // Удаляем существующие комментарии перед добавлением новых
      while (container.getElementsByClassName("commnet__item").length > 0) {
        container.getElementsByClassName("commnet__item")[0].remove();
      }

      localStorage.setItem("commentsLength", commentsToShow.length);
      commentsToShow.forEach((item) => {
        const { text, author } = item;
        if (text && author) {
          const rendered = Mustache.render(template, { text, author });
          container.insertAdjacentHTML("beforeend", rendered);
        }
      });
    }
  };
  ajax.open("GET", url, true);
  ajax.send();
}
