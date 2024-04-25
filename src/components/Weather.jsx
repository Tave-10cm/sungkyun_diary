import axios from 'axios';
import { useEffect, useState } from 'react';
import weatherDescKo from './WeatherDesc';
import styled from "styled-components";
import { getWeatherImage } from '../util/get-weather-imgages';
import weather1 from "./../assets/weather/weather1.jpg";


const Weather = () => {
  const API_KEY = import.meta.env.VITE_AXIOS_WEATHER_KEY
  const [weather, setWeather] = useState({
    weatherId : 0,
    description:"",
    name:"",
    temp:0,
  });


  useEffect(() =>{
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log(lat, lon)
      getWeather(lat, lon);

    }, (error)=>{
      console.error('Error getting user location : ', error);
    });
  }, [])
  const getWeather = async(lat, lon) => {
    try{
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      console.log("현재 날씨입니다.", res);
      // id찾아서 매칭 후 description 한글 번역본 가져오기
      const weatherId = res.data.weather[0].id;
      const locName = res.data.name;
      const weatherKo = weatherDescKo.find(
        (item) => String(item.weatherId) === String(weatherId)
    );
      // 소수점 버리기
      const temp = (res.data.main.temp - 273.15).toFixed(1)


      setWeather({
        weatherId : weatherId,
        description: weatherKo.content,
        name: locName,
        temp: temp,
      });
    } catch(err){
      console.error(err);
    }
  }

  const Wrapper = styled.div`
    background-color : white;
    font-size : 20px;
    background-image : url(${getWeatherImage(weather.weatherId)});
    height : 130px;
    width : 100%;
    border : 3px solid rgb(236, 236, 236);
    border-radius : 10px;
    background-size : 100% 150px;
  `
  const Info = styled.p`
    color : rgb(255, 255, 255);
    font-family : BMHANNAPro;
    src : ${"./../public/BMHANNAPro.ttf"};
    text-align : center;
    font-weight : bold;
    margin-top : 70px;
    height : 10px;
  `

  const Temp = styled.p`
  color : rgb(255, 255, 255);
  font-family : BMHANNAPro;
  src : ${"./../public/BMHANNAPro.ttf"};
  text-align : center;
  font-weight : bold;
  `

    return (
      <Wrapper>
        <Info>{weather.name}의 날씨 : {weather.description}</Info>
        <Temp>현재 온도 : {weather.temp} °C </Temp>
      </Wrapper>
    );

};

export default Weather;