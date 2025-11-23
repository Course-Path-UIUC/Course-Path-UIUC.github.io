// Store hard-coded test data (JSON) to mimic the results using Python for
// web scraping while that feature is being built.

// Courses should come from:
// https://catalog.illinois.edu/courses-of-instruction/cs/
// and have a number >= 400

// Test cases present in this mock data:
// 1. A class that isn't a prerequisite for any other in the list: CS 411
// 2. A 2 level prerequisite chain: CS 465, CS 565
// 3. A 3 level prerequisite chain: CS 421, CS 422, CS 524
// 4. A 500-level class with (1) 400-level prerequisite: CS 565
// 5. A 500-level class with (2) 400-level prerequisites: CS 582

const MOCK = [
  {
    "id": "CS 411",
    "name": "Database Systems",
    "prereqs": ["CS 225"]
  },
  {
    "id": "CS 421",
    "name": "Programming Languages & Compilers",
    "prereqs": ["CS 233", "CS 374", "MATH 225"]
  },
  {
    "id": "CS 422",
    "name": "Programming Language Design",
    "prereqs": ["CS 421"]
  },
  {
    "id": "CS 446",
    "name": "Machine Learning",
    "prereqs": ["CS 225", "MATH 225", "CS 361"]
  },
  {
    "id": "CS 465",
    "name": "User Interface Design",
    "prereqs": ["CS 225"]
  },
  {
    "id": "CS 466",
    "name": "Introduction to Bioinformatics",
    "prereqs": ["CS 225"]
  },
  {
    "id": "CS 475",
    "name": "Formal Models of Computation",
    "prereqs": ["CS 374"]
  },
  {
    "id": "CS 524",
    "name": "Concurrent Progrmg Languages",
    "prereqs": ["CS 422", "CS 475"]
  },
  {
    "id": "CS 565",
    "name": "Human-Computer Interaction",
    "prereqs": ["CS 465"]
  },
  {
    "id": "CS 582",
    "name": "Machine Learning for Bioinformatics",
    "prereqs": ["CS 446", "CS 466"]
  },
]
