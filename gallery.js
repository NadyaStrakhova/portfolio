function createGalleryButton(arrow, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "gallery__button";
  button.textContent = arrow;
  button.setAttribute("aria-label", label);
  return button;
}

for (const gallery of document.querySelectorAll(".gallery")) {
  const slides = Array.from(gallery.querySelectorAll(":scope > figure"));
  if (slides.length < 2) continue;

  const controls = document.createElement("div");
  controls.className = "gallery__controls";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", "Переключение фотографий");

  const previous = createGalleryButton("←", "Предыдущая фотография");
  const next = createGalleryButton("→", "Следующая фотография");
  const counter = document.createElement("span");
  counter.className = "gallery__counter";
  counter.setAttribute("role", "status");

  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      slide.hidden = position !== currentIndex;
    });
    counter.textContent = `${currentIndex + 1} из ${slides.length}`;
  }

  previous.addEventListener("click", () => showSlide(currentIndex - 1));
  next.addEventListener("click", () => showSlide(currentIndex + 1));
  controls.append(previous, counter, next);
  showSlide(0);
  gallery.prepend(controls);
}
