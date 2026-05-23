const body = document.body;
const btns = document.querySelectorAll(".theme-btn");
let isTransitioning = false;

function setTheme(theme) {
  if (isTransitioning) return;

  isTransitioning = true;

  body.setAttribute("data-theme", theme);

  btns.forEach((btn) => {
    if (btn.getAttribute("data-theme-value") === theme) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  localStorage.setItem("zima-hub-theme", theme);

  setTimeout(() => {
    isTransitioning = false;
  }, 600);
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.getAttribute("data-theme-value");
    if (!isTransitioning) {
      setTheme(theme);
    }
  });
});

const savedTheme = localStorage.getItem("zima-hub-theme");
if (
  savedTheme &&
  (savedTheme === "obsidian" ||
    savedTheme === "ether" ||
    savedTheme === "lumine")
) {
  setTheme(savedTheme);
}

document.getElementById("altaria-btn")?.addEventListener("click", function () {
  window.location.href = "prismlauncher://";
});
