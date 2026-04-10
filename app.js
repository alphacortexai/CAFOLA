const defaults = {
  hero: {
    eyebrow: "Trusted In‑Home Care",
    title: "Compassionate care that helps loved ones live safely at home.",
    subtitle: "CAFOLA delivers personalized non-medical home care, companionship, and support for daily living.",
    bullets: [
      "Care available from a few hours a week to 24/7 coverage",
      "Caregivers matched to personality, needs, and routines",
      "Regular family updates and responsive support"
    ]
  },
  services: [
    { title: "Companion Care", body: "Friendly support, conversation, hobbies, and social engagement." },
    { title: "Personal Care", body: "Help with bathing, grooming, mobility, and daily routines." },
    { title: "Specialty Care", body: "Alzheimer’s, dementia, and chronic condition support." },
    { title: "Respite Care", body: "Temporary relief so family caregivers can rest and recharge." }
  ],
  steps: [
    { title: "1. Start with a call", body: "Tell us about your loved one’s needs, schedule, and goals." },
    { title: "2. Build a plan", body: "We create a tailored care plan and match a compatible caregiver." },
    { title: "3. Ongoing support", body: "Your coordinator checks in regularly and adjusts care as needs change." }
  ],
  testimonials: [
    { quote: "CAFOLA made it possible for Dad to stay in his home with dignity.", author: "— The James Family" },
    { quote: "Reliable, kind, and always communicative. We finally have peace of mind.", author: "— Maria L." }
  ],
  cta: {
    title: "Ready to build your care plan?",
    subtitle: "Speak with a CAFOLA care coordinator and get guidance tailored to your family."
  }
};

const STORAGE_KEY = "cafola_cms_data";
const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaults;

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
};

const renderList = (id, items, renderer) => {
  const root = document.getElementById(id);
  if (!root) return;
  root.innerHTML = "";
  items.forEach((item) => {
    const node = document.createElement("div");
    node.innerHTML = renderer(item);
    root.appendChild(node.firstElementChild);
  });
};

setText("hero-eyebrow", data.hero.eyebrow);
setText("hero-title", data.hero.title);
setText("hero-subtitle", data.hero.subtitle);
setText("cta-title", data.cta.title);
setText("cta-subtitle", data.cta.subtitle);

document.getElementById("year").textContent = new Date().getFullYear();

const bullets = document.getElementById("hero-bullets");
bullets.innerHTML = "";
data.hero.bullets.forEach((txt) => {
  const li = document.createElement("li");
  li.textContent = txt;
  bullets.appendChild(li);
});

renderList("services-grid", data.services, (s) => `<article class="card"><h3>${s.title}</h3><p>${s.body}</p></article>`);
renderList("steps-grid", data.steps, (s) => `<article class="step"><h3>${s.title}</h3><p>${s.body}</p></article>`);
renderList("testimonials-grid", data.testimonials, (t) => `<article class="testimonial"><p>“${t.quote}”</p><strong>${t.author}</strong></article>`);
