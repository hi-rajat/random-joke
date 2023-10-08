const JOKES_API_URL = "https://official-joke-api.appspot.com/jokes/random";
const CONTENT_TIME_VALUE = 3000;

const loader = document.querySelector(".loader");
const setupElement = document.querySelector(".setup");
const punchlineElement = document.querySelector(".puchline");
const reloadElement = document.querySelector(".reload");

reloadElement.addEventListener("click", () => {
  getJoke();
});

const hideLoader = () => {
  loader.classList.add("hidden");
  if (setupElement.classList.contains("hidden")) {
    setupElement.classList.remove("hidden");
  }
  if (punchlineElement.classList.contains("hidden")) {
    punchlineElement.classList.remove("hidden");
  }
};

const showLoader = () => {
  setupElement.classList.add("hidden");
  punchlineElement.classList.add("hidden");
  reloadElement.classList.add("hidden");
  if (loader.classList.contains("hidden")) {
    loader.classList.remove("hidden");
  }
};

const getJoke = async () => {
  showLoader();
  setupElement.innerHTML = "";
  punchlineElement.innerHTML = "";
  const res = await fetch(JOKES_API_URL);
  const { setup, punchline } = await res.json();
  const setupInnerHTML = `<p class="setupCaret">${setup}</p>`;
  const punchlineInnerHTML = `<p style="margin-top: 1rem;">${punchline}</p>`;
  setupElement.innerHTML = setupInnerHTML;
  setTimeout(() => {
    document.querySelector(".setupCaret").style.borderRight = 0;
    punchlineElement.innerHTML = punchlineInnerHTML;
  }, CONTENT_TIME_VALUE * 2);
  setTimeout(() => {
    if (reloadElement.classList.contains("hidden")) {
      reloadElement.classList.remove("hidden");
    }
  }, CONTENT_TIME_VALUE * 3);

  hideLoader();
};

window.onload = () => {
  getJoke();
};
