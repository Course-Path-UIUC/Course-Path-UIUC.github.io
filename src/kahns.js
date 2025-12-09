/**
 * Matches a prerequisite string to a course in the selected courses list.
 * Checks for exact course code match or partial title match.
 */
function findMatchingCourse(prerequisite, courses) {
  return courses.find(course => 
    course['Course Code Space'] === prerequisite || 
    course['Course Title'].includes(prerequisite)
  ) || null;
}

/**
 * Sorts courses using Kahn's algorithm for topological sorting.
 * Ensures courses with prerequisites appear after their prerequisites.
 * 
 * @param {Array} courses - Array of course objects to sort
 * @returns {Array} - Sorted array of course objects (prerequisites first)
 */
function sortCoursesWithKahns(courses) {
  // Early return for empty input
  if (courses.length === 0) {
    return courses;
  }

  // Step 1: Initialize data structures
  const courseMap = new Map();        // Quick lookup: course code -> course object
  const adjacencyList = new Map();   // Dependency graph: course -> [dependent courses]
  const inDegree = new Map();         // In-degree count: course -> number of unmet prerequisites

  courses.forEach(course => {
    const code = course['Course Code Space'];
    courseMap.set(code, course);
    adjacencyList.set(code, []);
    inDegree.set(code, 0);
  });

  // Step 2: Build dependency graph
  courses.forEach(course => {
    const currentCode = course['Course Code Space'];
    const prerequisites = course['Prerequisites'] || [];

    prerequisites.forEach(prerequisite => {
      const prerequisiteCourse = findMatchingCourse(prerequisite, courses);

      if (prerequisiteCourse) {
        const prerequisiteCode = prerequisiteCourse['Course Code Space'];
        
        // Add edge: prerequisite -> current course
        adjacencyList.get(prerequisiteCode).push(currentCode);
        
        // Increment in-degree of current course
        inDegree.set(currentCode, inDegree.get(currentCode) + 1);
      }
    });
  });

  // Step 3: Initialize queue with courses that have no prerequisites
  const queue = [...inDegree.entries()]
    .filter(([_, degree]) => degree === 0)
    .map(([code]) => code);

  // Step 4: Process courses using Kahn's algorithm
  const sortedCourses = [];
  
  while (queue.length > 0) {
    // Remove course with no unmet prerequisites
    const currentCode = queue.shift();
    sortedCourses.push(courseMap.get(currentCode));

    // Process all courses that depend on the current course
    const dependentCourses = adjacencyList.get(currentCode);
    
    dependentCourses.forEach(dependentCode => {
      // Decrement in-degree
      const newDegree = inDegree.get(dependentCode) - 1;
      inDegree.set(dependentCode, newDegree);

      // If all prerequisites are met, add to queue
      if (newDegree === 0) {
        queue.push(dependentCode);
      }
    });
  }

  return sortedCourses;
}

export default sortCoursesWithKahns;
