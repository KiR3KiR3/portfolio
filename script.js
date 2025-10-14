document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    pl: {
      "nav-about": "O mnie",
      "nav-services-pricing": "Usługi i Cennik",
      "nav-contact": "Kontakt",
      "welcome": "Witaj, szukasz grafika?",
      "headline": "Dobrze trafiłeś, chętnie nim zostanę.",
      "about-title": "O mnie",
      "about-text": "Jestem grafikiem komputerowym. Tworzę różnego rodzaju projekty graficzne — miniaturki, banery, logotypy oraz inne grafiki. Każdą pracę traktuję indywidualnie, z pełnym zaangażowaniem i dbałością o szczegóły.",
      "services-pricing-title": "Usługi i Cennik",
      "service-thumbnail": "Miniatura",
      "service-banner": "Baner",
      "service-logo": "Logo",
      "service-profile": "Profilowe",
      "price-thumbnail": "30–60 zł",
      "price-banner": "40–100 zł",
      "price-logo": "80–200 zł",
      "price-profile": "20–60 zł",
      "contact-title": "Kontakt",
      "contact-info": "Napisz do mnie: <a href='mailto:H6zardzista@gmail.com'>H6zardzista@gmail.com</a>",
      "portfolio-open": "Zobacz portfolio",
      "portfolio-back": "Wróć",
      "portfolio-title": "Portfolio"
    },
    en: {
      "nav-about": "About me",
      "nav-services-pricing": "Services & Pricing",
      "nav-contact": "Contact",
      "welcome": "Hello, are you looking for a graphic designer?",
      "headline": "You've come to the right place, I'd love to stay.",
      "about-title": "About me",
      "about-text": "I’m a graphic designer who creates various digital projects — thumbnails, banners, logos, and more. Each project is made with care, precision, and passion to fit the client’s needs.",
      "services-pricing-title": "Services & Pricing",
      "service-thumbnail": "Thumbnail",
      "service-banner": "Banner",
      "service-logo": "Logo",
      "service-profile": "Profile Picture",
      "price-thumbnail": "$8–15",
      "price-banner": "$10–25",
      "price-logo": "$20–45",
      "price-profile": "$6–15",
      "contact-title": "Contact",
      "contact-info": "Email me: <a href='mailto:H6zardzista@gmail.com'>H6zardzista@gmail.com</a>",
      "portfolio-open": "View Portfolio",
      "portfolio-back": "Back",
      "portfolio-title": "Portfolio"
    }
  };

  const langButtons = document.querySelectorAll(".lang-btn");
  const fadeElements = document.querySelectorAll(".fade-in");
  const openPortfolioBtn = document.getElementById("open-portfolio");
  const portfolioPage = document.getElementById("portfolio-page");
  const mainContent = document.getElementById("main-content");
  const backBtn = document.getElementById("back-btn");

  // Zmiana języka
  langButtons.forEach(btn =>
    btn.addEventListener("click", () => {
      langButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      changeLanguage(btn.id);
    })
  );

  function changeLanguage(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  // Efekt pojawiania
  function showOnScroll() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add("show");
    });
  }

  window.addEventListener("scroll", showOnScroll);
  showOnScroll();

  // Portfolio przełączanie
  if (openPortfolioBtn) {
    openPortfolioBtn.addEventListener("click", () => {
      mainContent.style.display = "none";
      portfolioPage.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      portfolioPage.classList.add("hidden");
      mainContent.style.display = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });
});
