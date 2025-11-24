import { useState } from 'react';
import Select from 'react-select'
import MOCK from './mock-data.js'

const classNames = {
  menu: (state) => 'dark:outline dark:outline-slate-500'
};

const customStyles = {
  // Remove absolute positioning on menu when it's perpetually open.
  menu: (baseStyles) => {
    const {
      backgroundColor, position, top, zIndex, ...cleanedStyles } = baseStyles;

    return cleanedStyles;
  }
};

const CourseSelector = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (newValue) => {
    setSelectedOptions(newValue);
  };

  return (
    <Select
      required
      isMulti
      name='course-select'
      options={MOCK.map(c => ({ value: c.id, label: `${c.id} ${c.name}` }))}
      value={selectedOptions}
      onChange={handleChange}
      isOptionDisabled={
        (opt) => selectedOptions.length >= 8 && !selectedOptions.includes(opt)
      }
      placeholder='Select up to 8 courses'
      classNames={classNames}
      classNamePrefix='select'
      menuIsOpen={true}
      styles={customStyles}
    />
  );
}

export default CourseSelector;
