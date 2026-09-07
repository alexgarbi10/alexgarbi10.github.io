const spot = document.querySelector(".fx-spot");
const note = document.querySelector("[data-note]");
const map = document.querySelector("[data-map]");
const notes = {
  ui: "Interfaces in React — the surface people actually touch.",
  api: "Graphs and services: Federation, resolvers, REST, IVR.",
  data: "Models, indexes, and caches that have to stay consistent.",
  infra: "AWS, Terraform, Docker — the path into production.",
};

if (spot) {
  window.addEventListener(
    "pointermove",
    (event) => {
      spot.style.setProperty("--spot-x", `${event.clientX}px`);
      spot.style.setProperty("--spot-y", `${event.clientY}px`);
    },
    { passive: true }
  );
}

if (map) {
  map.querySelectorAll(".node").forEach((node) => {
    const activate = () => {
      map.querySelectorAll(".node").forEach((item) => item.classList.remove("is-on"));
      node.classList.add("is-on");
      if (note) note.textContent = notes[node.dataset.layer] || notes.ui;
    };

    node.addEventListener("pointerenter", activate);
    node.addEventListener("focus", activate);
  });
}

const links = [...document.querySelectorAll('.shell nav a[href^="#"]')];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
