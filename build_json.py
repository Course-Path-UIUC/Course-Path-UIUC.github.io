import requests
from bs4 import BeautifulSoup
import re
import time
import json

def get_soup_from_url(url):
    '''
    Returns a soup from a specific url. If the code fails it'll return 'Failed to retrieve the page. Status code: [CODE]'

    Parameters:
        url (str): A valid URL.

    Returns:
        soup (BeautifulSoup Object): An easy to scrape HTML.
    '''

    # Send a GET request to the URL.
    response = requests.get(url)

    # Check if the request was successful.
    if response.status_code == 200:
    # Parse the HTML content of the page.
        soup = BeautifulSoup(response.text, 'html.parser')

        return soup

    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")

def get_list_from_tag_and_class(soup, tag, class_name):
    '''
    Returns a list with the HTML section for each of the blocks with the tag and class name.

    Parameters:
        soup (BeautifulSoup Object): An easy to scrape HTML.
        tag (str): Name of the tag.
        class_name (str): Name of the class.

    Returns:
        list: All blocks with the tag and block.
    '''

    return soup.find_all(tag, class_=class_name)


def check_missing_description(course_text, course_code_space):
    '''
    Checks if the course text matches a specific pattern. 'Same as [course code]. See [course code].' Multiple courses might work.
    This function will only work for CS 400s or CS 500s courses.

    Parameters:
        course_text(str): Text from course block extracted from the HTML.
        course_code_space(str): Course code in the format CS 101. -> This is an example

    Returns:
        bool: Whether the pattern was found.

    Examples:
        >>> check_missing_description('Same as PSYC 514, ANTH 514, EPSY 551, LING 570, and PHIL 514. See PSYC 514.', 'CS 549')
        True

        >>> check_missing_description('Hello', 'CS 401')
        False
    '''

    # Pattern for re library
    regex_pattern = r'Same as (.+?)\. See (.+)'
    
    return (bool(re.search(regex_pattern, course_text))) and ('CS 4' in course_code_space or 'CS 5' in course_code_space)
    
def pull_missing_description_course(course_html):
    '''
    Returns the course text from a link inside the parameter HTML, then it checks whether it has prerequisites.

    Parameters:
        course_html (HTML): An easy to scrape HTML from the course

    Returns:
        course_text(str): The course text extracted from the link of the original HTML.

    '''

    # Get the URL where the description exist.
    class_list = get_list_from_tag_and_class(course_html, 'a', 'bubblelink code')
    href = class_list[0].get('href')
    complete_url = 'https://catalog.illinois.edu/' + href

    # Get the course text.
    soup = get_soup_from_url(complete_url)
    div_list = get_list_from_tag_and_class(soup, 'div', 'courseblock')
    course_text = div_list[0].text

    # Check for prerequisites.
    has_prerequisite = 'Prerequisite:' in course_text

    # Prevent too many requests.
    time.sleep(0.3)

    return course_text, has_prerequisite


def remove_duplicates_and_empty_lists(list_of_lists):
    """
    Removes duplicate sublists and empty lists from a list of lists.

    Parameters:
        list_of_lists(list): A list containing other lists (sublists).

    Returns:
        unique_non_empty_lists(list): A new list with unique, non-empty sublists.
    """

    seen = set()
    unique_non_empty_lists = []

    for sublist in list_of_lists:

        # Check if the sublist is not empty.
        if sublist:  
            # Convert sublist to a tuple to make it hashable for the set.
            sublist_tuple = tuple(sublist)
            if sublist_tuple not in seen:
                seen.add(sublist_tuple)
                unique_non_empty_lists.append(sublist)
    return unique_non_empty_lists

def reduce_prerequisites_to_one_course(prerequisites):
    '''
    Iterates through each list in the prerequisites list and reduces it to the most representative course
    or group name. This will simplify the topological sorting and make it cleaner.

    Parameters:
        prerequisites(list): A list containing other lists (sublists) with each sublist being all the options of courses
                             that can satisfy the prerequisite.

    Returns:
        prerequisites(list): The same list with the simplified version of rerequisites

    Example:
        >>> reduce_prerequisites_to_one_course([['CS 101', 'CS 125'], ['CS 361', 'STAT 400'], ['CS 446']])
        [['Intro to CS I'], ['Probability & Statistics'], ['CS 446']]

    '''
    # Reduce to one course.
    for i, prerequisite in enumerate(prerequisites):
        if 'MATH 220' in prerequisite:
            prerequisites[i] = ['Calculus I']
        elif ('STAT 400' in prerequisite) or ('CS 361' in prerequisite):
            prerequisites[i] = ['Probability & Statistics']
        elif 'MATH 415' in prerequisite:
            prerequisites[i] = ['Linear Algebra']
        elif 'CS 125' in prerequisite:
            prerequisites[i] = ['Intro to CS I']
        elif 'CS 126' in prerequisite:
            prerequisites[i] = ['Intro to CS II']
        elif ('CS 225' in prerequisite) or ('CS 173' in prerequisite):
            prerequisites[i] = ['Data Structures']
        elif 'CS 446' in prerequisite:
            prerequisites[i] = ['CS 446']
        elif 'CS 374' in prerequisite:
            prerequisites[i] = ['CS 374']
        elif 'CS 446' in prerequisite:
            prerequisites[i] = ['CS 446']
        elif 'CS 475' in prerequisite:
            prerequisites[i] = ['CS 475']
        elif 'CS 473' in prerequisite:
            prerequisites[i] = ['CS 473']
        elif 'CS 461' in prerequisite:
            prerequisites[i] = ['CS 461']
        elif 'CS 463' in prerequisite:
            prerequisites[i] = ['CS 463']
        elif 'CS 450' in prerequisite:
            prerequisites[i] = ['CS 450']
        elif 'CS 461' in prerequisite:
            prerequisites[i] = ['CS 461']
        elif 'MATH 461' in prerequisite:
            prerequisites[i] = ['MATH 461']
        elif 'CS 438' in prerequisite:
            prerequisites[i] = ['CS 438']
        elif 'CS 425' in prerequisite:
            prerequisites[i] = ['CS 425']
        elif 'CS 433' in prerequisite:
            prerequisites[i] = ['CS 433']
        elif 'CS 341' in prerequisite:
            prerequisites[i] = ['CS 341']
        elif 'CS 428' in prerequisite:
            prerequisites[i] = ['CS 428']
        elif 'CS 420' in prerequisite:
            prerequisites[i] = ['CS 420']
        elif 'CS 423' in prerequisite:
            prerequisites[i] = ['CS 423']
        elif 'CS 233' in prerequisite:
            prerequisites[i] = ['CS 233']
        elif 'CS 427' in prerequisite:
            prerequisites[i] = ['CS 427']
        elif 'CS 128' in prerequisite:
            prerequisites[i] = ['CS 128']
        elif 'CS 418' in prerequisite:
            prerequisites[i] = ['CS 418']
        elif 'CS 314' in prerequisite:
            prerequisites[i] = ['CS 314']

    return prerequisites


def build_prerequisites_list(course_text, course_code_space):
    '''
    Returns a list with the prerequisites (each item is a course code or a group of courses) from a given
    text.

    Parameters:
        course_text(str): Text from the HTML course block.
        course_code_space(str): Code for the course that's being evaluated.

    Returns:
        prerequisites(list): All the course codes or groups.
    '''
    
    # These courses prerequisites are separated by commas instead of semicolons.
    commas_courses = ['CS 583', 'CS 586', 'CS 588']

    # Variable to store results.
    prerequisites = []

    # Split by semicolons and clean with string methods.
    if course_code_space not in commas_courses:
        extract_prerequisites_list = course_text.split('Prerequisite:')[1].replace('\xa0', ' ').replace('\n', '').replace('and', ';').split(';')

     # Split by commas and clean with string methods.
    else:
        extract_prerequisites_list = course_text.split('Prerequisite:')[1].replace('\xa0', ' ').replace('\n', '').replace('and', ';').split(',')

    # Regex to match uppercase letters followed by digits. Apply to each item from split course text.
    pattern = r'\b[A-Z]+ [0-9]+'
    for prerequisite in extract_prerequisites_list:
        matches = re.findall(pattern, prerequisite)
        prerequisites.append(matches)

    # Remoove the actual course if it exists in prerequisites. This could happen because of the regex pattern that finds
    # any course.
    for prerequisite in prerequisites:
        for individual_course in prerequisite:
            if individual_course == course_code_space:
                prerequisite.remove(individual_course)

    # Reduce to one course.
    prerequisites = reduce_prerequisites_to_one_course(prerequisites)

    # Check for empty lists and remove duplicate lists.
    prerequisites = remove_duplicates_and_empty_lists(prerequisites)

    # Reduce to a list
    prerequisites_output = [i[0] for i in prerequisites]

    return prerequisites_output



def build_courses_dictionary():
    '''
    Builds a dictionary that contains all courses and their elements.

    Returns:
        course_dictionary(dict): A dictionary of dictionaries where each element is a dict that contains
                                 relevant course information (code, title and prerequisites).
    
    Example (extract from result):
        >>> build_courses_dictionary()
        {
        'CS 425': {'Course Code': 'CS425',
        'Course Code Space': 'CS 425',
        'Course Title': 'Distributed Systems',
        'Prerequisites': ['CS 341']},

        'CS 426': {'Course Code': 'CS426',
        'Course Code Space': 'CS 426',
        'Course Title': 'Compiler Construction',
        'Prerequisites': ['CS 421']},

        'CS 427': {'Course Code': 'CS427',
        'Course Code Space': 'CS 427',
        'Course Title': 'Software Engineering I',
        'Prerequisites': ['CS 341']},
        
        'CS 428': {'Course Code': 'CS428',
        'Course Code Space': 'CS 428',
        'Course Title': 'Software Engineering II',
        'Prerequisites': ['CS 427']}
        }

    '''

    catalog_url = 'https://catalog.illinois.edu/courses-of-instruction/cs/'

    # Get HTML file from URL.
    soup = get_soup_from_url(catalog_url)

    # Get each HTML course block.
    courses_list = get_list_from_tag_and_class(soup, 'div', 'courseblock')

    # Variable to store results.
    course_dictionary = {}


    # Iterate through each course.
    for course in courses_list:

        # Extract all text from course block.
        course_text = course.text

        # Get some items of the final JSON using strings methods.
        course_code = course_text[:7].replace('\xa0', '').replace('\n', '')
        course_code_space = course_text[:7].replace('\xa0', ' ').replace('\n', '')
        course_title = course_text.split('\u2002')[1].strip()

        # Check for prerequisites.
        has_prerequisite = 'Prerequisite:' in course_text

        # Check course has missing description.
        missing_description = check_missing_description(course_text, course_code_space)

        # Change course text and has prerequisities if it's missing a description.
        if missing_description:
            course_text, has_prerequisite = pull_missing_description_course(course)
            #print(f'{course_code} - {course_title} --> {course_text}')

        # Build prerequisites list.
        prerequisites = []
        if has_prerequisite:
            prerequisites = build_prerequisites_list(course_text, course_code_space)


        #print(f'{course_code} - {course_title} --> {prerequisites}')

        # Build individual dictionary for course and append to final data.
        course_dict = {
                'Course Code':course_code,
                'Course Code Space':course_code_space,
                'Course Title':course_title,
                'Prerequisites':prerequisites
            }

        course_dictionary[course_code_space] = course_dict

    return course_dictionary

def create_courses_json():
    '''
    Creates a JSON file in the current path with all the courses.
    '''
    # Get courses dictionary
    json_data = build_courses_dictionary()

    # Open a file in write mode and dump the data.
    file_name = 'data.json'
    with open(file_name, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)

if __name__ == "__main__":
    create_courses_json()