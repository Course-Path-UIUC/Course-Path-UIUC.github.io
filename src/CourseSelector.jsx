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

  const BTN_CLASSES = [
    'cursor-pointer',
    'rounded-md',
    'bg-blue-900',
    'px-3.5',
    'py-2.5',
    'font-semibold',
    'text-white',
    'shadow-xs',
    'hover:bg-blue-800',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-blue-900',
    'dark:bg-blue-600',
    'dark:hover:bg-blue-700'
  ]

  return (
    <>
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
      aria-label='Select courses'
    />
    <button id='submit' type='button' className={BTN_CLASSES.join(' ')}>Submit</button>
    </>
  );
}

export default CourseSelector;
