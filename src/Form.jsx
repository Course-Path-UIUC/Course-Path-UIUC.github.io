import { useState } from 'react';
import CourseSelector from './CourseSelector';
import Output from './Output';
import MOCK from './mock-data.js';

const Form = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSubmit = (event) => {
    // Prevent page refresh.
    event.preventDefault();

    const formData = new FormData(event.target);

    // Send formData.getAll('course-select') to Kahn's algorithm
    // Maybe implement Kahn's right here ??
    setSelectedCourses(formData.getAll('course-select'))
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
    <form onSubmit={handleSubmit}>
      <CourseSelector
        courses={MOCK.map(c => ({ value: c.id, label: `${c.id} ${c.name}` }))}
      />
      <button id='submit' type='submit' className={BTN_CLASSES.join(' ')}>Submit</button>
      <Output selectedCourses={selectedCourses} />
    </form>
  );
}

export default Form;
