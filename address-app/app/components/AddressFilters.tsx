'use client';

import { useState } from "react";
import '../styles/Filters.css';

const AddressFilters = ({onSearchClick, filt}) => {

    const [filters,setFilters] = useState(filt);
    
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFilters((prev:any) => ({
            ...prev,
            [name]: value,
            pageNumber: 1 
            }));
    };

    return (
        <div id='filters'>
            <div id='greed'> 
                <label>Поиск по всем полям:</label>               
                <input
                name="rawInput"
                value={filters.rawInput}
                onChange={handleChange}
                />
            </div>
            <div id='country'> 
                <label>Страна:</label>               
                <input
                name="country"
                value={filters.country}
                onChange={handleChange}
                />
            </div>
            <div id='city'> 
                <label>Город:</label>               
                <input
                name="city"
                value={filters.city}
                onChange={handleChange}
                />
            </div>
            <div id='street'> 
                <label>Улица:</label>               
                <input
                name="street"
                value={filters.street}
                onChange={handleChange}
                />
            </div>
            <div id='houseNumber'> 
                <label>Дом:</label>               
                <input
                name="houseNumber"
                value={filters.houseNumber}
                onChange={handleChange}
                />                
            </div>
            <div id='pageSize'> 
                <label>Количество на страницу:</label>               
                <select
                name="pageSize"
                value={filters.pageSize}
                onChange={handleChange}                >
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
            <div className="button main-button" onClick={()=>onSearchClick(filters)}>Поиск</div>
        </div>
    );
};

export default AddressFilters;
