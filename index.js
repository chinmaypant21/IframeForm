const formResult = document.getElementById('form-result')

var validators = {
    "validators": [
        {
            "field": "email",
            "validator": [{ "type": "email" }]
        },
        {
            "field": "phone",
            "validator": [{ "type": "tel" }]
        },
        {
            "field": "country",
            "validator": [{ "required": true }]
        },
        {
            "field": "state",
            "validator": [{ "required": true }]
        },
        {
            "field": "name",
            "validator": [{ "required": true }]
            // { "minLength": 4 },
            // { "maxLength": 10 }
        }
    ]
};

function validateForm(form, validators) {
    validators.validators.forEach((val) => {
        let selector = `[name="${val.field}"]`;
        let field = form.querySelector(selector);

        val.validator.forEach((valType) => {
            let key = Object.keys(valType)[0];
            field[key] = valType[key];
        })
    })
}

window.addEventListener('message', function (e) {
    try{
        const data = JSON.parse(e.data);
        if (data.sender === 'form-iframe'){
            formResult.innerHTML = data.message
        }
    }
    catch{

    }
});

window.addEventListener('load', ()=>{
    const iframe = document.querySelector('iframe')
    const frameForm = iframe.contentDocument.querySelector('form')
    validateForm(frameForm,validators)    
})