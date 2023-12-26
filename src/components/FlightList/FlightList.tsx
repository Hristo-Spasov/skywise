import { useContext, useEffect } from "react";
import FlightGeneralInfo from "../FlightGeneralInfo/FlightGeneralInfo";
import { FetchContext } from "../../context/search-context";
import { ClockContext } from "../../context/clock-context";
import style from "./FlightList.module.scss";
import Temp from "../../assets/weather_icons/temp.svg?react";
import Humidity from "../../assets/weather_icons/humidity.svg?react";
import Wind from "../../assets/weather_icons/wind.svg?react";
import useWeather from "../../hooks/useWeather";

const FlightList = () => {
  const { weather } = useWeather();
  const { arrival, departure } = useContext(FetchContext);
  const { date } = useContext(ClockContext);

  useEffect(() => {
    if (weather) {
      console.log(weather);
    }
  }, [weather]);
  return (
    <>
      {arrival && departure && (
        <section className={style.flight_list_container}>
          {/* Meteo info about the Airport */}
          <div className={style.list_header}>
            <div className={style.weather_widged}>
              <div>
                <span>{date && date.format(`DD.MM.YYYY HH:mm:ss`)}</span>
              </div>
              {weather && (
                <div className={style.weather_container}>
                  <img
                    src={weather.current.condition.icon}
                    alt="weather_icon"
                    width={70}
                    height={70}
                  />
                  <div className={style.meteo_metrics}>
                    <div className={style.meteo_icons}>
                      <Temp width={20} height={20} />
                      <Wind width={20} height={20} />
                      <Humidity width={20} height={20} />
                    </div>
                    <div className={style.metrics}>
                      <span>{`${Math.floor(weather.current.temp_c)} C°`}</span>
                      <span>
                        {`${Math.floor(weather.current.wind_kph)} km/h`}
                      </span>
                      <span>{`${weather.current.humidity} %`}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Main List of Flights */}
          <div className={style.main_list_of_flights}>
            <FlightGeneralInfo />
          </div>
        </section>
      )}
    </>
  );
};

export default FlightList;
