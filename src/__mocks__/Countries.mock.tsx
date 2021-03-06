import ICountry from '../ICountry';

const country1: ICountry = jest.genMockFromModule('../ICountry');
country1.name = "India";
country1.capital = "New Delhi";
country1.population =  10000000;
country1.alpha3Code = "Ind";

const country2: ICountry = jest.genMockFromModule('../ICountry');
country2.name = "abc";
country2.capital = "test";
country2.population =  10000;
country2.alpha3Code = "zzs";

const country3: ICountry = jest.genMockFromModule('../ICountry');
country3.name = "xyz";
country3.capital = "bbb";
country3.population =  50000;
country3.alpha3Code = "aas";

const mockedCountryList = [
    country2,
    country1,
    country3
  ];
  
  export const CountryListMock = mockedCountryList

