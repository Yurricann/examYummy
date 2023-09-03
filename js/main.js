// Meals
let currentData = document.getElementById("currentData")
let searchContainer = document.getElementById("searchContainer")

let areas = [];
let ingredients = [];
let categories = [];
let meals = [];
let currMeal = [];

// outterLoading
$(document).ready(function(){
    $("#outterLoading").fadeOut(500);
})


// Area
async function getAreas(){
    let location = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    location = await location.json()
    areas = location.meals;
}
getAreas()

$("#area").click(function(){
    $("#innerLoading").fadeIn(0);
    searchContainer.innerHTML = ``
    let cartona = ``;
    for(let i = 0; i < areas.length ; i++){
        cartona += `
                    <div class="col-md-3">
                        <div class="text-center pointer" onclick="onArea('${areas[i].strArea}')">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${areas[i].strArea}</h3>
                        </div>
                    </div>
        `
    }
    $("#innerLoading").fadeOut(300);
    currentData.innerHTML = cartona;
    closeNav()
})

// Ingredients
async function getIngredients(){
    let ingr = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    ingr = await ingr.json()
    ingredients = ingr.meals;
}
getIngredients()

$("#ingre").click(function(){
    $("#innerLoading").fadeIn(0);
    searchContainer.innerHTML = ``
    let cartona = ``;
    for(let i = 0; i < 20 ; i++){
        cartona += `
                <div class="col-md-3">
                    <div class="text-center pointer" onclick="onIngred('${ingredients[i].strIngredient}')">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredients[i].strIngredient}</h3>
                        <p>${ingredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `
    }
    $("#innerLoading").fadeOut(300);
    currentData.innerHTML = cartona;
    closeNav()
})

// Categories
async function getCategories(){
    let categ = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    categ = await categ.json()
    categories = categ.categories;
}
getCategories()

$("#categ").click(function(){
    $("#innerLoading").fadeIn(0);
    searchContainer.innerHTML = ``
    let cartona = ``;
    for(let i = 0; i < categories.length ; i++){
        cartona += `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div class="meals-ingred position-relative overflow-hidden rounded-2 pointer" onclick="onCategory('${categories[i].strCategory}')";>
                    <img class="w-100" src="${categories[i].strCategoryThumb}" alt="${categories[i].strCategory}">
                    <div class="description position-absolute p-2">
                        <h3>${categories[i].strCategory}</h3>
                        <p>${categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        `
    }
    $("#innerLoading").fadeOut(300);
    currentData.innerHTML = cartona;
    closeNav()
})

// Display Search
$("#srch").click(function(){
    $("#innerLoading").fadeIn(0);
    searchContainer.innerHTML = `
                <div class="row py-4">
                    <div class="col-md-6">
                        <input type="text" id="searchName" onkeyup="onSeachByN(this.value)" placeholder="Search by name" class="form-control bg-transparent text-white">
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="searchFirstLetter" onkeyup="onSeachByF(this.value)" maxlength="1" placeholder="Search by first letter" class="form-control bg-transparent text-white">
                    </div>
                </div>
    `
    $("#innerLoading").fadeOut(300);
    currentData.innerHTML = ``
    closeNav()
})


// Display Contact us
$("#contactUS").click(function(){
    searchContainer.innerHTML = ``
    $("#innerLoading").fadeIn(0);
    currentData.innerHTML = `
    <div class="contactUs min-vh-100 d-flex align-items-center justify-content-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="checkName(this.value)" type="text" placeholder="Enter your name" class="form-control">
                <div id="nameHint" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="checkMail(this.value)" type="email" placeholder="Enter your email" class="form-control">
                <div id="emailHint" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="checkPhone(this.value)" type="text" placeholder="Enter your phone" class="form-control">
                <div id="phoneHint" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number ex (01111111111) or (009711111111) or (+965 11111111)
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="checkAge(this.value)" type="number" placeholder="Enter your age" class="form-control">
                <div id="ageHint" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passInput" onkeyup="checkPassword(this.value)" type="password" placeholder="Enter your password" class="form-control">
                <div id="passHint" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repassInput" onkeyup="rePass(this.value)" type="password" placeholder="Re-enter your password" class="form-control">
                <div id="checkSecodnPassword" class="alert alert-danger w-100 mt-2 d-none">
                    Passwords aren't matching
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
    `
    $("#innerLoading").fadeOut(300);
    closeNav()
})

// Getting meals Meals
async function getMeals(example = ""){
    let allMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${example}`)
    allMeals = await allMeals.json()
    let check = allMeals.meals;
    check ? meals = allMeals.meals : meals = [];
    
}

// Display General meals
function displayMeals(currentMeals){
    $("#innerLoading").fadeIn(0);
    cartona = ``
    for(let i = 0; i < currentMeals.length ; i++){
            cartona += `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div class="meals-landing position-relative overflow-hidden rounded-2" onclick="getMealDetails(${currentMeals[i].idMeal})">
                    <img class="w-100" src="${currentMeals[i].strMealThumb}" alt="${currentMeals[i].strMeal}">
                    <div class="description position-absolute p-2">
                    <h3>${currentMeals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            
            `

    }
    $("#innerLoading").fadeOut(300);
    currentData.innerHTML = cartona;
}
async function displayAllMeals(){
    await getMeals()
    displayMeals(meals)

}
displayAllMeals()

// Filter Seach
function onSeachByN(word){
    async function searchMeals(){
        await getMeals(word)
        displayMeals(meals)
    }
    searchMeals()
}

async function searchFirst(example){
    let allMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${example ? example : "a"}`)
    allMeals = await allMeals.json()
    let check = allMeals.meals;
    check ? meals = allMeals.meals : meals = [];
}

function onSeachByF(letter){ 
    let charc = letter;
    async function searchByLetter(){
        await searchFirst(charc)
        displayMeals(meals)
    }
    searchByLetter()
 }


//  Filter By Categories
function onCategory(word){
    async function filterCateg(){
        let allMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${word}`)
        allMeals = await allMeals.json()
        meals = allMeals.meals;
    }
    async function displyCate(){
        await filterCateg()
        displayMeals(meals.slice(0,20))
    }
    displyCate()
}

//  Filter By Area
function onArea(word){
    async function filterArea(){
        let allMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${word}`)
        allMeals = await allMeals.json()
        meals = allMeals.meals;
    }
    async function displayAre(){
        await filterArea()
        displayMeals(meals.slice(0,20))
    }
    displayAre()
}

//  Filter By Ingredients
function onIngred(word){
    async function filterIngred(){
        let allMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${word}`)
        allMeals = await allMeals.json()
        meals = allMeals.meals;
    }
    async function displayIngr(){
        await filterIngred()
        displayMeals(meals.slice(0,20))
    }
    displayIngr()
}

// displayMealDetails
function displayDetails(){
    $("#innerLoading").fadeIn(0);
    searchContainer.innerHTML = ``;
    let details = ``
    for(let i = 1; i <= 20; i++){
        if(currMeal[`strIngredient${i}`] != "" && currMeal[`strIngredient${i}`] != null){
           details += `
            <li class="alert alert-info m-2 p-2">${currMeal[`strMeasure${i}`]} ${currMeal[`strIngredient${i}`]}</li>
           `
        }
        
    }
    let tags = ``
    if(currMeal.strTags != "" && currMeal.strTags != null){
        let currentTags = currMeal.strTags.split(", ")

        for(let i = 0; i<currentTags.length; i++){
            tags += `<li class="alert alert-danger m-2 p-1">${currentTags[i]}</li>`
        }
    }

    let cartona = `
            <div class="col-md-12 col-lg-4">
                <img src="${currMeal.strMealThumb}" alt="${currMeal.strMeal}" class="w-100 mb-2">
                <h2>${currMeal.strMeal}</h2>
            </div>
            <div class="col-md-12 col-lg-8">
                <h2>Instructions</h2>
                <p>${currMeal.strInstructions}</p>
                <h3>Area : ${currMeal.strArea}</h3>
                <h3>Category : ${currMeal.strCategory}</h3>
                <h3>Recipes : </h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${details}
                </ul>
                <h3 class="mb-4">Tags: </h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap"> 
                    ${tags}
                </ul>
                <button class="btn btn-success"><a href="${currMeal.strSource}" target="_blank" class="text-decoration-none text-light">Source</a></button>
                <button class="btn btn-danger"><a href="${currMeal.strYoutube}" target="_blank" class="text-decoration-none text-light">Youtube</a></button>
            </div>
        
        `
        $("#innerLoading").fadeOut(300);
        currentData.innerHTML = cartona;
}

function getMealDetails(id) {
    async function getDetails(){
        let allMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        allMeals = await allMeals.json()
        currMeal = allMeals.meals[0];
    }
    async function displayCurMeal(){
        await getDetails()
        displayDetails()
    }
    displayCurMeal()
}


// sideNav

function openNav(){
    $("nav").animate({left: '0'},500)
    $("#menuIcon").removeClass("fa-align-justify");
    $("#menuIcon").addClass("fa-x");
    
    let numberOfLists = document.querySelectorAll(".list-unstyled li").length;

    for(let x = 0; x <= numberOfLists ; x++){
        $(`.liAnimation:nth-of-type(${x})`).animate({top:"0"}, (200 * (x+1)))
    }
}

function closeNav(){
    let boxSize = $(".navContent").outerWidth();
    $("nav").animate({left: -boxSize},500)
    $("#menuIcon").addClass("fa-align-justify");
    $("#menuIcon").removeClass("fa-x");
        
    let numberOfLists = document.querySelectorAll(".list-unstyled li").length;
    
    for(let x = 0; x <= numberOfLists ; x++){
        $(`.liAnimation:nth-of-type(${x})`).animate({top:"300"}, (200 * (x+1)))
    }
        
}

closeNav()

$("#menuIcon").click(function (){
    if($("nav").css("left") == "0px"){
        closeNav()
    } else {
        openNav()
    }
})


// Contact Validation

let nameRegEx = /^(\w+)$/
let validName = false;

let emailRegEx = /^[\w\-\.]+@([\w-]+\.)+[\w\-]{2,4}$/
let validEmail = false;

let phoneRegEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{10,}$/
let validPhone = false;

let ageRegEx = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
let validAge = false;

let passRegEx = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
let validPass = false;

let password = ""
let validRePass = false

function checkStatuss(){
    if(validName && validEmail && validPhone && validAge && passRegEx && validRePass){
        $("#submitBtn").removeAttr('disabled');
    } else{
        $("#submitBtn").attr('disabled','disabled')
    }
}

function checkName(name){
    if(nameRegEx.test(name)){
        $("#nameHint").addClass("d-none")
        $("#nameHint").removeClass("d-block")
        validName = true;
    } else{
        $("#nameHint").addClass("d-block")
        $("#nameHint").removeClass("d-none")
        validName = false;
    }
    checkStatuss()
}

function checkMail(mail){
    if(emailRegEx.test(mail)){
        $("#emailHint").addClass("d-none")
        $("#emailHint").removeClass("d-block")
        validEmail = true;
    } else{
        $("#emailHint").addClass("d-block")
        $("#emailHint").removeClass("d-none")
        validEmail = false;
    }
    checkStatuss()
}

function checkPhone(phone){
    if(phoneRegEx.test(phone)){
        $("#phoneHint").addClass("d-none")
        $("#phoneHint").removeClass("d-block")
        validPhone = true;
    } else{
        $("#phoneHint").addClass("d-block")
        $("#phoneHint").removeClass("d-none")
        validPhone = false;
    }
    checkStatuss()
}

function checkAge(age){
    if(ageRegEx.test(age)){
        $("#ageHint").addClass("d-none")
        $("#ageHint").removeClass("d-block")
        validAge = true;
    } else{
        $("#ageHint").addClass("d-block")
        $("#ageHint").removeClass("d-none")
        validAge = false;
    }
    checkStatuss()
}

function checkPassword(pass){
    if(passRegEx.test(pass)){
        $("#passHint").addClass("d-none")
        $("#passHint").removeClass("d-block")
        password = pass;
        validPass = true;
    } else{
        $("#passHint").addClass("d-block")
        $("#passHint").removeClass("d-none")
        validPass = false;
    }
}

function rePass(pass){
    if(pass == password){
        $("#checkSecodnPassword").addClass("d-none")
        $("#checkSecodnPassword").removeClass("d-block")
        validRePass = true;
    } else{
        $("#checkSecodnPassword").addClass("d-block")
        $("#checkSecodnPassword").removeClass("d-none")
        validRePass = false;
    }
    checkStatuss()
}

