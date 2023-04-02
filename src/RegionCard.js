import React, { useState, useEffect } from "react";

export function RegionCard(props) {
  const [regions, setRegions] = useState([]);
  const [value, setValue] = useState("");

  function handleChange(event) {
    const selectedRegion = event.target.value;
    console.log("Mi selectedRegion", selectedRegion);
    setValue(selectedRegion);
    alert("Your favorite region  is: " + selectedRegion);
  }

  console.log("Mis PropiedadesRecibidas", props);

  return (
    <div>
      <label>
        Pick your favorite Region:
        <select value={value} onChange={handleChange}>
          {props.regions.map((region) => (
            <option key={region.region} value={region.region}>
              {region.region}
            </option>
          ))}
        </select>
      </label>
      <h1>{value}</h1>

      {value !== '' ? (
        <>
          <h5>Population density: {props.regions.find((region) => region.region === value).densidadPoblacional} personas/</h5>
          <ul>
            {props.regions.find((region) => region.region === value).countries.map((country) => (
              <li key={country}>{country.name.common}</li>
            ))}
          </ul>
        </>
      ) : null}


    </div>
  );
}

export default RegionCard;
