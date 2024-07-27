// src/components/controls/Select.jsx
const Select = ({ options, onChange }) => {
    return (
        <select onChange={onChange}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
