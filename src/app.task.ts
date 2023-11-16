import { Controller, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import location from './weather/script/data/lat_lon_location.json';
import fetch from 'node-fetch';
import { WeatherService } from './weather/weather.service';
import { ConfigService } from '@nestjs/config';
import { delay } from 'rxjs';

const env = process.env;
@Controller()
export class AppTask implements OnModuleInit {
  constructor(
    private readonly weather: WeatherService,
    private config: ConfigService,
  ) {}

  @Cron('30 17 * * *') // call Weather Forecast API when 00h30 every day
  async handleCron1() {
    console.log('Cron task');
    await this.forecastWeather();
  }

  @Cron('0 * * * *') // call update current weather API every hour
  async handleCron2() {
    await this.updateCurrentWeather();
  }

  async onModuleInit() {
    await this.updateCurrentWeather();
  }
  async forecastWeather() {
    console.log('Importing forecast data');
    for (let i = 0; i < location.length; i++) {
      //call API get weather of next 5 day with a 3-hour step
      const beginUrl = 'http://api.openweathermap.org/data/2.5/forecast?';
      const lat = location[i].latitude;
      const lon = location[i].longitude;
      const endUrl = '&lang=vi&appid=' + env.API_KEY1;
      const urlLink = beginUrl + 'lat=' + lat + '&lon=' + lon + endUrl;
      const url = new URL(urlLink);
      const data = await fetch(url, {
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
      // check the records in database and update or create
      for (let j = 0; j < data.list.length; j++) {
        const tmp_data = data.list[j];
        const check = await this.weather.find(location[i].code, tmp_data.dt);
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
            dtTxt: tmp_data.dt_txt,
            sys: null,
          },
        };
        if (check == null) {
          //console.log('Created');
          this.weather.create(tmp);
        } else {
          //console.log('Updated');
          this.weather.update(location[i].code, tmp_data.dt, tmp);
        }
      }
    }
    console.log('Done');
  }
  async updateCurrentWeather() {
    console.log('Updating Current Weather');
    for (let i = 0; i < location.length; i++) {
      await delay(1000);
      const beginUrl = 'https://api.openweathermap.org/data/2.5/weather?';
      const lat = location[i].latitude;
      const lon = location[i].longitude;
      const endUrl = '&lang=vi&appid=' + env.API_KEY2;
      const urlLink = beginUrl + 'lat=' + lat + '&lon=' + lon + endUrl;
      const url = new URL(urlLink);
      const data = await fetch(url, {
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

      // edit time
      const currentDate = Date.now() / 1000;
      const edittedTime = currentDate - (currentDate % 3600);
      const check = await this.weather.find(location[i].code, edittedTime); //  check exist record in database
      const tmp = {
        code: location[i].code,
        time: edittedTime,
        data: {
          main: {
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            pressure: data.main.pressure,
            seaLevel: data.main.sea_level,
            grndLevel: data.main.grnd_level,
            humidity: data.main.humidity,
            tempKf: data.main.temp_kf,
          },
          weather: {
            id: data.weather[0].id,
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          },

          clouds: {
            all: data.clouds.all,
          },
          wind: {
            speed: data.wind.speed,
            deg: data.wind.deg,
            gust: data.wind.gust,
          },
          visibility: data.visibility,
          pop: null,
          dtTxt: null,
          sys: null,
        },
      };
      if (check == null) {
        //console.log('Created');
        this.weather.create(tmp);
      } else {
        //console.log('Updated');
        this.weather.update(location[i].code, edittedTime, tmp);
      }
      //console.log('Done' + i);
    }
    console.log('Done');
  }
}
