import React, { useState, useEffect } from "react";

export function RegionCard(props) {
  const [value, setValue] = useState("");

  console.log("Mis PropiedadesRecibidas", props);

  return (
    <div>
      <label>
        Pick your favorite Region:
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          {props.regions ? (
            props.regions.map((region) => (
              <option key={region.region} value={region.region}>
                {region.region}
              </option>
            ))
          ) : (
            <option value="">Loading...</option>
          )}
        </select>
      </label>
      <h1>Hola</h1>
    </div>
  );
}