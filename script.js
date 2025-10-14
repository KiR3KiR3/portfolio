document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    pl: {
      "nav-about": "O mnie",
      "nav-services": "Usługi",
      "nav-pricing": "Cennik",
      "nav-contact": "Kontakt",
      "welcome": "Witaj, szukasz grafika?",
      "headline": "Dobrze trafiłeś, chętnie nim zostanę.",
      "about-title": "O mnie",
      "about-text": "Jestem grafikiem komputerowym. Tworzę różnego rodzaju projekty graficzne — miniaturki, banery, logotypy oraz inne grafiki. Każdą pracę traktuję indywidualnie, z pełnym zaangażowaniem i dbałością o szczegóły, tak aby idealnie odpowiadała potrzebom klienta.",
      "services-title": "Usługi",
      "pricing-title": "Cennik",
      "contact-title": "Kontakt",
      "contact-info": "Napisz do mnie: <a href='mailto:H6zardzista@gmail.com'>  H6zardzista@gmail.com</a>",
      "portfolio-open": "Zobacz portfolio",
      "portfolio-back": "Wróć",
      "portfolio-title": "Portfolio",
      "portfolio-miniatures": "Miniaturki:",
      "portfolio-banners": "Bannery:",
      "portfolio-logos": "Loga:",
      "portfolio-profiles": "Profilowe:",
      "service-thumbnail": "Miniatura",
      "service-banner": "Baner",
      "service-logo": "Logo",
      "service-profile": "Profilowe",
      "price-thumbnail": "Miniatura — <span>30-60 zł</span>",
      "price-banner": "Baner — <span>40-100 zł</span>",
      "price-logo": "Logo — <span>80-200 zł</span>",
      "price-profile": "Profilowe — <span>20-60 zł</span>"
    },
    en: {
      "nav-about": "About me",
      "nav-services": "Services",
      "nav-pricing": "Pricing",
      "nav-contact": "Contact",
      "welcome": "Hello, are you looking for a graphic designer?",
      "headline": "You've come to the right place, I'd love to stay.",
      "about-title": "About me",
      "about-text": "I’m a graphic designer who creates various digital projects —   thumbnails, banners, logos, and more. I approach each work individually, with full   commitment and attention to detail, ensuring it perfectly fits the client’s needs.",
      "services-title": "Services",
      "pricing-title": "Pricing",
      "contact-title": "Contact",
      "contact-info": "Email me: <a href='mailto:H6zardzista@gmail.com'>H6zardzista@gmail.com</a>",
      "portfolio-open": "View Portfolio",
      "portfolio-back": "Back",
      "portfolio-title": "Portfolio",
      "portfolio-miniatures": "Thumbnails:",
      "portfolio-banners": "Banners:",
      "portfolio-logos": "Logos:",
      "portfolio-profiles": "Profile Pictures:",
      "service-thumbnail": "Thumbnail",
      "service-banner": "Banner",
      "service-logo": "Logo",
      "service-profile": "Profile picture",
      "price-thumbnail": "Thumbnail — $7–13",
      "price-banner": "Banner — $9–22",
      "price-logo": "Logo — $18–44",
      "price-profile": "Profile picture — $4–13"
    }
  };

  // ELEMENTY GLOBALNE
  const langButtons = document.querySelectorAll(".lang-btn");
  const fadeElements = document.querySelectorAll(".fade-in");
  const openPortfolioBtn = document.getElementById("open-portfolio");
  const portfolioPage = document.getElementById("portfolio-page");
  const mainContent = document.getElementById("main-content");
  const backBtn = document.getElementById("back-btn");

  // ---------- TŁUMACZENIE ----------
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

  // ---------- EFEKT POJAWIANIA SIĘ ----------
  function showOnScroll() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add("show");
    });
  }

  window.addEventListener("scroll", showOnScroll);
  showOnScroll();

  // ---------- POMOCNICZA FUNKCJA PRZEWIJANIA ----------
  function smoothScrollToElement(targetEl) {
    if (!targetEl) return;
    const headerHeight = document.querySelector("header").offsetHeight || 0;
    const sectionTop = targetEl.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = targetEl.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollTo = sectionTop - (viewportHeight / 2) + (sectionHeight / 2) - headerHeight / 2;
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  }

  // ---------- PŁYNNE PRZEWIJANIE NAV (działa też gdy portfolio jest otwarte) ----------
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      if (!target) return;

      // Jeśli cel jest w mainContent, a mainContent jest ukryty (jesteśmy w portfolio),
      // najpierw pokaż mainContent (i ukryj portfolio), potem przewiń.
      const targetInMain = !!target.closest("#main-content");
      const mainHidden = getComputedStyle(mainContent).display === "none" || mainContent.classList.contains("hidden");

      if (targetInMain && mainHidden) {
        // pokaż mainContent i ukryj portfolio
        portfolioPage.classList.add("hidden");
        mainContent.style.display = ""; // przywraca domyślny (blokowy)
        // Poczekaj na repaint/reflow, aby elementy miały poprawne pozycje, potem przewiń
        requestAnimationFrame(() => {
          // dodatkowe requestAnimationFrame żeby mieć pewność, że layout już jest aktualny
          requestAnimationFrame(() => {
            smoothScrollToElement(target);
          });
        });
      } else {
        // normalne przewinięcie
        smoothScrollToElement(target);
      }
    });
  });

  // ---------- PORTFOLIO: OTWIERANIE i POWRÓT ----------
  if (openPortfolioBtn) {
    openPortfolioBtn.addEventListener("click", () => {
      // ukryj główną zawartość i pokaż portfolio
      mainContent.style.display = "none";
      portfolioPage.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      portfolioPage.classList.add("hidden");
      mainContent.style.display = ""; // przywróć domyślny
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

   // ---------- DODATKOWO: jeśli użytkownik ręcznie modyfikuje adres (hash) ----------
  // np. user wkleja link z #about — obsłuż to poprawnie również gdy jesteśmy w portfolio
  function handleInitialHash() {
    const hash = window.location.hash;
    if (!hash) return; // 🟢 jeśli nie ma #hasha, nie rób nic (nie przewijaj)
    const target = document.querySelector(hash);
    if (!target) return;
    const targetInMain = !!target.closest("#main-content");
    const mainHidden = getComputedStyle(mainContent).display === "none" || mainContent.classList.contains("hidden");
    if (targetInMain && mainHidden) {
      portfolioPage.classList.add("hidden");
      mainContent.style.display = "";
      requestAnimationFrame(() => requestAnimationFrame(() => smoothScrollToElement(target)));
    } else {
      smoothScrollToElement(target);
    }
  }

  // 🟢 Uruchom tylko wtedy, gdy w adresie faktycznie jest hash (np. #about)
  if (window.location.hash) {
    handleInitialHash();
  }
});
