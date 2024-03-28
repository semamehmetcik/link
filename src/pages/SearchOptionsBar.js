import React from 'react';
import './SearchOptionsBar'; // Stil dosyasını bileşene ekleyin

const SearchOptionsBar = () => {
    return (
        <div className="search-options-bar">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
            {/* Diğer öğeleri buraya ekleyin */}
        </div>
    );
};

export default SearchOptionsBar;
