const savedTheme = localStorage.getItem("zima-hub-theme");
if (
  savedTheme &&
  (savedTheme === "obsidian" ||
    savedTheme === "ether" ||
    savedTheme === "lumine")
) {
  document.body.setAttribute("data-theme", savedTheme);
}

const targetUrl = "http://localhost:3001/index.html";
const statusDiv = document.getElementById("status");
let attempts = 0;
const maxAttempts = 20;
let checkInterval;

function redirectToZima() {
  statusDiv.innerHTML =
    '<i class="fas fa-check-circle"></i><span>Serveur prêt ! Redirection... ✨</span>';
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 500);
}

function showError() {
  clearInterval(checkInterval);
  statusDiv.innerHTML =
    '<i class="fas fa-exclamation-triangle"></i><span>Serveur indisponible... (╯°□°)╯</span>';
  setTimeout(() => {
    window.location.href = "file:///home/mishary/Documents/zima";
  }, 2000);
}

function checkServer() {
  fetch(targetUrl, { mode: "no-cors", cache: "no-cache" })
    .then(() => redirectToZima())
    .catch(() => {
      attempts++;
      if (attempts >= maxAttempts) {
        showError();
      } else {
        statusDiv.innerHTML = `<i class="fas fa-spinner fa-pulse"></i><span>Attente du serveur... (${attempts}/${maxAttempts}) ʕ•́ᴥ•̀ʔっ</span>`;
      }
    });
}

setTimeout(() => {
  checkInterval = setInterval(checkServer, 1500);
  checkServer();
}, 2000);
