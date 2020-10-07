import axios from 'axios';
 
export const API = 'https://hn.algolia.com/api/v3';
 
export const fetchCountries = () => {
    return axios.get('https://restcountries.eu/rest/v2/all').then(res => res.data);
}

export const fetchCountryDetails = (code: string) => {
    return axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`).then(res => res.data);
}