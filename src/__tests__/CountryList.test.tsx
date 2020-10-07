
import axios from 'axios';
import React from 'react';
import  CountryList  from '../CountryList';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { CountryListMock } from '../__mocks__/Countries.mock';
import { MemoryRouter } from 'react-router';
import ReactTestUtils from 'react-dom/test-utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: CountryListMock}));

describe('country List Page', () => {

    it('Should fetch data on load', async () => {
        const wrapper = await mount(<MemoryRouter><CountryList /></MemoryRouter>);
        expect(mockedAxios.get).toHaveBeenCalled();
        await wrapper.update()
        await wrapper.update()
        await wrapper.update()
        const rows = wrapper.find('tbody').find('tr');
        expect(rows.length).toBe(2);        
    })

    it('Should filter data when name is entered', async () => {
       mockedAxios.get.mockImplementationOnce(() => Promise.resolve({data: CountryListMock}));
       const wrapper = await mount(<MemoryRouter><CountryList /></MemoryRouter>);
       const search = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement;
       search.value = 'India'
       ReactTestUtils.Simulate.change(search);
       await wrapper.update();
       await wrapper.update();
       await wrapper.update();
       const rows = wrapper.find('tbody').find('tr');
       expect(rows.length).toBe(1);        
    })
})