import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate';
import {GEO_API_URL,Api_options} from '../../api'


const Search = ({onSearchChange}) => {
    const [search, setSearch ] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, Api_options);
            const result = await response.json();
            return{
                options: result.data.map((city) => {
                    return{
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <AsyncPaginate 
        placeholder= " City name"
        debounceTimeout={600}
        value = {search}
        onChange = {handleOnChange}
        loadOptions = {loadOptions }
    />
  )
}

export default Search;
