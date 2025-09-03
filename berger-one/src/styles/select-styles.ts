// Reusable styles for react-select components to reduce dropdown heights
export const selectStyles = {
    option: (base: any) => ({
        ...base,
        padding: '4px 8px', // Reduce padding to decrease height
        minHeight: '28px', // Set minimum height for options
        fontSize: '12px', // Consistent font size
    }),
    menu: (base: any) => ({
        ...base,
        maxHeight: '200px', // Limit dropdown height
        zIndex: 9999, // Ensure dropdown appears above other elements
    }),
    control: (base: any) => ({
        ...base,
        minHeight: '32px', // Reduce control height
        height: '32px',
        fontSize: '12px', // Consistent font size
    }),
    valueContainer: (base: any) => ({
        ...base,
        padding: '0 8px', // Reduce padding
    }),
    input: (base: any) => ({
        ...base,
        margin: '0px', // Remove default margins
    }),
    singleValue: (base: any) => ({
        ...base,
        fontSize: '12px', // Consistent font size
    }),
    placeholder: (base: any) => ({
        ...base,
        fontSize: '12px', // Consistent font size
    }),
    indicatorsContainer: (base: any) => ({
        ...base,
        height: '32px', // Match control height
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        padding: '4px', // Reduce padding
    }),
    clearIndicator: (base: any) => ({
        ...base,
        padding: '4px', // Reduce padding
    }),
};

// Special styles for status selects with color coding
export const statusSelectStyles = {
    ...selectStyles,
    option: (base: any, { data }: any) => ({
        ...base,
        fontSize: '12px',
        fontWeight: 'bold',
        color: data.value === 'PENDING' ? 'orange' : 
               data.value === 'APPROVED' ? 'green' : 
               data.value === 'REJECTED' ? 'red' : 'inherit',
        padding: '4px 8px',
        minHeight: '28px',
    }),
};

// Compact styles for even smaller dropdowns
export const compactSelectStyles = {
    ...selectStyles,
    option: (base: any) => ({
        ...base,
        padding: '2px 6px', // Even smaller padding
        minHeight: '24px', // Smaller height
        fontSize: '11px', // Smaller font
    }),
    control: (base: any) => ({
        ...base,
        minHeight: '28px', // Smaller control height
        height: '28px',
        fontSize: '11px',
    }),
    menu: (base: any) => ({
        ...base,
        maxHeight: '150px', // Smaller max height
    }),
};

