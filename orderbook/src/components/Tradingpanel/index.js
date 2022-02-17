import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './styles.css'

export const TradingPanel = ({ products }) => {

    return (
        <div className="Trading-Panel">
          <div className="Product-Search-Container">
            <Box sx={{ minWidth: 120 }}>
            </Box>
            {/* <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Select Product"
                        // onChange={handleChange}
                    >
                    </Select>
                </FormControl>
            </Box> */}
          </div>
          <div className="TradingChart-Container">Coming Soon...</div>
        </div>
    );
}