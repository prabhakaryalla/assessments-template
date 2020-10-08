
import axios from 'axios';
import React from 'react';
import  CountryList  from '../CountryList';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { CountryListMock } from '../__mocks__/Countries.mock';
import { MemoryRouter } from 'react-router';
import ReactTestUtils from 'react-dom/test-utils';
import { wait } from '@testing-library/react';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('country List Page', () => {
    beforeEach(()  => {
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: CountryListMock}));
    })

    it('Should fetch data on load', async () => {
        const wrapper = await mount(<MemoryRouter><CountryList /></MemoryRouter>);
        await wait(() => wrapper.update())
        const rows = wrapper.find('tbody').find('tr');
        expect(mockedAxios.get).toHaveBeenCalled();
        expect(rows.length).toBe(3);        
    })

    it('should sort data in descending when clicked on population', async () => {
        const wrapper = await mount(<MemoryRouter><CountryList /></MemoryRouter>);
        await wait(() => wrapper.update())
        const sortButton = wrapper.find('button').at(0).getDOMNode() as HTMLButtonElement;  
        ReactTestUtils.Simulate.click(sortButton);   
        await wait(() => wrapper.update());
        const populationTr = wrapper.find('tbody').find('tr').at(0).find('td').at(2).getDOMNode() as HTMLInputElement;
        const maxPopulation = Math.max.apply(Math, CountryListMock.map(function(o) { return o.population; }));
        expect(populationTr.innerHTML).toBe(maxPopulation.toString());
    })

    it('should sort data in ascending when clicked on population twice', async () => {
        const wrapper = await mount(<MemoryRouter><CountryList /></MemoryRouter>);
        await wait(() => wrapper.update())
        const sortButton = wrapper.find('button').at(0).getDOMNode() as HTMLButtonElement;  
        ReactTestUtils.Simulate.click(sortButton);   
        await wait(() => wrapper.update())
        ReactTestUtils.Simulate.click(sortButton);   
        await wait(() => wrapper.update())
        const populationTr = wrapper.find('tbody').find('tr').at(0).find('td').at(2).getDOMNode() as HTMLInputElement;
        const minPopulation = Math.min.apply(Math, CountryListMock.map(function(o) { return o.population; }));
        expect(populationTr.innerHTML).toBe(minPopulation.toString());
    })

    it('Should filter data when searched with name', async () => {
       const wrapper = await mount(<MemoryRouter><CountryList /></MemoryRouter>);
       await wait(() => wrapper.update())
       const search = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
       search.value = 'India'
       ReactTestUtils.Simulate.change(search);
       await wait(() => wrapper.update())
       const rows = wrapper.find('tbody').find('tr');
       expect(rows.length).toBe(1);        
    })

    
    it('Should filter data when searched with capital', async () => {
        const wrapper = await mount(<MemoryRouter><CountryList /></MemoryRouter>);
        await wait(() => wrapper.update())
        const search = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
        search.value = 'bbb'
        ReactTestUtils.Simulate.change(search);
        await wait(() => wrapper.update())
        const rows = wrapper.find('tbody').find('tr');
        expect(rows.length).toBe(1);        
     })

    it('Should not contain rows when filter data with invalid data', async () => {
        const wrapper = await mount(<MemoryRouter><CountryList /></MemoryRouter>);
        await wait(() => wrapper.update())
        const search = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
        search.value = 'invaliddata'
        ReactTestUtils.Simulate.change(search);
        await wait(() => wrapper.update())
        const rows = wrapper.find('tbody').find('tr');
        expect(rows.length).toBe(0);        
     })
})