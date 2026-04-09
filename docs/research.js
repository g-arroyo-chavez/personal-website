document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".research-slide"));
  const posts = Array.from(document.querySelectorAll(".research-post"));
  const left = document.querySelector(".research-arrow-left");
  const right = document.querySelector(".research-arrow-right");

  if (!slides.length) return;

  let current = 0;

  function renderCarousel() {
    slides.forEach((slide, i) => {
      slide.classList.remove("is-active", "is-left", "is-right", "is-hidden");

      if (i === current) {
        slide.classList.add("is-active");
      } else if (i === (current - 1 + slides.length) % slides.length) {
        slide.classList.add("is-left");
      } else if (i === (current + 1) % slides.length) {
        slide.classList.add("is-right");
      } else {
        slide.classList.add("is-hidden");
      }
    });
  }

  function openPost(topic) {
    posts.forEach((post) => {
      post.classList.toggle("is-open", post.id === `post-${topic}`);
    });
  }

  slides.forEach((slide, i) => {
    slide.addEventListener("click", (e) => {
      if (e.target.matches(".research-open-btn")) return;
      current = i;
      renderCarousel();
    });

    const btn = slide.querySelector(".research-open-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        current = i;
        renderCarousel();
        openPost(slide.dataset.topic);
      });
    }
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      posts.forEach((post) => post.classList.remove("is-open"));
    });
  });

  left?.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    renderCarousel();
  });

  right?.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    renderCarousel();
  });

  renderCarousel();
});
