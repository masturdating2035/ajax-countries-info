const form = document.querySelector('#form')
form.addEventListener('submit', getReq)

function getReq(e) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://restcountries.eu/rest/v2/all');

    xhr.onload = function () {
        if (this.status === 200) {
            const res = JSON.parse(this.responseText)
            document.getElementById('select-country').children[0].remove();
            res.forEach(data => {
                let option = document.createElement('option');
                option.value = data.alpha3Code;
                option.innerText = data.name;
                document.getElementById('select-country').appendChild(option)
            })

        }
    }
    xhr.send();
}