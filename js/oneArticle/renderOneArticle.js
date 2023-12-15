export function loadAndRenderOneArticle(id) {
  localStorage.setItem("currentArticleId", id);
  const url = `https://wt.kpi.fei.tuke.sk/api/article/${id}`;
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const article = JSON.parse(this.responseText);
      const template = document.getElementById(
        "article-one-template"
      ).innerHTML;
      const container = document.querySelector(".own-article");
      let { title, author, content, imageLink, tags } = article;
      tags = tags.join(", ")
      localStorage.setItem(
        "article",
        JSON.stringify({ title, author, content, imageLink, tags })
        );
        const rendered = Mustache.render(template, {
        title,
        author,
        content,
        imageLink: imageLink || "",
        tags,
      });
      container.insertAdjacentHTML("afterbegin", rendered);
    }
  };
  ajax.open("GET", url, true);
  ajax.send();
}
