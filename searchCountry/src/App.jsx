import { useEffect, useState } from "react";
import axios from "axios";
import countriesService from "./services/countries";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
      console.log("initialCountries", initialCountries);
    });
  }, []);

  if (countries.length > 0) {
    console.log("kuwait", countries[0].name.common);
  }

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);

    setCountriesToShow(
      countries.filter((country) =>
        country.name.common
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
    );
  };
  console.log("countriesToShow", countriesToShow);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleShowBtn = (country) => {
    setSearchInput('')
    setCountriesToShow([country])
    console.log(country.name.common)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        search{" "}
        <input type="text" value={searchInput} onChange={handleSearchInput} />
        <h2>countries</h2>
        {countriesToShow.length > 1 && countriesToShow.length < 10 ? (
          countriesToShow.map((country, index) => {
            return <div key={index}>{country.name.common} <button onClick={() => handleShowBtn(country)}>show</button></div>;
          })
        ) : countriesToShow.length == 1 ? (
          <div>
            <h1>{countriesToShow[0].name.common}</h1>
            <div>{countriesToShow[0].capital[0]}</div>
            <div>{countriesToShow[0].area}</div>
            <h2>Languages</h2>
            <ul>
              {Object.entries(countriesToShow[0].languages).map(([key, value]) => {
                return (
                  <li key={key}>{value}</li>
                )
              })}
            </ul>
            <div>
              <img src={`${countriesToShow[0].flags.png}`} alt="flag" />
            </div>
          </div>
        ) : countriesToShow.length == 0 ? (
          <div>no countries yet</div>
        ) : (
          <div>to much countries</div>
        )}
      </form>
    </div>
  );
}

export default App;
