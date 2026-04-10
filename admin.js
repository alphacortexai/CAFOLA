const STORAGE_KEY = "cafola_cms_data";
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
    { title: "Personal Care", body: "Help with bathing, grooming, mobility, and daily routines." }
  ],
  steps: [
    { title: "1. Start with a call", body: "Tell us about your loved one’s needs, schedule, and goals." },
    { title: "2. Build a plan", body: "We create a tailored care plan and match a compatible caregiver." }
  ],
  testimonials: [
    { quote: "CAFOLA made it possible for Dad to stay in his home with dignity.", author: "— The James Family" }
  ],
  cta: {
    title: "Ready to build your care plan?",
    subtitle: "Speak with a CAFOLA care coordinator and get guidance tailored to your family."
  }
};

let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaults;
let active = "hero";

const collections = ["hero", "services", "steps", "testimonials", "cta"];
const tabs = document.getElementById("collection-tabs");
const panelTitle = document.getElementById("panel-title");
const editor = document.getElementById("editor");

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const button = (label, onClick, extra = "") => {
  const b = document.createElement("button");
  b.className = extra;
  b.textContent = label;
  b.onclick = onClick;
  return b;
};

function renderTabs() {
  tabs.innerHTML = "";
  collections.forEach((name) => {
    const b = button(name, () => {
      active = name;
      renderTabs();
      renderEditor();
    }, active === name ? "active" : "");
    tabs.appendChild(b);
  });
  tabs.appendChild(button("Reset Defaults", () => {
    if (!confirm("Reset all content to defaults?")) return;
    data = JSON.parse(JSON.stringify(defaults));
    save();
    renderEditor();
  }));
}

function listEditor(key, fields) {
  const wrap = document.createElement("div");
  wrap.className = "list";

  data[key].forEach((entry, idx) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `<div><strong>${entry[fields[0]]}</strong></div>`;

    const actions = document.createElement("div");
    actions.className = "actions";

    actions.appendChild(button("Edit", () => editItem(key, fields, idx)));
    actions.appendChild(button("Delete", () => {
      data[key].splice(idx, 1);
      save();
      renderEditor();
    }));

    item.appendChild(actions);
    wrap.appendChild(item);
  });

  wrap.appendChild(button("Add New", () => editItem(key, fields, -1)));
  editor.appendChild(wrap);
}

function editItem(key, fields, idx) {
  const existing = idx >= 0 ? data[key][idx] : Object.fromEntries(fields.map((f) => [f, ""]));
  editor.innerHTML = "";
  const form = document.createElement("div");
  form.className = "form";

  const inputs = {};
  fields.forEach((field) => {
    const label = document.createElement("label");
    label.textContent = field;
    const input = field.length > 12 ? document.createElement("textarea") : document.createElement("input");
    input.value = existing[field] || "";
    inputs[field] = input;
    form.appendChild(label);
    form.appendChild(input);
  });

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.appendChild(button("Save", () => {
    const payload = Object.fromEntries(fields.map((f) => [f, inputs[f].value.trim()]));
    if (idx >= 0) data[key][idx] = payload;
    else data[key].push(payload);
    save();
    renderEditor();
  }));
  actions.appendChild(button("Cancel", () => renderEditor()));

  editor.appendChild(form);
  editor.appendChild(actions);
}

function singleEditor(key, fields) {
  const form = document.createElement("div");
  form.className = "form";

  fields.forEach((field) => {
    const label = document.createElement("label");
    label.textContent = field;
    const input = document.createElement(field === "subtitle" || field === "title" ? "textarea" : "input");
    input.value = data[key][field] || "";
    input.onchange = () => {
      data[key][field] = input.value;
      save();
    };
    form.appendChild(label);
    form.appendChild(input);
  });

  if (key === "hero") {
    const label = document.createElement("label");
    label.textContent = "bullets (one per line)";
    const textarea = document.createElement("textarea");
    textarea.value = data.hero.bullets.join("\n");
    textarea.onchange = () => {
      data.hero.bullets = textarea.value.split("\n").map((x) => x.trim()).filter(Boolean);
      save();
    };
    form.appendChild(label);
    form.appendChild(textarea);
  }

  editor.appendChild(form);
}

function renderEditor() {
  editor.innerHTML = "";
  panelTitle.textContent = `Editing: ${active}`;

  if (active === "hero") return singleEditor("hero", ["eyebrow", "title", "subtitle"]);
  if (active === "cta") return singleEditor("cta", ["title", "subtitle"]);
  if (active === "services") return listEditor("services", ["title", "body"]);
  if (active === "steps") return listEditor("steps", ["title", "body"]);
  if (active === "testimonials") return listEditor("testimonials", ["quote", "author"]);
}

renderTabs();
renderEditor();
