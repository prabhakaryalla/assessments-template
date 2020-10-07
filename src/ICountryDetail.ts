export default interface ICountryDetail {
    name: string,
    capital: string;
    languages: ILanguage[],
    currencies: ICurrency[]
}

interface ILanguage {
    name: string;
}

interface ICurrency {
    name : string,
    symbol: string
}