import Select from 'react-select'
import MOCK from './mock-data.js'

const customStyles= {
  // Remove absolute positioning on menu when it's perpetually open.
  menu: (provided) => ({
    ...provided,
    position: 'static'
  })
};

// @TODO limit the number of selected options to 8
const CourseSelector = () => {
  return (
    <Select
      required
      isMulti
      name='course-select'
      options={
        MOCK.map(c => {
          return { value: c.id, label: `${c.id} ${c.name}` }
        })
      }
      classNamePrefix='select'
      menuIsOpen={true}
      styles={customStyles}
    />
  );
}

export default CourseSelector;
