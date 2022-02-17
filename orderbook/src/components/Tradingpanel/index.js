import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './styles.css'

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: '#2f3640' }),
    option: (styles, {isFocused}) => {
        return {
            ...styles,
            backgroundColor: isFocused ? '#373f4a' : '#2f3640',
            color: isFocused ? '#fff' : '#aaa',
        }
    },
    singleValue: styles => ({ ...styles, color: '#fff' }),
    dropdownIndicator: styles => ({ ...styles, color: '#fff' }),
};

export const TradingPanel = ({ selectedProduct, options, handleChange }) => {

    return (
        <div className="Trading-Panel">
          <div className="Product-Search-Container">
            <p>Select a Product</p>
            <Select value={selectedProduct} options={options} styles={colourStyles} onChange={handleChange} />
          </div>
          <div className="TradingChart-Container">Coming Soon...</div>
        </div>
    );
}