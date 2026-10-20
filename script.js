const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll('.nav-links a[href^="#"]')];

const updateActiveNav = () => {
  const y = window.scrollY + 130;
  let current = "top";
  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });
  navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${current}`));
};
window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalWhatsapp = document.getElementById("modalWhatsapp");

document.querySelectorAll(".product-btn").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    modalTitle.textContent = product;
    const text = `Hello Technova Electronics, I'm interested in the ${product}. Please confirm the current price and availability.`;
    modalWhatsapp.href = `https://wa.me/2348012345678?text=${encodeURIComponent(text)}`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contactInput").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !contact || !message) {
    status.textContent = "Please complete all fields.";
    status.style.color = "#c62828";
    return;
  }

  const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneLike = /^[+()\d\s-]{7,}$/;
  if (!emailLike.test(contact) && !phoneLike.test(contact)) {
    status.textContent = "Enter a valid phone number or email address.";
    status.style.color = "#c62828";
    return;
  }

  const whatsappText = `Hello Sammike Electronics. My name is ${name}. ${message} You can reach me at ${contact}.`;
  window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(whatsappText)}`, "_blank", "noopener");

  status.textContent = "Opening WhatsApp with your enquiry…";
  status.style.color = "#11834b";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
