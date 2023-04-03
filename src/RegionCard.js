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
    <div style={{ border: "2px solid red", padding: "20px" }}>
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
  
    {value !== "" ? (
      <>
        <div style={{ borderBottom: "2px solid black", paddingBottom: "10px" }}>
          <h1 style={{ textAlign: "center", textDecoration: "underline" }}>{value}</h1>
          <h5 style={{ textAlign: "center" }}>
            Population density:{" "}
            {props.regions.find((region) => region.region === value).densidadPoblacional}{" "}
            personas/porKM2
          </h5>
        </div>
        <ul>
          {props.regions
            .find((region) => region.region === value)
            .countries.map((country) => (
              <li key={country}>{country.name.common}</li>
            ))}
        </ul>
      </>
    ) : null}
  </div>
  );
}

export default RegionCard;
