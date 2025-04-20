document.addEventListener("DOMContentLoaded", function () {
    // Grab needed elements
    const muteButton = document.getElementById("muteButton");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const bookNowButton = document.getElementById("bookNowButton");
    const introScreen = document.getElementById("introScreen");
    const contactForm = document.getElementById("contactForm");
  
    // Create Audio objects
    const audio1 = new Audio("/sounds/daralteb.mp3");
    const audio2 = new Audio("/sounds/amanah.mp3");
  
    let isMuted = false;
    let showIntro = true;
  
    // Dark mode: load setting from localStorage
    const storedTheme = localStorage.getItem("daralTebTheme");
    if (storedTheme === "dark") {
      document.body.classList.add("dark");
      darkModeToggle.textContent = "🌞";
    } else {
      document.body.classList.remove("dark");
      darkModeToggle.textContent = "🌙";
    }
  
    // Toggle dark mode
    darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("daralTebTheme", "dark");
        darkModeToggle.textContent = "🌞";
      } else {
        localStorage.setItem("daralTebTheme", "light");
        darkModeToggle.textContent = "🌙";
      }
    });
  
    // Toggle Mute
    muteButton.addEventListener("click", function () {
      isMuted = !isMuted;
      audio1.muted = isMuted;
      audio2.muted = isMuted;
      muteButton.textContent = isMuted ? "🔇 كتم" : "🔊 صوت";
    });
  
    // Play intro audio if intro is showing
    if (showIntro) {
      audio1.volume = isMuted ? 0 : 1;
      audio2.volume = isMuted ? 0 : 1;
  
      audio1.play().catch(function (err) {
        console.warn("المتصفح منع تشغيل الصوت تلقائيًا", err);
      });
      setTimeout(function () {
        audio2.play().catch(function (err) {
          console.warn("المتصفح منع تشغيل الصوت تلقائيًا", err);
        });
      }, 4000);
    }
  
    // Remove the intro overlay after 7 seconds (allowing CSS fade-out to complete)
    setTimeout(function () {
      showIntro = false;
      introScreen.style.display = "none";
      audio1.pause();
      audio2.pause();
    }, 8000);
  
    // Scroll to Contact section when “احجز الآن” is clicked
    bookNowButton.addEventListener("click", function () {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  
    // Handle contact form submission (AJAX or other integration can be added)
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("شكراً لتواصلكم! سنعود اليكم قريباً.");
      contactForm.reset();
    });
  });