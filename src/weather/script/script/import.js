/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');

const location = require('../data/lat_lon_location.json');

export async function importData() {
  for (let i = 0; i < 1; i++) {
    var beginUrl = 'http://api.openweathermap.org/data/2.5/forecast?';
    var lat = location[i].latitude;
    var lon = location[i].longitude;
    var endUrl = '&lang=vi&appid=a69681889c4ce860366328b37f9d8f21';
    var urlLink = beginUrl + 'lat=' + lat + '&lon=' + lon + endUrl;
    var url = new URL(urlLink);
    var data = await fetch(url, {
      method: 'Get',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((response) => {
          throw new Error(response.error + ' Message: ' + response.message);
        });
      })
      .catch(function (error) {
        console.log('Error at element: ' + i);
        console.error(error);
      });

    for (var j = 0; j < 16; j++) {
      var tmp_data = data.list[j];
      const tmp = {
        code: location[i].code,
        time: tmp_data.dt,
        data: {
          main: {
            temp: tmp_data.main.temp,
            feelsLike: tmp_data.main.feels_like,
            tempMin: tmp_data.main.temp_min,
            tempMax: tmp_data.main.temp_max,
            pressure: tmp_data.main.pressure,
            seaLevel: tmp_data.main.sea_level,
            grndLevel: tmp_data.main.grnd_level,
            humidity: tmp_data.main.humidity,
            tempKf: tmp_data.main.temp_kf,
          },
          weather: {
            id: tmp_data.weather[0].id,
            main: tmp_data.weather[0].main,
            description: tmp_data.weather[0].description,
            icon: tmp_data.weather[0].icon,
          },

          clouds: {
            all: tmp_data.clouds.all,
          },
          wind: {
            speed: tmp_data.wind.speed,
            deg: tmp_data.wind.deg,
            gust: tmp_data.wind.gust,
          },
          visibility: tmp_data.visibility,
          pop: tmp_data.pop,
          // rain: {
          //   oneHour: tmp_data.rain.'1h',
          // },
          // sys: {
          //   pod: tmp_data.sys.pod,
          // },
          dtTxt: tmp_data.dt_txt,
        },
      };
      await fetch('http://localhost:3000/weather', {
        method: 'POST',
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwMTQ0NTM1NDU1IiwiaWQiOiI2MmYyMDY1OWQ2OTJlNGMzMGU4OGRiNjUiLCJpYXQiOjE2NjAwMjg1MDUsImV4cCI6MTY2MDAyODU2NSwiYWRtaW4iOnRydWV9.B4jYwLeli40QjcXl7n6HTrH3cIAAY9b00w0CmjYWTOA',
          Accept: '*/*',
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          'device-token': 'device_token',
        },

        body: JSON.stringify(tmp),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((response) => {
            throw new Error(response.error + ' Message: ' + response.message);
          });
        })
        .catch(function (error) {
          console.log('Error at element: ' + i);
          console.error(error);
        });
    }
  }
}
importData();
