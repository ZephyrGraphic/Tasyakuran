document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    disable: "mobile",
  })

  // Loading screen
  const loadingScreen = document.querySelector(".loading-screen")
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 1500)

  // Mobile menu
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const closeMenuButton = document.querySelector(".close-menu")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link")

  function openMobileMenu() {
    mobileMenu.classList.add("active")
    mobileMenuOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active")
    mobileMenuOverlay.classList.remove("active")
    document.body.style.overflow = ""
  }

  mobileMenuButton.addEventListener("click", openMobileMenu)
  closeMenuButton.addEventListener("click", closeMobileMenu)
  mobileMenuOverlay.addEventListener("click", closeMobileMenu)

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu()
      const targetId = link.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetElement.offsetTop - navbarHeight
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  function updateCountdown() {
    const targetDate = new Date("April 5, 2025 10:00:00").getTime()

    function update() {
      const now = new Date().getTime()
      const distance = targetDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      document.getElementById("days").textContent = String(days).padStart(2, "0")
      document.getElementById("hours").textContent = String(hours).padStart(2, "0")
      document.getElementById("minutes").textContent = String(minutes).padStart(2, "0")
      document.getElementById("seconds").textContent = String(seconds).padStart(2, "0")

      if (distance < 0) {
        clearInterval(interval)
        document.getElementById("days").textContent = "00"
        document.getElementById("hours").textContent = "00"
        document.getElementById("minutes").textContent = "00"
        document.getElementById("seconds").textContent = "00"
      }
    }

    update()
    const interval = setInterval(update, 1000)
  }

  updateCountdown()

  // Background Music
  const backgroundMusic = document.getElementById("background-music")
  const musicToggle = document.getElementById("music-toggle")
  const playIcon = document.querySelector(".music-play-icon")
  const pauseIcon = document.querySelector(".music-pause-icon")

  let isPlaying = false

  // Function to play music
  function playMusic() {
    backgroundMusic.play()
    isPlaying = true
    playIcon.classList.add("hidden")
    pauseIcon.classList.remove("hidden")
    musicToggle.classList.add("active")
  }

  // Function to pause music
  function pauseMusic() {
    backgroundMusic.pause()
    isPlaying = false
    playIcon.classList.remove("hidden")
    pauseIcon.classList.add("hidden")
    musicToggle.classList.remove("active")
  }

  // Toggle music on button click
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  })

  // Auto play music when user interacts with the page
  function setupMusicAutoplay() {
    // We'll only try to autoplay once
    let hasAttemptedAutoplay = false

    function attemptAutoplay() {
      if (!hasAttemptedAutoplay) {
        hasAttemptedAutoplay = true
        playMusic()
      }

      // Remove event listeners after first interaction
      document.removeEventListener("click", attemptAutoplay)
      document.removeEventListener("touchstart", attemptAutoplay)
    }

    document.addEventListener("click", attemptAutoplay)
    document.addEventListener("touchstart", attemptAutoplay)
  }

  setupMusicAutoplay()

  // Initialize Gallery
  if (document.getElementById("gallery-container")) {
    // Sample gallery images - replace with actual images from your /images/Gallery folder
    const galleryImages = [
      { src: "/images/Gallery/gallery1.jpg", alt: "Foto Prewedding 1" },
      { src: "/images/Gallery/gallery2.jpg", alt: "Foto Prewedding 2" },
      { src: "/images/Gallery/gallery3.jpg", alt: "Foto Prewedding 3" },
      { src: "/images/Gallery/gallery4.jpg", alt: "Foto Prewedding 4" },
      { src: "/images/Gallery/gallery5.jpg", alt: "Foto Prewedding 5" },
      { src: "/images/Gallery/gallery6.jpg", alt: "Foto Prewedding 6" },
    ]

    // Initialize lightGallery
    const galleryContainer = document.getElementById("gallery-container")

    // Clear placeholder content
    galleryContainer.innerHTML = ""

    // Add gallery items
    galleryImages.forEach((image, index) => {
      const galleryItem = document.createElement("div")
      galleryItem.className = "gallery-item"
      galleryItem.dataset.src = image.src

      const img = document.createElement("img")
      img.src = image.src
      img.alt = image.alt
      img.className =
        "w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer object-cover aspect-square"

      galleryItem.appendChild(img)
      galleryContainer.appendChild(galleryItem)
    })

    // Initialize lightGallery
    const lightGallery = window.lightGallery
    const lgZoom = window.lgZoom
    const lgThumbnail = window.lgThumbnail

    lightGallery(galleryContainer, {
      selector: ".gallery-item",
      plugins: [lgZoom, lgThumbnail],
      speed: 500,
      download: false,
      counter: false,
      thumbnail: true,
    })
  }

  // Add active class to nav links based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section, header")
    const navLinks = document.querySelectorAll(".nav-link")
    const mobileNavLinks = document.querySelectorAll(".mobile-menu-link")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    // Update desktop nav links
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })

    // Update mobile nav links
    mobileNavLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  }

  // Add scroll event listener for active nav links
  window.addEventListener("scroll", updateActiveNavLink)
  window.addEventListener("load", updateActiveNavLink)
})

