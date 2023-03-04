

// Functions on init

importDependencies()
wrapperFunction("phoneNumber")
let prefixDefault = "+421" // Default prefix for the form


// Import dependency files

function importDependencies() {
    // Encode ID of the style
    let styleName = "countrycode-tel.css"
    //  let encodedStyleName = window.btoa(styleName) // Encode string returns error

    if (!document.getElementById("Y291bnRyeWNvZGUtdGVsLmNzcw==")) {
        // Get HTML head element
        var head = document.getElementsByTagName('HEAD')[0];
        // Link Styles
        var link = document.createElement('link');
        link.id = "Y291bnRyeWNvZGUtdGVsLmNzcw==";
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://brobertovice.web.app/countrycode-tel.css';
        // Append link element to HTML head
        head.appendChild(link);
    }
}

//Build component based on input ID

function wrapperFunction(elementID) {
    document.getElementById("phoneNumber").outerHTML =
        `<div id="wrapper">
                <div id="phoneInputWrapper">
                    <span id ="flag-button" onClick="">
                    <span id="flagiska" class="fi fi-sk"></span>
                        <img src="https://brobertovice.web.app/img/arrow.svg" width="7px" style="margin-left: 5px; margin-right: 7px;">
                     </span>`
        + document.getElementById(elementID).outerHTML +
        `</div>
                <div id="tabulka" class=""></div>
            </div>`
}

// Fetch countries

let dropdownElements

function generateDropdownCoutries() {
    document.getElementById('tabulka').innerHTML = countries.map(function (country) {
        return `
                <div class="dropdown-item" data-attribute="${country.code.toLowerCase()}" data-dial="${country.dial_code}">
                    <span class="fi fi-${country.code.toLowerCase()}"></span>
                    <span class="country-name">${country.name}</span>
                    <span class="country-code">${country.dial_code}</span>
                </div>
            `;
    }).join('')
    dropdownElements = document.querySelectorAll(".dropdown-item")
    selectingDropdownElements()
}

// Format Number

let size
window.onload = (event) => {
    document.getElementById("phoneNumber").value = prefixDefault
};

let lenght = 4
function phoneFormat(input) {
    input = input.replace(/\s/g, ''); //include + into regex all exept digits

    let obj = countries.find(o => o.dial_code === input);
    if (obj !== undefined) {
        lenght = obj.dial_code.length
        document.getElementById("flagiska").classList = "fi fi-" + obj.code.toLowerCase()
        console.log(obj.code.toLowerCase())
        prefixDefault = obj.dial_code
    } else {

    }
    // Check this for bug with formatting
    size = input.length;
    if (size > lenght) { input = input.slice(0, lenght) + " " + input.slice(lenght, 14) } else { }
    if (size > lenght + 4) { input = input.slice(0, lenght + 4) + " " + input.slice(lenght + 4, lenght + 14) } else { }
    if (size > lenght + 8) { input = input.slice(0, lenght + 8) + " " + input.slice(lenght + 8, lenght + 14) } else { }
    return input;
}

// Dropdown button trigger

const specifiedElement = document.getElementById("tabulka")  // Dropdown define wrapper

document.getElementById('flag-button').addEventListener("click", () => {
    specifiedElement.classList.toggle("open");
    generateDropdownCoutries()
})

// Click outside of the dropdown

document.addEventListener('click', event => {
    const isClickInside = document.getElementById("tabulka").contains(event.target)
    const isClickInsideButton = document.getElementById("flag-button").contains(event.target)
    // const isClickInsideField = document.getElementById("phoneNumber").contains(event.target)

    if (!isClickInside && !isClickInsideButton) {
        document.getElementById("tabulka").classList.remove("open")
    }
})

// Select a dropdown item and add its value

function selectingDropdownElements() {
    dropdownElements.forEach(item => {
        item.addEventListener("click", () => {

            let prevPrefix = prefixDefault
            let prefix = item.dataset.dial;
            let phoneField = document.getElementById("phoneNumber")

            phoneField.value = phoneField.value.replace(prevPrefix, prefix)
            prefixDefault = prefix

            // If phone number prefix is disrupted or empty
            if (phoneField.value.length < prefixDefault.length) { phoneField.value = prefix } else { }

            // Phone number format after selected trigger function for reevaluation
            lenght = prefix.length
            phoneFormat(phoneField.value)

            specifiedElement.classList.remove("open")
            document.getElementById("flagiska").classList = 'fi fi-' + item.dataset.attribute.toLowerCase()
        })
    });
}

