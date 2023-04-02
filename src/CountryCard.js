import React, { useState, useEffect } from "react";

export function CountryCard(props) {
  const [country, setCountry] = useState({});

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${props.countryName}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data[0]);
      });
  }, [props.countryName]);

  return (
    <div>
      <h1>{country.name?.common}</h1>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      
      <p>
        <img src={country.flags.png} alt = {"Bandera de un pais"} />
     </p>

   


    </div>
  );
}

export default CountryCard;





