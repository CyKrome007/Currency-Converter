/*
* Author: Owaiz Mustafa Khan
* Alias: CyKrome
* Github: https://github.com/CyKrome007
* Email: OwaizKhan1111@gmail.com
* Date: 14-08-2024
* Time: 21:27PM IST
* */



/*
* Currency API
* Note: This is not the final api endpoint.
* The final API endpoint is further constructed in the code
* */
let base_api = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

/* HTML Web Page Elements Start */
const input = document.querySelector('input');
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#convert-btn");
const switchBtn = document.querySelector("#switch");
const msg = document.querySelector(".msg");
const swap = document.querySelector("i");
/* HTML Web Page Element End */

/* Helper Variables Declaration and Initialization Start */
let fromCurrency = "INR";
let toCurrency = "USD";
let lightMode = true;
/* Helper Variables Declaration and Initialization End */

// Dark Mode and Light mode toggle logic
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

// Adding Event Listeners to Currency Selectors(from and to)
for(let select of dropdowns) {
    select.addEventListener("change", (evt) => {
        updateSelect(evt.target);
    })
}

// Creating options for currency selectors
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

// This Function Updates the Selected Options(value and flag images)
const updateSelect = (target) => {
    if(target.name === 'to'){
        toCurrency = target.value;
    } else {
        fromCurrency = target.value;
    }
    target.parentElement.parentElement.querySelector("img").src = `https://flagsapi.com/${countryList[target.value]}/flat/64.png`;
}

// Currency Swap Button
swap.addEventListener("click", (e) => {
    e.preventDefault();
    if(!swap.classList.contains("swap-anim"))
        swap.classList.add("swap-anim");
    setTimeout(() => {
        swap.classList.remove("swap-anim");
        let newTo = dropdowns[0].value;
        dropdowns[0].value = dropdowns[1].value;
        dropdowns[1].value = newTo;
        updateSelect(dropdowns[0]);
        updateSelect(dropdowns[1]);
        convert().then(() => {
            // console.log('Switch Success');
        });
    }, 700)
})

// Convert Button
btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    await convert();
})

// Conversion
const convert = async () => {
    let json = await (await fetch(`${base_api}${fromCurrency.toLowerCase()}.json`)).json();
    let oneValue = json[fromCurrency.toLowerCase()][toCurrency.toLowerCase()]; // Value
    let userReq = input.value * oneValue;
    msg.innerText = `${input.value} ${fromCurrency} = ${userReq} ${toCurrency}.`;
}
