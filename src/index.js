import React from "react";
import ReactDOM  from "react-dom";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        searchTerm: '',
        countries: [],
        regiones: []
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('https://restcountries.com/v3.1/all?fields=name')
          .then(response => response.json())
          .then(data => {
             const sortedData = data.sort((a, b) => {
                  if (a.name.common < b.name.common) {
                    return -1;
                  }
                  if (a.name.common > b.name.common) {
                    return 1;
                  }
                  return 0;
                }); 
            console.log(data);
            this.setState({ countries: data });
          })
          .catch(error => console.error(error));
      }
  
    componentDidMount() {
      fetch('https://restcountries.com/v3.1/all?fields=name')
        .then(response => response.json())
        .then(data => {
           const sortedData = data.sort((a, b) => {
                if (a.name.common < b.name.common) {
                  return -1;
                }
                if (a.name.common > b.name.common) {
                  return 1;
                }
                return 0;
              }); 
          console.log(data);
          this.setState({ countries: data });
        })
        .catch(error => console.error(error));
    }
  
    handleChange(event) {
      this.setState({ value: event.target.value });
      alert('Your favorite flavor is: ' + event.target.value);
    }
  
    handleSearch(event) {
      this.setState({ searchTerm: event.target.value }, () => {
        const filteredCountries = this.state.countries.filter(country =>
          country.name.common
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase())
        );
        this.setState({ value: filteredCountries[0]?.name.common });
      });
    }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      const filteredCountries = this.state.countries.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase())
      );
  
      return (
        <>
          <label>
            Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
              {filteredCountries.map(country => (
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
          </>
      );
    }
  }
  
  ReactDOM.render(<App />, document.querySelector('#root'));