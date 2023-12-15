function loadFeedbacks() {
    return JSON.parse(localStorage.getItem('feedbackData') || '[]');
}

export function renderFeedbacks() {
    const feedbacks = loadFeedbacks();
    const template = document.getElementById('feedback-template').innerHTML;
    const container = document.querySelector('.user-feedback__list');
    feedbacks.forEach(item => {
        const { name, comment, date} = item;
        const day = new Date(date).toDateString()
      
        if (name && comment && date) {
          const rendered = Mustache.render(template, { name, comment, day });
          container.innerHTML += rendered;
        }
      });
}