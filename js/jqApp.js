
$(document).ready(function () {

    let settings = {
        "url": "https://restcountries.eu/rest/v2/all",
        "method": "GET"
    };

    $.ajax(settings).done(function (response) {
        response.forEach(data => {
            $('#select-country').append(`
                         <option value="${data.alpha3Code}">${data.name}</option>`)

        });

        $('#select-country').change(function (e) {
            $.ajax({
                "url": `https://restcountries.eu/rest/v2/alpha/${$(this).val()}`,
                "method": "GET"
            }).done(function (response) {
                $('#info').html(`<div>
                <h2 class="text-warning">Native Name: ${response.name}</h2>
                    <p class="text-warning">Native Name: ${response.nativeName}</p>
                    <p class="text-warning">Capital: ${response.capital}</p>
                    <p class="text-warning">Region: ${response.region}</p>
                    <p class="text-warning">Population: ${response.population}</p>
                    <p class="text-warning">Language: ${response.languages[0].name}</p>
                    <p class="text-warning">Timezone: ${response.timezones}</p>
                </div>`)

                $('#callCode').html(`<div>
                    <p style="font-size: 80px;">${response.callingCodes}</p>
                </div>`)

                $('#flag').html(`<div>
                    <img src="${response.flag}" style="width:285px; height: 327px;">
                </div>`)

                $('#weatherReport').html( `
                        <span>${response.capital} Weather Report</span>
                    `)

                $.ajax({
                    url: `http://api.openweathermap.org/data/2.5/weather?q=${response.capital}&appid=44b1fe8a6c0207544cdd674445971577`,
                    method: 'GET',
                }).done(function (response) {
                    $('#weather').html(`
                      <img src="http://openweathermap.org/img/wn/${
                        response.weather[0].icon
                        }@2x.png">
                      <p>wind speed:${response.wind.speed}</p>
                      <p>temperature: ${response.main.temp}</p>
                      <p>humadity: ${response.main.humidity}</p>
                      <p>visibility: ${response.visibility}</p>`);
                });
            })

        })

        const app = new Mapp({
            element: '#map',
            presets: {
                latlng: {
                    lat: 36,
                    lng: 52,
                },
                zoom: 5,
            },
            apiKey:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVkYjgzMWQyYzczMDJhZjczNmRkYmZjNjA4ZDA4OGI4ZDNjMTZiODhkNzU1YjJmMDJmNGJlMjU1OTlmNDlmMTA4Nzk4M2I0NDE1ZmM4NjcxIn0.eyJhdWQiOiI5NTI0IiwianRpIjoiZWRiODMxZDJjNzMwMmFmNzM2ZGRiZmM2MDhkMDg4YjhkM2MxNmI4OGQ3NTViMmYwMmY0YmUyNTU5OWY0OWYxMDg3OTgzYjQ0MTVmYzg2NzEiLCJpYXQiOjE1OTE0NDI4MjIsIm5iZiI6MTU5MTQ0MjgyMiwiZXhwIjoxNTk0MDM0ODIyLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.fwXH6OSGQo22igxCmGX0eIVbNuaVTpgI6169UizvbUxXv494TzhvCwwKTA84CHaRkS7ID0RO4NhKmvDL7oI8QuosCtRjV9R-6y5T56eQP3z7EKZIH5qlePumiRDyluw8rDa3Pl1qR0HB9GtOFFbHyq4ugR0sFUyClloqYVCFy8g5Ylx0AV53QCpuAnzQANA4CXT1MZNgWOKbR-bnfEJ1HGH7tv6sVjV84TD0j_lF5Qa1H6EvdagmauTRg2Dj5w3cpnWjGyAp54m6iDHTWm16p-wbcHFj7sdL7ZuuhxJ_IR33S-ww_ydtyK2kR3lqTaTzP1osPdddblkuE9w_nyp_WQ',
        });
        app.addLayers();

    })
})