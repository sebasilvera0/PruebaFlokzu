import React, { useState, useEffect } from "react";

export function RegionCard(props) {
  const [regions, setRegions] = useState([]);

  
  console.log("Props de RegionCard:", props);
  useEffect(() => {
    const countryNames = props.value.map((country) => country.name.common);
    setRegions(countryNames);
  }, [props]);


  return (
    <div>
      <select>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}



export default RegionCard;
