import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import './CountryDetails.css'
import { fetchCountryDetails } from './CountryStore';
import ICountryDetail from './ICountryDetail';

function CountryDetails(props: any) {
  const { code } = props.match.params;
  const [country, setCountry] = useState<ICountryDetail>();

  useEffect(() => {
    const fetchData= async () => {
      const details =  await fetchCountryDetails(code);
      setCountry(details)
    }
    fetchData();
  }, [code]);

  return (
    <>
      {country && (
        <>
          <h1> {country.name} Details</h1>
          <table id="country">
              <tr>
                  <th>Capital City</th>
                  <td>{country.capital}</td>
              </tr>
              <tr>
                  <th>Languages</th>
                <td> <ul style= {{listStyleType:'none'}}>{country.languages && country.languages.map((lan:any) =>  <li>{lan.name}</li>)}</ul></td>
              </tr>
              <tr>
                <th>Currencies</th>
                <td> <ul style= {{listStyleType:'none'}}>{country.currencies && country.currencies.map((cur:any) =>  <li>{cur.name} ({cur.symbol})</li>)}</ul></td>
              </tr>
          </table>
        </>
      )}
    </>
  );
}

export default withRouter(CountryDetails);
