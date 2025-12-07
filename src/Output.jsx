import sortCoursesWithKahns from './kahns.js';

const Output = ({ selectedCourses }) => {
  const CHIP_BASE_CLASSES = [
    'px-3.5',
    'py-2',
    'border',
    'border-blue-600',
    'rounded-full',
    'bg-slate-100',
    'font-medium',
    'text-blue-800',
    'dark:text-white',
    'dark:bg-blue-900',
  ];

  const sortedCourses = sortCoursesWithKahns(selectedCourses);

  const listItems = sortedCourses.map(course =>
    <li
      key={course['Course Code Space']}
      className={CHIP_BASE_CLASSES.join(' ')}
    >{course['Course Code Space']}</li>
  );

  return (
    <output>
      {selectedCourses.length > 0 ? (
        <ol className='flex flex-col flex-wrap gap-4 content-center sm:flex-row'>
          {listItems}
        </ol>
      ) : ''}
    </output>
  );
}

export default Output;
