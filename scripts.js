document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    disable: "mobile",
  });

  // Loading screen
  const loadingScreen = document.querySelector(".loading-screen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1500);

  // Mobile menu
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const closeMenuButton = document.querySelector(".close-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

  function openMobileMenu() {
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileMenuButton.addEventListener("click", openMobileMenu);
  closeMenuButton.addEventListener("click", closeMobileMenu);
  mobileMenuOverlay.addEventListener("click", closeMobileMenu);

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  function updateCountdown() {
    const targetDate = new Date("April 5, 2025 10:00:00").getTime();

    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = String(days).padStart(
        2,
        "0"
      );
      document.getElementById("hours").textContent = String(hours).padStart(
        2,
        "0"
      );
      document.getElementById("minutes").textContent = String(minutes).padStart(
        2,
        "0"
      );
      document.getElementById("seconds").textContent = String(seconds).padStart(
        2,
        "0"
      );

      if (distance < 0) {
        clearInterval(interval);
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
      }
    }

    update();
    const interval = setInterval(update, 1000);
  }

  updateCountdown();
});
