import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './CountryList.css';
import { fetchCountries } from './CountryStore';
import ICountry from './ICountry';

function CountryList() {
  const [countries, setCountiries] = useState<ICountry[]>([]);
  const [filteredcountries, setFilteredCountiries] = useState<ICountry[]>([]);
  const [currentSort, setCurrentSort] = useState('default');
  const [searchText, setSearchText] = useState('');

  const sortTypes: any = {
    up: {
      class: 'sort-up',
      fn: (a: any, b: any) => a.population - b.population
    },
    down: {
      class: 'sort-down',
      fn: (a: any, b: any) => b.population - a.population
    },
    default: {
      class: 'sort',
      fn: (a: any, b: any) => a
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const countries = await fetchCountries();
      setCountiries(countries);
      setFilteredCountiries(countries);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText && countries.length > 0) {
      setFilteredCountiries(
        countries.filter(element => {
          return (
            element.name.toLowerCase().includes(searchText.toLowerCase()) ||
            element.capital.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      );
    } else {
      setFilteredCountiries(countries);
    }
  }, [searchText]);

  const onSortChange = () => {
    let nextSort = 'default';

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';
    setCurrentSort(nextSort);
  };

  return (
    <div>
       <h1>Countries</h1>
      <div>
        <input
          id="search-container"
          placeholder="Search"
          value={searchText}
          onChange={(event: any) => setSearchText(event.target.value)}
        />
      </div>
      <div>
        <table id="countries">
          <thead>
            <tr>
              <th>Name</th>
              <th>Capital City</th>
              <th>
                Population
                <button onClick={onSortChange}>
                  <i className={`fa fa-fw fa-${sortTypes[currentSort].class}`} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredcountries.sort(sortTypes[currentSort].fn).map(country => (
              <tr>
                <td>
                  <NavLink to={`/country/${country.alpha3Code}/details`}>{country.name}</NavLink>
                </td>
                <td>{country.capital}</td>
                <td>{country.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryList;
