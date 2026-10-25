/* ==========================================================
   SAMMIKE ELECTRONICS â€” FIXED SCRIPT
   Navigation, logo-to-top, active links, reveal animations,
   product enquiry modal, and WhatsApp contact form.
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "2348088586901";

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove("open", "active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = !navLinks.classList.contains("open") &&
                     !navLinks.classList.contains("active");
      navLinks.classList.toggle("open", isOpen);
      navLinks.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }


  
  // Light mode and dark mode
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("sammike-theme");

  // Default to dark mode
  const initialTheme = savedTheme || "dark";
  document.documentElement.dataset.theme = initialTheme;

  function updateThemeButton(theme) {
    if (!themeToggle) return;

    if (theme === "dark") {
      themeToggle.textContent = "☀️";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
      themeToggle.title = "Switch to light mode";
    } else {
      themeToggle.textContent = "🌙";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
      themeToggle.title = "Switch to dark mode";
    }
  }

  updateThemeButton(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("sammike-theme", newTheme);

    updateThemeButton(newTheme);
  });


  // Logo returns to the top in one click
  document.querySelectorAll(".brand").forEach((logo) => {
    logo.addEventListener("click", (event) => {
      const href = logo.getAttribute("href");
      if (href === "#top" || href === "#" || !href) {
        event.preventDefault();
        closeMenu();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
    });
  });

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Active navigation link
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navItems = Array.from(
    document.querySelectorAll('.nav-links a[href^="#"], #navLinks a[href^="#"]')
  );

  const updateActiveNav = () => {
    let currentId = "";
    const marker = window.scrollY + 150;
    sections.forEach((section) => {
      if (section.offsetTop <= marker) currentId = section.id;
    });
    navItems.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // Reveal animations
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible", "revealed", "show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible", "revealed", "show"));
  }

  // Product enquiry modal
  const productModal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalWhatsapp = document.getElementById("modalWhatsapp");

  const openProductModal = (productName) => {
    if (!productModal) return;
    if (modalTitle) modalTitle.textContent = productName || "Product enquiry";
    if (modalWhatsapp) {
      const message = `Hello Sammike Electronics, I'm interested in ${productName || "a product"}. Please share availability and price.`;
      modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }
    productModal.classList.add("open", "active", "show");
    productModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    productModal.querySelector(".modal-close")?.focus();
  };

  const closeProductModal = () => {
    if (!productModal) return;
    productModal.classList.remove("open", "active", "show");
    productModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll("[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
      openProductModal(button.getAttribute("data-product"));
    });
  });

  productModal?.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeProductModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProductModal();
  });

  // Contact form opens WhatsApp with the entered enquiry
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name")?.value.trim() || "";
      const contact = document.getElementById("contactInput")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      if (!name || !contact || !message) {
        if (formStatus) {
          formStatus.textContent = "Please complete all fields before sending.";
          formStatus.setAttribute("role", "alert");
        }
        return;
      }

      const whatsappMessage =
        `Hello Sammike Electronics!\n\nName: ${name}\nContact: ${contact}\nEnquiry: ${message}`;
      if (formStatus) {
        formStatus.textContent = "Opening WhatsApp with your enquiry...";
        formStatus.setAttribute("role", "status");
      }
      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // Ensure WhatsApp contact links have a valid destination
  document.querySelectorAll(".floating-whatsapp, .whatsapp-link").forEach((link) => {
    if (!link.getAttribute("href") || link.getAttribute("href") === "#") {
      link.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}`);
    }
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
});