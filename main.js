const h2 = document.querySelector(".h2")
const searchForm = document.querySelector("form");
const searchResult = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = '';
const appID = "636f5378";
const appKey = "ac1b68568afdc7b90cbeb0f7838040bb";




searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI(searchQuery);
})

async function fetchAPI(search) {
    const baseURL = `https://api.edamam.com/search?q=${search}&app_id=${appID}&app_key=${appKey}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits)
    console.log(data.hits)
}

function generateHTML(results) {
    let generatedHTML = ``;
    if (results.length == "0") {
        h2.classList.add("display")
    } else {
        container.classList.remove("initial")
        results.map(result => {
            generatedHTML += `
<div class="item">
<img src="${result.recipe.image}" alt="">
<div class="flex-container">
    <h1 class="title">${result.recipe.label}</h1>
    <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
</div>
<p class="item-data">Calories: ${result.recipe.calories.toFixed(2)} </p>
<p class="item-data">DietLabels: ${result.recipe.dietLabels.length ? result.recipe.dietLabels : "No Data Found"} </p>
<p class="item-data">HealthLabels: ${result.recipe.healthLabels.length ? result.recipe.healthLabels : "No Data Found"} </p>
</div>
`
        })
        searchResult.innerHTML = generatedHTML
    }

}

