document.addEventListener("DOMContentLoaded", function () {
  const sliderData = [
    {
      title: "Beispiel Autohaus 1",
      content: `
        Musterstraße 1<br>12345 Musterstadt<br>
        ✔️ Service verfügbar<br>✖️ Gebrauchtwagen<br>✖️ Neuwagen<br>
        Verkauf: +49 (000) 123456-0<br>Service: +49 (000) 123456-1<br>
        E-Mail: kontakt@example.com
      `,
      buttons: [
        { text: "MEHR ERFAHREN", link: "https://example.com" },
        { text: "TEAM", link: "https://example.com" },
      ],
    },
    {
      title: "Beispiel Autohaus 2",
      content: `
        Musterstraße 2<br>54321 Musterstadt<br>
        ✔️ Service verfügbar<br>✖️ Gebrauchtwagen<br>✖️ Neuwagen<br>
        Verkauf: +49 (000) 654321-0<br>Service: +49 (000) 654321-1<br>
        E-Mail: service@example.com
      `,
      buttons: [
        { text: "MEHR ERFAHREN", link: "https://example.com" },
        { text: "TEAM", link: "https://example.com" },
      ],
    },
    {
      title: "Beispiel Autohaus 3",
      content: `
        Beispielweg 3<br>98765 Beispielstadt<br>
        ✔️ Service verfügbar<br>✖️ Gebrauchtwagen<br>✖️ Neuwagen<br>
        Verkauf: +49 (000) 987654-0<br>Service: +49 (000) 987654-1<br>
        E-Mail: info@example.com
      `,
      buttons: [
        { text: "MEHR ERFAHREN", link: "https://example.com" },
        { text: "TEAM", link: "https://example.com" },
      ],
    },
  ];

  const sliderWrapper = document.querySelector(".slider-wrapper");
  const pagination = document.querySelector(".pagination");
  const leftButton = document.querySelector(".nav-button.left");
  const rightButton = document.querySelector(".nav-button.right");
  let currentSlide = 0;

  // Dynamische Erstellung der Slides
  sliderData.forEach((slide) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("slide");
    slideElement.innerHTML = `
      <div class="logo">
        <img src="https://example.com/logo.webp" alt="Logo">
      </div>
      <div class="content">
        <h3>${slide.title}</h3>
        <p>${slide.content}</p>
        ${slide.buttons
          ? slide.buttons
              .map(
                (btn) =>
                  `<a href="${btn.link}" target="_blank" class="button">${btn.text}</a>`
              )
              .join("")
          : ""}
      </div>
    `;
    sliderWrapper.appendChild(slideElement);
  });

  // Slider-Funktionalität
  function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    pagination.textContent = `${currentSlide + 1} / ${sliderData.length}`;
  }

  leftButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + sliderData.length) % sliderData.length;
    updateSlider();
  });

  rightButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % sliderData.length;
    updateSlider();
  });

  // Touch-Unterstützung hinzufügen
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  sliderWrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  sliderWrapper.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
  });

  sliderWrapper.addEventListener("touchend", () => {
    if (!isSwiping) return;
    const deltaX = startX - currentX;
    if (Math.abs(deltaX) > 50) {
      // Slide wechseln bei ausreichender Bewegung
      if (deltaX > 0) {
        currentSlide = (currentSlide + 1) % sliderData.length; // Nach rechts
      } else {
        currentSlide = (currentSlide - 1 + sliderData.length) % sliderData.length; // Nach links
      }
      updateSlider();
    }
    isSwiping = false;
  });

  updateSlider();
});
