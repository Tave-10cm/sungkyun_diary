import weather1 from "./../assets/weather/weather1.jpg";
import weather2 from "./../assets/weather/weather2.jpg";
import weather3 from "./../assets/weather/weather3.jpg";
import weather4 from "./../assets/weather/weather4.jpg";
import weather5 from "./../assets/weather/weather5.jpg";

export function getWeatherImage (weatherId){
    if (weatherId >= 200 && weatherId <=232){
        return weather5;
    } else if(weatherId >= 300 && weatherId <=531){
        return weather3;
    } else if (weatherId >= 800 && weatherId <=803){
        return weather1;
    } else if(weatherId >= 956 && weatherId <= 962){
        return weather4;
    } else if(weatherId >= 804 && weatherId <= 955){
        return weather2;
    }
  }