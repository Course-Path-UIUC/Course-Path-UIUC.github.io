
const Output = ({ selectedCourses }) => {
  const listItems = selectedCourses.map(course =>
    <li key={course}>{course}</li>
  );

  return (
    <output>
      {selectedCourses.length > 0 ? (
        <ol>{listItems}</ol>
      ) : ''}
    </output>
  );
}

export default Output;
