async function populateCountries(countrySelector) {
    const result = await fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')
    const jsonResult = await result.json()
    // console.log(res)
    jsonResult.forEach(country => {
        const option = document.createElement("option");
        option.value = country.code3
        option.textContent = country.name
        countrySelector.appendChild(option)
    })
    return jsonResult
}

function populateState(countriesJson, countryID, stateSelector) {
    stateSelector.innerHTML = '';
    const country = countriesJson.find((country) => {
        return country.code3 === countryID
    })


    country.states.forEach(state => {
        const option = document.createElement("option");
        option.value = state.code
        option.textContent = state.name
        stateSelector.appendChild(option)
    })
}


function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

function validatePhone(contact){
    if( contact.length === 0 || /^\d{10}$/.test(contact)){
        return true
    }
    return false
}

function formSubmit(formEvent) {
    let msgVal = ''

    const name = formEvent.currentTarget.name.value
    const email = formEvent.currentTarget.email.value
    const contact = formEvent.currentTarget.phone.value

    if (name.length < 4 || name.length > 10) {
        msgVal = { "Name": { "error": "length should be between 4-10 characters" } }
    }

    else if (!validatePhone(contact)) {
        msgVal = { "Phone": { "error": "should be a valid 10 digit phone number" } }
    }

    else if (!validateEmail(email)) {
        msgVal = { "Email": { "error": "should be a valid email address" } }
    }

    else{
        msgVal = { "Success": "All fields are valid" }
    }

    const message = JSON.stringify({
        message:  `Result: ${JSON.stringify(msgVal)}`,
        sender: 'form-iframe'
    });

    window.parent.postMessage(message, '*');
}

window.addEventListener("load", () => {
    var form = document.querySelector('form');
    var countrySelector = form.querySelector('[name="country"]')
    var stateSelector = form.querySelector('[name="state"]')
    var countriesJson;

    populateCountries(countrySelector).then(e => {
        countriesJson = e
    })

    form.onsubmit = formSubmit;
    countrySelector.addEventListener('click', (e) => {
        populateState(countriesJson, e.target.value, stateSelector)
    })
})

