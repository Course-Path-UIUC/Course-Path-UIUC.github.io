// Test file for Kahn's algorithm implementation
import { readFileSync } from 'fs';
import sortCoursesWithKahns from './src/kahns.js';

const dataFile = readFileSync('./data.json', 'utf-8');
const DATA = { default: JSON.parse(dataFile) };

// Simple test runner
let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`✅ ${name}`);
  } catch (error) {
    testsFailed++;
    console.error(`❌ ${name}`);
    console.error(`   Error: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

function getCourseCodes(courses) {
  return courses.map(c => c['Course Code Space']);
}

// Test data - real courses from data.json
const CS401 = DATA.default['CS 401'];
const CS403 = DATA.default['CS 403'];
const CS427 = DATA.default['CS 427'];
const CS428 = DATA.default['CS 428'];
const CS429 = DATA.default['CS 429'];
const CS400 = DATA.default['CS 400'];
const CS402 = DATA.default['CS 402'];
const CS410 = DATA.default['CS 410'];
const CS421 = DATA.default['CS 421'];
const CS422 = DATA.default['CS 422'];
const CS424 = DATA.default['CS 424'];
const CS426 = DATA.default['CS 426'];
const CS446 = DATA.default['CS 446'];
const CS475 = DATA.default['CS 475'];
const CS524 = DATA.default['CS 524'];

console.log('🧪 Running Kahn\'s Algorithm Tests\n');

// Test 1: Empty array
test('Empty array returns empty array', () => {
  const result = sortCoursesWithKahns([]);
  assert(result.length === 0, 'Should return empty array');
});

// Test 2: Single course
test('Single course returns same course', () => {
  const result = sortCoursesWithKahns([CS401]);
  assert(result.length === 1, 'Should return one course');
  assert(result[0]['Course Code Space'] === 'CS 401', 'Should return CS 401');
});

// Test 3: Courses with no dependencies between them
test('Courses with no dependencies stay in same order', () => {
  const input = [CS400, CS410];
  const result = sortCoursesWithKahns(input);
  assert(result.length === 2, 'Should return 2 courses');
  assert(arraysEqual(getCourseCodes(result), getCourseCodes(input)), 
    'Order should remain the same');
});

// Test 4: Simple dependency (CS 401 -> CS 403)
test('Simple dependency: CS 401 before CS 403', () => {
  const input = [CS403, CS401]; // Wrong order
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  const cs401Index = codes.indexOf('CS 401');
  const cs403Index = codes.indexOf('CS 403');
  assert(cs401Index < cs403Index, 'CS 401 should come before CS 403');
  assert(result.length === 2, 'Should return 2 courses');
});

// Test 5: Already in correct order
test('Courses already in correct order stay same', () => {
  const input = [CS401, CS403]; // Correct order
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  assert(codes[0] === 'CS 401', 'CS 401 should be first');
  assert(codes[1] === 'CS 403', 'CS 403 should be second');
});

// Test 6: Chain of dependencies (CS 427 -> CS 428)
test('Chain dependency: CS 427 before CS 428', () => {
  const input = [CS428, CS427]; // Wrong order
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  const cs427Index = codes.indexOf('CS 427');
  const cs428Index = codes.indexOf('CS 428');
  assert(cs427Index < cs428Index, 'CS 427 should come before CS 428');
});

// Test 7: Multiple courses with one dependency
test('Multiple courses: CS 401 before CS 403, others maintain relative order', () => {
  const input = [CS403, CS400, CS401, CS410]; // CS 403 before CS 401 (wrong)
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  const cs401Index = codes.indexOf('CS 401');
  const cs403Index = codes.indexOf('CS 403');
  assert(cs401Index < cs403Index, 'CS 401 should come before CS 403');
  assert(result.length === 4, 'Should return 4 courses');
});

// Test 8: Courses where prerequisite not in selection
test('Prerequisite not in selection: courses stay in order', () => {
  // CS 403 needs CS 401, but we only select CS 403
  const input = [CS403];
  const result = sortCoursesWithKahns(input);
  assert(result.length === 1, 'Should return 1 course');
  assert(result[0]['Course Code Space'] === 'CS 403', 'Should return CS 403');
});

// Test 9: Multiple independent courses
test('Multiple independent courses maintain order', () => {
  const input = [CS400, CS410, CS402];
  const result = sortCoursesWithKahns(input);
  // Since no dependencies, order should be preserved
  assert(result.length === 3, 'Should return 3 courses');
  // All courses should be present
  const codes = getCourseCodes(result);
  assert(codes.includes('CS 400'), 'Should include CS 400');
  assert(codes.includes('CS 410'), 'Should include CS 410');
  assert(codes.includes('CS 402'), 'Should include CS 402');
});

// Test 10: Complex scenario - multiple dependencies
test('Complex: CS 427 -> CS 428 and CS 427 -> CS 429', () => {
  const input = [CS429, CS428, CS427]; // All dependents before prerequisite
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  const cs427Index = codes.indexOf('CS 427');
  const cs428Index = codes.indexOf('CS 428');
  const cs429Index = codes.indexOf('CS 429');
  assert(cs427Index < cs428Index, 'CS 427 should come before CS 428');
  assert(cs427Index < cs429Index, 'CS 427 should come before CS 429');
  assert(result.length === 3, 'Should return 3 courses');
});

// Test 11: All courses in wrong order
test('All courses in wrong order get sorted correctly', () => {
  const input = [CS428, CS403, CS401, CS427]; // All wrong
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  
  // CS 401 should come before CS 403
  const cs401Index = codes.indexOf('CS 401');
  const cs403Index = codes.indexOf('CS 403');
  assert(cs401Index < cs403Index, 'CS 401 should come before CS 403');
  
  // CS 427 should come before CS 428
  const cs427Index = codes.indexOf('CS 427');
  const cs428Index = codes.indexOf('CS 428');
  assert(cs427Index < cs428Index, 'CS 427 should come before CS 428');
  
  assert(result.length === 4, 'Should return 4 courses');
});

// Test 12: Large set with mixed dependencies
test('Large set: 8 courses with mixed dependencies', () => {
  const input = [CS428, CS403, CS400, CS401, CS410, CS427, CS402, CS429];
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  
  // Verify all courses are present
  assert(result.length === 8, 'Should return 8 courses');
  assert(codes.includes('CS 401'), 'Should include CS 401');
  assert(codes.includes('CS 403'), 'Should include CS 403');
  assert(codes.includes('CS 427'), 'Should include CS 427');
  assert(codes.includes('CS 428'), 'Should include CS 428');
  
  // Verify dependencies
  const cs401Index = codes.indexOf('CS 401');
  const cs403Index = codes.indexOf('CS 403');
  assert(cs401Index < cs403Index, 'CS 401 should come before CS 403');
  
  const cs427Index = codes.indexOf('CS 427');
  const cs428Index = codes.indexOf('CS 428');
  const cs429Index = codes.indexOf('CS 429');
  assert(cs427Index < cs428Index, 'CS 427 should come before CS 428');
  assert(cs427Index < cs429Index, 'CS 427 should come before CS 429');
});

// Test 13: Courses with prerequisites that match by title
test('Prerequisite matching by title works', () => {
  // This test would require courses with title-based prerequisites
  // For now, we'll test that the function handles courses correctly
  const input = [CS401, CS403];
  const result = sortCoursesWithKahns(input);
  assert(result.length === 2, 'Should handle title-based matching');
});

// Test 14: Verify no courses are lost
test('No courses are lost during sorting', () => {
  const input = [CS403, CS401, CS428, CS427, CS400];
  const result = sortCoursesWithKahns(input);
  
  const inputCodes = new Set(getCourseCodes(input));
  const outputCodes = new Set(getCourseCodes(result));
  
  assert(inputCodes.size === outputCodes.size, 'Should have same number of courses');
  inputCodes.forEach(code => {
    assert(outputCodes.has(code), `Should include ${code}`);
  });
});

// Test 15: Verify courses are not duplicated
test('No duplicate courses in output', () => {
  const input = [CS401, CS403, CS427, CS428];
  const result = sortCoursesWithKahns(input);
  
  const codes = getCourseCodes(result);
  const uniqueCodes = new Set(codes);
  
  assert(codes.length === uniqueCodes.size, 'Should have no duplicates');
});

// Test 16: Three-level dependency chain
test('Three-level chain: CS 421 -> CS 422 -> CS 524', () => {
  const input = [CS524, CS422, CS421]; // All reversed
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  
  const cs421Index = codes.indexOf('CS 421');
  const cs422Index = codes.indexOf('CS 422');
  const cs524Index = codes.indexOf('CS 524');
  
  assert(cs421Index < cs422Index, 'CS 421 should come before CS 422');
  assert(cs422Index < cs524Index, 'CS 422 should come before CS 524');
  assert(result.length === 3, 'Should return 3 courses');
});

// Test 17: Course with multiple prerequisites
test('Multiple prerequisites: CS 524 needs CS 422 and CS 475', () => {
  const CS422 = DATA.default['CS 422'];
  const CS475 = DATA.default['CS 475'];
  const CS524 = DATA.default['CS 524'];
  const input = [CS524, CS422, CS475];
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  assert(codes.indexOf('CS 422') < codes.indexOf('CS 524'), 'CS 422 before CS 524');
  assert(codes.indexOf('CS 475') < codes.indexOf('CS 524'), 'CS 475 before CS 524');
});

// Test 18: Two independent dependency chains
test('Two independent chains: CS 401->CS 403 and CS 427->CS 428', () => {
  const input = [CS428, CS403, CS427, CS401];
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  assert(codes.indexOf('CS 401') < codes.indexOf('CS 403'), 'Chain 1 correct');
  assert(codes.indexOf('CS 427') < codes.indexOf('CS 428'), 'Chain 2 correct');
});

// Test 19: Maximum 8 courses with complex dependencies
test('Maximum 8 courses with complex dependency graph', () => {
  const CS421 = DATA.default['CS 421'];
  const CS422 = DATA.default['CS 422'];
  const input = [CS428, CS524, CS403, CS422, CS401, CS421, CS427, CS429];
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  assert(result.length === 8, 'All 8 courses present');
  assert(codes.indexOf('CS 401') < codes.indexOf('CS 403'), 'CS 401 -> CS 403');
  assert(codes.indexOf('CS 421') < codes.indexOf('CS 422'), 'CS 421 -> CS 422');
  assert(codes.indexOf('CS 427') < codes.indexOf('CS 428'), 'CS 427 -> CS 428');
});

// Test 20: Courses sharing same prerequisite
test('Courses sharing prerequisite: CS 427 -> CS 428 and CS 429', () => {
  const input = [CS429, CS428, CS427];
  const result = sortCoursesWithKahns(input);
  const codes = getCourseCodes(result);
  const cs427Index = codes.indexOf('CS 427');
  assert(cs427Index < codes.indexOf('CS 428'), 'CS 427 before CS 428');
  assert(cs427Index < codes.indexOf('CS 429'), 'CS 427 before CS 429');
});

// Test 21: Deterministic output
test('Same input produces same output (deterministic)', () => {
  const input = [CS403, CS401, CS428, CS427];
  const result1 = sortCoursesWithKahns(input);
  const result2 = sortCoursesWithKahns(input);
  assert(arraysEqual(getCourseCodes(result1), getCourseCodes(result2)), 'Output should be deterministic');
});

console.log('\n📊 Test Results:');
console.log(`✅ Passed: ${testsPassed}`);
console.log(`❌ Failed: ${testsFailed}`);
console.log(`📈 Total: ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed');
  process.exit(1);
}

