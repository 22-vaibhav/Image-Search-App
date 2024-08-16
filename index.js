const accessKey = "0qSQh2SQBsHs883K_pI-M8wAAPwRsA3vxiD8KiwOyz8";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function search() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json(); // Ensure to await the JSON parsing

    console.log(data);

    const results = data.results;

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    if (results && results.length > 0) {
      results.forEach((result) => {
        // Use forEach instead of map since we are not using the returned array
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
      });
    }

    page++;
    if (page > 1) {
      showMoreButton.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  search();
});

showMoreButton.addEventListener("click", () => {
  search();
});
