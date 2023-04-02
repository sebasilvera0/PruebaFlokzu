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
    <div style={{ 
      border: '2px solid red',
      padding: '20px',
      textAlign: 'center',
    }}>
      <h1 style={{ fontWeight: 'bold' }}>{country.name?.common}</h1>
      <p style={{ fontWeight: 'bold' }}>Capital: {country.capital?.[0]}</p>
      <p style={{ fontWeight: 'bold' }}>Area: {country.area}</p>
      <p style={{ fontWeight: 'bold' }}>Population: {country.population}</p>
      <p style={{ fontWeight: 'bold' }}>Region: {country.region}</p>
      <p style={{ fontWeight: 'bold' }}>Subregion: {country.subregion}</p>
      <p style={{ fontWeight: 'bold' }}>Timezones: {country.timezones}</p>
      
      {country.languages && (
        <p style={{ fontWeight: 'bold' }}>Idiomas oficiales: {Object.values(country.languages).join(", ")}</p>
      )}
    
      {country.flags && (
        <p style={{ border: '1px solid black', display: 'inline-block' }}>
          <img src={country.flags.png} alt="Bandera" style={{ width: '200px' }} />
        </p>
      )}
    </div>
  );
}

export default CountryCard;
