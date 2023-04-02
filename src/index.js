import React from "react";
import ReactDOM from "react-dom";
import { CountryCard } from "./CountryCard";
import { RegionCard } from "./RegionCard";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      searchTerm: "",
      countries: [],
      filteredCountries: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    fetch("https://restcountries.com/v3.1/all?fields=name,region,population")
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
        this.setState({
          countries: data,
          filteredCountries: data,
        });
      });
  }

  handleChange(event) {
    const selectedCountry = event.target.value;
    this.setState({ value: selectedCountry });
    alert("Your favorite flavor is: " + selectedCountry);
  }

  handleSearch(event) {
    const searchTerm = event.target.value;
    const filteredCountries = this.state.countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ searchTerm, filteredCountries });
  }

  render() {
    const { filteredCountries, value } = this.state;
    return (
      <>
        <label>
          Pick your favorite flavor:
          <select value={value} onChange={this.handleChange}>
            {filteredCountries.map((country) => (
              <option key={country.name.common} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <label>
          Search for a country:
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearch}
          />
        </label>
                
        <br />

        {/*     Si el valor es distino de una cadena vacia lo voy a mostrar si no no muestro */}
        {value !== "" ? <CountryCard countryName={value} /> : null}

          <RegionCard value = {filteredCountries}/>    
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
