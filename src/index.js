import React from "react";
import ReactDOM from "react-dom";
import { CountryCard } from "./CountryCard";
import { RegionCard } from "./RegionCard";
import { CabezalPrincipal } from "./CabezalPrincipal";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      searchTerm: "",
      countries: [],
      regiones: [],
      filteredCountries: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch("https://restcountries.com/v3.1/all?fields=name,region,population,area")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });

        const regions = data.reduce((acc, country) => {
          const regionIndex = acc.findIndex((item) => item.region === country.region);
          if (regionIndex !== -1) {
            acc[regionIndex].population += country.population;
            acc[regionIndex].area += parseFloat(country.area);
            acc[regionIndex].densidadPoblacional =   acc[regionIndex].population/ acc[regionIndex].area;
            acc[regionIndex].densidadPoblacional = Number(acc[regionIndex].densidadPoblacional.toFixed(2));
            
            
            acc[regionIndex].countries.push(country);
          } else {
            acc.push({
              region: country.region,
              population: country.population,
              area: parseFloat(country.area),
              densidadPoblacional: country.population/ parseFloat(country.area),
              countries: [country],
            });
          }
          return acc;
        }, []);
        this.setState({
          countries: data,
          filteredCountries: data,
          regiones: regions,
        });
      });
  }

  handleChange(event) {
    const selectedCountry = event.target.value;
    this.setState({ value: selectedCountry });
    //alert("Your favorite flavor is: " + selectedCountry);
  }

  handleSearch(event) {
    debugger;
    const searchTerm = event.target.value;
    const filteredCountries = this.state.countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredCountries.length === 1) {
      this.setState({ value: filteredCountries[0].name.common });
    }
    this.setState({ searchTerm, filteredCountries });
  }

  render() {
    const { filteredCountries, value, regiones } = this.state;
    return (
      <>
        <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
          <CabezalPrincipal />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>
              <span style={{ marginRight: "10px" }}>Pick your favorite Country:</span>
              <select value={value} onChange={this.handleChange}>
                {filteredCountries.map((country) => (
                  <option key={country.name.common} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              <span style={{ marginRight: "10px" }}>Search for a country:</span>
              <input
                type="text"
                value={this.state.searchTerm}
                onChange={this.handleSearch}
              />
            </label>
            <br />
            {regiones.length > 0 && <RegionCard regions={regiones} />}
            <br />
            {value !== "" ? <CountryCard countryName={value} /> : null}
          </div>
        </div>
      </>
    );
  }

}

ReactDOM.render(<App />, document.querySelector("#root"));
