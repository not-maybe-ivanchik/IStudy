export function loadAndRenderArticles(offset, max, isTag) {
  const url = `https://wt.kpi.fei.tuke.sk/api/article?offset=${offset}&max=${max}`;
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const articles = JSON.parse(this.responseText).articles;
      const template = document.getElementById("article-template").innerHTML;
      const container = document.querySelector(".article_list");
      articles.forEach((item) => {
        const { title, author, id, tags } = item;
        console.log(tags);
        if (isTag) {
          if (title && author && id && tags[0] == isTag) {
            console.log("hello");
            const rendered = Mustache.render(template, { title, author, id });
            container.insertAdjacentHTML("beforeend", rendered);
          }
        } else {
          if (title && author && id) {
            const rendered = Mustache.render(template, { title, author, id });
            container.insertAdjacentHTML("beforeend", rendered);
          }
        }
      });
      if (articles.length < 20) {
        document.querySelector(".next-btn").disabled = true;
      } else {
        document.querySelector(".next-btn").disabled = false;
      }

      if (offset == 0) {
        document.querySelector(".prev-btn").disabled = true;
      } else {
        document.querySelector(".prev-btn").disabled = false;
      }
    }
  };
  ajax.open("GET", url, true);
  ajax.send();
}
