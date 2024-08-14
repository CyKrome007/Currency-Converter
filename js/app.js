// Currency API
let base_api = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const input = document.querySelector('input');
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#convert-btn");
const switchBtn = document.querySelector("#switch");
const msg = document.querySelector(".msg");
const swap = document.querySelector("i");

let fromCurrency = "INR";
let toCurrency = "USD";
let lightMode = true;

switchBtn.addEventListener("click", () => {
    if(lightMode){
        for(let element of document.querySelectorAll('.light')){
            element.classList.remove("light");
            element.classList.add("dark");
        }
        for(let element of document.querySelectorAll('.light-nobg')){
            element.classList.remove("light-nobg");
            element.classList.add("dark-nobg");
        }
        for(let element of document.querySelectorAll('.light-border')){
            element.classList.remove("light-border");
            element.classList.add("dark-border");
        }
        switchBtn.classList.add('fa-sun')
        switchBtn.classList.remove('fa-moon')
        lightMode = false;
    } else {
        for(let element of document.querySelectorAll('.dark')){
            element.classList.remove("dark");
            element.classList.add("light");
        }
        for(let element of document.querySelectorAll('.dark-nobg')){
            element.classList.remove("dark-nobg");
            element.classList.add("light-nobg");
        }
        for(let element of document.querySelectorAll('.dark-border')){
            element.classList.remove("dark-border");
            element.classList.add("light-border");
        }
        switchBtn.classList.add('fa-moon')
        switchBtn.classList.remove('fa-sun')
        lightMode = true;
    }

})

for(let select of dropdowns) {
    select.addEventListener("change", (evt) => {
        updateSelect(evt.target);
    })
}
for(let select of dropdowns) {
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(currCode === "INR" && select.name === "from"){
            newOption.selected = true;
            fromCurrency = newOption.value;
        } else if(currCode === "USD" && select.name === "to"){
            newOption.selected = true;
            toCurrency = newOption.value;
        }
        select.append(newOption);
    }
}

swap.addEventListener("click", (e) => {
    if(!swap.classList.contains("swap-anim"))
        swap.classList.add("swap-anim");
    setTimeout(() => {
        swap.classList.remove("swap-anim");
        let newTo = dropdowns[0].value;
        dropdowns[0].value = dropdowns[1].value;
        dropdowns[1].value = newTo;
        updateSelect(dropdowns[0]);
        updateSelect(dropdowns[1]);
        convert();
    }, 700)
})

btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
})

const convert = async () => {
    let json = await (await fetch(`${base_api}${fromCurrency.toLowerCase()}.json`)).json();
    let oneValue = json[fromCurrency.toLowerCase()][toCurrency.toLowerCase()]; // Value
    let userReq = input.value * oneValue;
    msg.innerText = `${input.value} ${fromCurrency} = ${userReq} ${toCurrency}.`;
}

const updateSelect = (target) => {
    if(target.name === 'to'){
        toCurrency = target.value;
    } else {
        fromCurrency = target.value;
    }
    target.parentElement.parentElement.querySelector("img").src = `https://flagsapi.com/${countryList[target.value]}/flat/64.png`;
}
