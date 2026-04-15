document.querySelectorAll(".reveal").forEach((el) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  observer.observe(el);
});

if (document.getElementById("performanceChart")) {
  const ctx = document.getElementById("performanceChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Detection Accuracy %",
          data: [91, 93, 95, 96, 97, 98],
          borderColor: "#00e7ff",
          backgroundColor: "rgba(0, 231, 255, 0.2)",
          tension: 0.35,
          fill: true
        },
        {
          label: "Response Time (ms)",
          data: [420, 390, 340, 320, 300, 280],
          borderColor: "#ff6b35",
          backgroundColor: "rgba(255, 107, 53, 0.12)",
          tension: 0.35,
          fill: true
        },
        {
          label: "Threat Alerts",
          data: [120, 165, 210, 250, 275, 305],
          borderColor: "#2f7cff",
          backgroundColor: "rgba(47, 124, 255, 0.12)",
          tension: 0.35,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "#e8eefc" } } },
      scales: {
        x: { ticks: { color: "#c9d3e8" }, grid: { color: "rgba(120,140,180,.15)" } },
        y: { ticks: { color: "#c9d3e8" }, grid: { color: "rgba(120,140,180,.15)" } }
      }
    }
  });
}

const watchDemoBtn = document.getElementById("watchDemoBtn");
const videoModal = document.getElementById("videoModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const demoFrame = document.getElementById("demoFrame");
const modalCloseTargets = document.querySelectorAll("[data-close-modal]");
const demoEmbedUrl = "https://www.youtube-nocookie.com/embed/VbIKuZllP_g?autoplay=1";

const closeVideoModal = () => {
  if (!videoModal || !demoFrame) return;
  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");
  demoFrame.src = "";
};

if (watchDemoBtn && videoModal && demoFrame) {
  watchDemoBtn.addEventListener("click", () => {
    videoModal.classList.add("open");
    videoModal.setAttribute("aria-hidden", "false");
    demoFrame.src = demoEmbedUrl;
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeVideoModal);
}

modalCloseTargets.forEach((target) => {
  target.addEventListener("click", closeVideoModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeVideoModal();
});
