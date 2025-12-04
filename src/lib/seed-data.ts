import { supabase } from './supabase';

export async function seedDatabase() {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('User must be logged in to seed data');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile) {
      console.error('Profile not found');
      return;
    }

    const courses = [
      {
        title: 'Python Programming - Complete Course',
        slug: 'python-programming',
        short_description: 'Master Python from basics to advanced. Learn syntax, data structures, OOP, file handling, and more.',
        description: `# Python Programming - Complete Course

A comprehensive guide to Python programming for beginners and intermediate learners.

## What You'll Learn

### Part 1: Python Basics
- Introduction to Python
- Variables and Data Types
- Operators and Expressions
- Input and Output
- Comments and Indentation

### Part 2: Control Flow
- if-else statements
- for loops
- while loops
- break and continue
- pass statement

### Part 3: Data Structures
- Lists and List Methods
- Tuples
- Sets
- Dictionaries
- List Comprehensions

### Part 4: Functions
- Defining Functions
- Parameters and Arguments
- Return Values
- Lambda Functions
- Scope and Closures

### Part 5: Object-Oriented Programming
- Classes and Objects
- Constructors
- Inheritance
- Polymorphism
- Encapsulation

### Part 6: Advanced Topics
- File Handling
- Exception Handling
- Modules and Packages
- Regular Expressions
- Decorators

## Prerequisites
No programming experience required!`,
        thumbnail_url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
        price: 0,
        level: 'beginner',
        category: 'data-engineering',
        instructor_id: user.id,
        is_published: true,
      },
      {
        title: 'SQL Tutorial - Complete Guide',
        slug: 'sql-tutorial',
        short_description: 'Learn SQL from scratch with hands-on examples. Master SELECT, JOIN, filtering, and database fundamentals.',
        description: `# SQL Tutorial - Complete Guide

A comprehensive, beginner-friendly guide to SQL.

## What You'll Learn

### Part 1: Getting Started
- What is SQL?
- Database Basics
- SQL Syntax
- Your First Query

### Part 2: Basic Queries
- SELECT Statement
- WHERE Clause
- ORDER BY
- LIMIT and OFFSET
- DISTINCT

### Part 3: Filtering Data
- Comparison Operators
- Logical Operators (AND, OR, NOT)
- IN and BETWEEN
- LIKE and Wildcards
- NULL Handling

### Part 4: Joining Tables
- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL OUTER JOIN
- CROSS JOIN
- Self Joins

### Part 5: Aggregate Functions
- COUNT, SUM, AVG
- MIN and MAX
- GROUP BY
- HAVING Clause

### Part 6: Data Manipulation
- INSERT INTO
- UPDATE
- DELETE
- Data Types

## Prerequisites
No SQL experience required!`,
        thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        price: 0,
        level: 'beginner',
        category: 'data-engineering',
        instructor_id: user.id,
        is_published: true,
      },
      {
        title: 'Advanced SQL Techniques',
        slug: 'advanced-sql',
        short_description: 'Master advanced SQL: window functions, CTEs, subqueries, query optimization, and complex analytical queries.',
        description: `# Advanced SQL Techniques

Take your SQL skills to a professional level.

## What You'll Learn

### Part 1: Subqueries
- Scalar Subqueries
- Row Subqueries
- Table Subqueries
- Correlated Subqueries
- EXISTS and NOT EXISTS

### Part 2: Window Functions
- ROW_NUMBER
- RANK and DENSE_RANK
- NTILE
- LAG and LEAD
- FIRST_VALUE and LAST_VALUE
- Running Totals
- Moving Averages

### Part 3: Common Table Expressions (CTEs)
- Basic CTEs
- Multiple CTEs
- Recursive CTEs
- When to Use CTEs

### Part 4: Advanced Joins
- Multiple Table Joins
- Join Optimization
- Set Operations (UNION, INTERSECT, EXCEPT)

### Part 5: Query Optimization
- Indexes
- Execution Plans
- Query Performance
- Best Practices

### Part 6: Advanced Techniques
- Pivot and Unpivot
- CASE Statements
- Stored Procedures
- Views and Materialized Views

## Prerequisites
Basic SQL knowledge required.`,
        thumbnail_url: 'https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg',
        price: 0,
        level: 'advanced',
        category: 'data-engineering',
        instructor_id: user.id,
        is_published: true,
      },
    ];

    console.log('Inserting courses...');
    const { data: insertedCourses, error: coursesError } = await supabase
      .from('courses')
      .upsert(courses, { onConflict: 'slug' })
      .select();

    if (coursesError) throw coursesError;

    if (!insertedCourses || insertedCourses.length === 0) {
      console.error('No courses were inserted');
      return;
    }

    console.log(`Inserted ${insertedCourses.length} courses`);

    const pythonCourse = insertedCourses.find(c => c.slug === 'python-programming');
    const sqlCourse = insertedCourses.find(c => c.slug === 'sql-tutorial');
    const advancedSqlCourse = insertedCourses.find(c => c.slug === 'advanced-sql');

    const pythonLessons = pythonCourse ? [
      {
        course_id: pythonCourse.id,
        title: 'Introduction to Python',
        slug: 'intro-to-python',
        content: `# Introduction to Python

Python is a high-level, interpreted programming language known for its simplicity and readability.

## Why Learn Python?

- **Easy to Learn**: Python has a simple syntax similar to English
- **Versatile**: Used in web development, data science, automation, AI, and more
- **Large Community**: Extensive libraries and frameworks
- **High Demand**: One of the most sought-after programming languages

## Installing Python

Visit [python.org](https://www.python.org/) to download Python for your operating system.

## Your First Program

\`\`\`python
print("Hello, World!")
\`\`\`

Try running this in the editor below!`,
        order_index: 1,
        duration_minutes: 10,
        has_code_exercise: true,
      },
      {
        course_id: pythonCourse.id,
        title: 'Variables and Data Types',
        slug: 'variables-data-types',
        content: `# Variables and Data Types

Variables store data values. Python has several built-in data types.

## Creating Variables

\`\`\`python
name = "John"
age = 25
height = 5.9
is_student = True
\`\`\`

## Data Types

- **str**: String (text)
- **int**: Integer (whole numbers)
- **float**: Floating point (decimals)
- **bool**: Boolean (True/False)

## Type Checking

\`\`\`python
x = 5
print(type(x))  # <class 'int'>
\`\`\`

## Practice Exercise

Create variables for your name, age, and favorite number, then print them.

\`\`\`python
# Write your code here
name = "Your Name"
age = 0
favorite_number = 0

print(f"My name is {name}")
print(f"I am {age} years old")
print(f"My favorite number is {favorite_number}")
\`\`\``,
        order_index: 2,
        duration_minutes: 15,
        has_code_exercise: true,
      },
      {
        course_id: pythonCourse.id,
        title: 'Operators in Python',
        slug: 'operators',
        content: `# Operators in Python

Operators are used to perform operations on variables and values.

## Arithmetic Operators

\`\`\`python
a = 10
b = 3

print(a + b)   # Addition: 13
print(a - b)   # Subtraction: 7
print(a * b)   # Multiplication: 30
print(a / b)   # Division: 3.333...
print(a // b)  # Floor Division: 3
print(a % b)   # Modulus: 1
print(a ** b)  # Exponentiation: 1000
\`\`\`

## Comparison Operators

\`\`\`python
x = 5
y = 10

print(x == y)  # Equal: False
print(x != y)  # Not equal: True
print(x < y)   # Less than: True
print(x > y)   # Greater than: False
print(x <= y)  # Less than or equal: True
print(x >= y)  # Greater than or equal: False
\`\`\`

## Logical Operators

\`\`\`python
a = True
b = False

print(a and b)  # False
print(a or b)   # True
print(not a)    # False
\`\`\``,
        order_index: 3,
        duration_minutes: 20,
        has_code_exercise: true,
      },
      {
        course_id: pythonCourse.id,
        title: 'Conditional Statements',
        slug: 'conditionals',
        content: `# Conditional Statements

Use if-else statements to make decisions in your code.

## if Statement

\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
\`\`\`

## if-else Statement

\`\`\`python
age = 16

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
\`\`\`

## if-elif-else Statement

\`\`\`python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

## Practice Exercise

Write a program that checks if a number is positive, negative, or zero.

\`\`\`python
number = 5

# Write your code here
\`\`\``,
        order_index: 4,
        duration_minutes: 20,
        has_code_exercise: true,
      },
      {
        course_id: pythonCourse.id,
        title: 'Loops in Python',
        slug: 'loops',
        content: `# Loops in Python

Loops let you repeat code multiple times.

## for Loop

\`\`\`python
# Loop through a range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## while Loop

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## break and continue

\`\`\`python
# break - exit the loop
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - skip current iteration
for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4
\`\`\`

## Practice Exercise

Print all even numbers from 1 to 20.

\`\`\`python
# Write your code here
\`\`\``,
        order_index: 5,
        duration_minutes: 25,
        has_code_exercise: true,
      },
      {
        course_id: pythonCourse.id,
        title: 'Lists in Python',
        slug: 'lists',
        content: `# Lists in Python

Lists store multiple items in a single variable.

## Creating Lists

\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
\`\`\`

## Accessing List Items

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])   # apple
print(fruits[-1])  # cherry (last item)
\`\`\`

## List Methods

\`\`\`python
fruits = ["apple", "banana"]

# Add items
fruits.append("cherry")      # ["apple", "banana", "cherry"]
fruits.insert(1, "orange")   # ["apple", "orange", "banana", "cherry"]

# Remove items
fruits.remove("banana")      # Remove by value
fruits.pop()                 # Remove last item
fruits.pop(0)                # Remove by index

# Other methods
len(fruits)                  # Get length
fruits.sort()                # Sort list
fruits.reverse()             # Reverse list
\`\`\`

## List Slicing

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4])    # [1, 2, 3]
print(numbers[:3])     # [0, 1, 2]
print(numbers[3:])     # [3, 4, 5]
print(numbers[::2])    # [0, 2, 4] (every 2nd item)
\`\`\``,
        order_index: 6,
        duration_minutes: 30,
        has_code_exercise: true,
      },
      {
        course_id: pythonCourse.id,
        title: 'Functions in Python',
        slug: 'functions',
        content: `# Functions in Python

Functions are reusable blocks of code.

## Defining Functions

\`\`\`python
def greet():
    print("Hello!")

greet()  # Call the function
\`\`\`

## Functions with Parameters

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
\`\`\`

## Return Values

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
\`\`\`

## Default Parameters

\`\`\`python
def greet(name="Guest"):
    print(f"Hello, {name}!")

greet()           # Hello, Guest!
greet("Alice")    # Hello, Alice!
\`\`\`

## Lambda Functions

\`\`\`python
# Short anonymous functions
square = lambda x: x ** 2
print(square(5))  # 25

add = lambda a, b: a + b
print(add(3, 4))  # 7
\`\`\`

## Practice Exercise

Write a function that takes a list of numbers and returns their average.

\`\`\`python
def calculate_average(numbers):
    # Write your code here
    pass

# Test your function
print(calculate_average([10, 20, 30, 40]))  # Should print 25
\`\`\``,
        order_index: 7,
        duration_minutes: 30,
        has_code_exercise: true,
      },
      {
        course_id: pythonCourse.id,
        title: 'Dictionaries in Python',
        slug: 'dictionaries',
        content: `# Dictionaries in Python

Dictionaries store data in key-value pairs.

## Creating Dictionaries

\`\`\`python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
\`\`\`

## Accessing Values

\`\`\`python
print(person["name"])        # John
print(person.get("age"))     # 30
print(person.get("email", "Not found"))  # Not found (default value)
\`\`\`

## Modifying Dictionaries

\`\`\`python
# Add or update
person["email"] = "john@example.com"
person["age"] = 31

# Remove
del person["city"]
person.pop("age")

# Get all keys and values
print(person.keys())
print(person.values())
print(person.items())
\`\`\`

## Looping Through Dictionaries

\`\`\`python
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\``,
        order_index: 8,
        duration_minutes: 25,
        has_code_exercise: true,
      },
    ] : [];

    const sqlLessons = sqlCourse ? [
      {
        course_id: sqlCourse.id,
        title: 'Introduction to SQL',
        slug: 'intro-to-sql',
        content: `# Introduction to SQL

SQL (Structured Query Language) is used to communicate with databases.

## What is SQL?

SQL is a standard language for:
- Retrieving data from databases
- Inserting, updating, and deleting data
- Creating and modifying database structures
- Managing database security

## Database Basics

- **Database**: Collection of organized data
- **Table**: Structure that holds data in rows and columns
- **Row**: Single record in a table
- **Column**: Field in a table

## Your First Query

\`\`\`sql
SELECT * FROM customers;
\`\`\`

This retrieves all columns and rows from the customers table.

## SQL Syntax Rules

- SQL keywords are NOT case-sensitive
- Semicolon (;) ends statements
- Use single quotes for text values
- Comments: -- for single line, /* */ for multi-line`,
        order_index: 1,
        duration_minutes: 15,
        has_code_exercise: true,
      },
      {
        course_id: sqlCourse.id,
        title: 'SELECT Statement',
        slug: 'select-statement',
        content: `# SELECT Statement

The SELECT statement retrieves data from a database.

## Basic Syntax

\`\`\`sql
SELECT column1, column2 FROM table_name;
\`\`\`

## Select All Columns

\`\`\`sql
SELECT * FROM customers;
\`\`\`

## Select Specific Columns

\`\`\`sql
SELECT first_name, last_name, email FROM customers;
\`\`\`

## Column Aliases

\`\`\`sql
SELECT
    first_name AS "First Name",
    last_name AS "Last Name"
FROM customers;
\`\`\`

## Practice Exercise

Write a query to select the product name and price from a products table.

\`\`\`sql
-- Write your query here
\`\`\``,
        order_index: 2,
        duration_minutes: 20,
        has_code_exercise: true,
      },
      {
        course_id: sqlCourse.id,
        title: 'WHERE Clause',
        slug: 'where-clause',
        content: `# WHERE Clause

The WHERE clause filters records based on conditions.

## Basic Syntax

\`\`\`sql
SELECT * FROM customers
WHERE country = 'USA';
\`\`\`

## Comparison Operators

\`\`\`sql
-- Equal to
SELECT * FROM products WHERE price = 100;

-- Greater than
SELECT * FROM products WHERE price > 50;

-- Less than or equal to
SELECT * FROM products WHERE stock <= 10;

-- Not equal to
SELECT * FROM customers WHERE country != 'USA';
-- or
SELECT * FROM customers WHERE country <> 'USA';
\`\`\`

## Text Matching

\`\`\`sql
-- Exact match
SELECT * FROM customers WHERE city = 'New York';

-- Pattern matching with LIKE
SELECT * FROM customers WHERE email LIKE '%@gmail.com';
SELECT * FROM products WHERE name LIKE 'Apple%';
\`\`\`

## Practice Exercise

Find all customers from California with age greater than 25.

\`\`\`sql
-- Write your query here
\`\`\``,
        order_index: 3,
        duration_minutes: 25,
        has_code_exercise: true,
      },
      {
        course_id: sqlCourse.id,
        title: 'Logical Operators',
        slug: 'logical-operators',
        content: `# Logical Operators

Combine multiple conditions using AND, OR, and NOT.

## AND Operator

Both conditions must be true.

\`\`\`sql
SELECT * FROM products
WHERE price > 50 AND category = 'Electronics';
\`\`\`

## OR Operator

At least one condition must be true.

\`\`\`sql
SELECT * FROM customers
WHERE country = 'USA' OR country = 'Canada';
\`\`\`

## NOT Operator

Negates a condition.

\`\`\`sql
SELECT * FROM products
WHERE NOT category = 'Electronics';
\`\`\`

## Combining Operators

\`\`\`sql
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Computers')
  AND price < 1000;
\`\`\`

## IN Operator

\`\`\`sql
SELECT * FROM customers
WHERE country IN ('USA', 'Canada', 'Mexico');
\`\`\`

## BETWEEN Operator

\`\`\`sql
SELECT * FROM products
WHERE price BETWEEN 50 AND 200;
\`\`\``,
        order_index: 4,
        duration_minutes: 25,
        has_code_exercise: true,
      },
      {
        course_id: sqlCourse.id,
        title: 'ORDER BY Clause',
        slug: 'order-by',
        content: `# ORDER BY Clause

Sort query results in ascending or descending order.

## Basic Syntax

\`\`\`sql
SELECT * FROM customers
ORDER BY last_name;
\`\`\`

## Ascending Order (Default)

\`\`\`sql
SELECT * FROM products
ORDER BY price ASC;
\`\`\`

## Descending Order

\`\`\`sql
SELECT * FROM products
ORDER BY price DESC;
\`\`\`

## Multiple Columns

\`\`\`sql
SELECT * FROM customers
ORDER BY country ASC, last_name DESC;
\`\`\`

## Order by Column Position

\`\`\`sql
SELECT first_name, last_name, age FROM customers
ORDER BY 3 DESC;  -- Orders by the 3rd column (age)
\`\`\``,
        order_index: 5,
        duration_minutes: 20,
        has_code_exercise: true,
      },
      {
        course_id: sqlCourse.id,
        title: 'Aggregate Functions',
        slug: 'aggregate-functions',
        content: `# Aggregate Functions

Perform calculations on sets of values.

## COUNT

\`\`\`sql
SELECT COUNT(*) FROM customers;
SELECT COUNT(DISTINCT country) FROM customers;
\`\`\`

## SUM

\`\`\`sql
SELECT SUM(price) FROM products;
\`\`\`

## AVG

\`\`\`sql
SELECT AVG(price) FROM products;
\`\`\`

## MIN and MAX

\`\`\`sql
SELECT MIN(price) FROM products;
SELECT MAX(price) FROM products;
\`\`\`

## Using with WHERE

\`\`\`sql
SELECT AVG(price) FROM products
WHERE category = 'Electronics';
\`\`\`

## Practice Exercise

Find the total number of orders and the average order amount.

\`\`\`sql
-- Write your query here
\`\`\``,
        order_index: 6,
        duration_minutes: 25,
        has_code_exercise: true,
      },
      {
        course_id: sqlCourse.id,
        title: 'GROUP BY Clause',
        slug: 'group-by',
        content: `# GROUP BY Clause

Group rows that have the same values in specified columns.

## Basic Syntax

\`\`\`sql
SELECT country, COUNT(*)
FROM customers
GROUP BY country;
\`\`\`

## Multiple Columns

\`\`\`sql
SELECT country, city, COUNT(*) as customer_count
FROM customers
GROUP BY country, city;
\`\`\`

## With Aggregate Functions

\`\`\`sql
SELECT category, AVG(price) as avg_price
FROM products
GROUP BY category;
\`\`\`

## HAVING Clause

Filter groups (WHERE filters rows).

\`\`\`sql
SELECT country, COUNT(*) as customer_count
FROM customers
GROUP BY country
HAVING COUNT(*) > 5;
\`\`\`

## Practice Exercise

Find categories with more than 10 products and average price over 50.

\`\`\`sql
-- Write your query here
\`\`\``,
        order_index: 7,
        duration_minutes: 30,
        has_code_exercise: true,
      },
      {
        course_id: sqlCourse.id,
        title: 'INNER JOIN',
        slug: 'inner-join',
        content: `# INNER JOIN

Combine rows from two tables based on a related column.

## Basic Syntax

\`\`\`sql
SELECT orders.order_id, customers.first_name, customers.last_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;
\`\`\`

## Table Aliases

\`\`\`sql
SELECT o.order_id, c.first_name, c.last_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;
\`\`\`

## Joining Multiple Tables

\`\`\`sql
SELECT o.order_id, c.first_name, p.product_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;
\`\`\`

## Practice Exercise

Join orders and customers tables to show all orders with customer names.

\`\`\`sql
-- Write your query here
\`\`\``,
        order_index: 8,
        duration_minutes: 30,
        has_code_exercise: true,
      },
    ] : [];

    const advancedSqlLessons = advancedSqlCourse ? [
      {
        course_id: advancedSqlCourse.id,
        title: 'Subqueries',
        slug: 'subqueries',
        content: `# Subqueries

A query nested inside another query.

## Scalar Subquery

Returns a single value.

\`\`\`sql
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

## Subquery in IN Clause

\`\`\`sql
SELECT * FROM customers
WHERE customer_id IN (
    SELECT DISTINCT customer_id FROM orders
    WHERE order_date >= '2024-01-01'
);
\`\`\`

## Subquery in FROM Clause

\`\`\`sql
SELECT category, avg_price
FROM (
    SELECT category, AVG(price) as avg_price
    FROM products
    GROUP BY category
) AS category_averages
WHERE avg_price > 100;
\`\`\`

## Correlated Subquery

References the outer query.

\`\`\`sql
SELECT p1.product_name, p1.category, p1.price
FROM products p1
WHERE p1.price > (
    SELECT AVG(p2.price)
    FROM products p2
    WHERE p2.category = p1.category
);
\`\`\``,
        order_index: 1,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: advancedSqlCourse.id,
        title: 'Window Functions - ROW_NUMBER',
        slug: 'window-row-number',
        content: `# Window Functions - ROW_NUMBER

Assign unique numbers to rows within a partition.

## Basic Syntax

\`\`\`sql
SELECT
    product_name,
    category,
    price,
    ROW_NUMBER() OVER (ORDER BY price DESC) as row_num
FROM products;
\`\`\`

## Partitioning

\`\`\`sql
SELECT
    product_name,
    category,
    price,
    ROW_NUMBER() OVER (
        PARTITION BY category
        ORDER BY price DESC
    ) as rank_in_category
FROM products;
\`\`\`

## Finding Top N per Group

\`\`\`sql
WITH ranked_products AS (
    SELECT
        product_name,
        category,
        price,
        ROW_NUMBER() OVER (
            PARTITION BY category
            ORDER BY price DESC
        ) as rank
    FROM products
)
SELECT * FROM ranked_products
WHERE rank <= 3;
\`\`\``,
        order_index: 2,
        duration_minutes: 40,
        has_code_exercise: true,
      },
      {
        course_id: advancedSqlCourse.id,
        title: 'Window Functions - RANK and DENSE_RANK',
        slug: 'window-rank',
        content: `# RANK and DENSE_RANK

Assign rankings to rows, handling ties differently.

## RANK

Gaps in ranking after ties.

\`\`\`sql
SELECT
    product_name,
    price,
    RANK() OVER (ORDER BY price DESC) as rank
FROM products;

-- Results:
-- Product A, 100, 1
-- Product B, 100, 1
-- Product C, 90, 3 (gap after tie)
\`\`\`

## DENSE_RANK

No gaps in ranking.

\`\`\`sql
SELECT
    product_name,
    price,
    DENSE_RANK() OVER (ORDER BY price DESC) as dense_rank
FROM products;

-- Results:
-- Product A, 100, 1
-- Product B, 100, 1
-- Product C, 90, 2 (no gap)
\`\`\`

## Comparison

\`\`\`sql
SELECT
    product_name,
    price,
    ROW_NUMBER() OVER (ORDER BY price DESC) as row_num,
    RANK() OVER (ORDER BY price DESC) as rank,
    DENSE_RANK() OVER (ORDER BY price DESC) as dense_rank
FROM products;
\`\`\``,
        order_index: 3,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: advancedSqlCourse.id,
        title: 'LAG and LEAD Functions',
        slug: 'lag-lead',
        content: `# LAG and LEAD Functions

Access data from previous or next rows.

## LAG Function

Access previous row value.

\`\`\`sql
SELECT
    order_date,
    total_amount,
    LAG(total_amount) OVER (ORDER BY order_date) as previous_amount,
    total_amount - LAG(total_amount) OVER (ORDER BY order_date) as difference
FROM orders;
\`\`\`

## LEAD Function

Access next row value.

\`\`\`sql
SELECT
    order_date,
    total_amount,
    LEAD(total_amount) OVER (ORDER BY order_date) as next_amount
FROM orders;
\`\`\`

## With Offset and Default

\`\`\`sql
SELECT
    order_date,
    total_amount,
    LAG(total_amount, 1, 0) OVER (ORDER BY order_date) as prev_amount,
    LEAD(total_amount, 2, 0) OVER (ORDER BY order_date) as two_ahead
FROM orders;
\`\`\``,
        order_index: 4,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: advancedSqlCourse.id,
        title: 'Running Totals and Moving Averages',
        slug: 'running-totals',
        content: `# Running Totals and Moving Averages

Calculate cumulative values and moving averages.

## Running Total

\`\`\`sql
SELECT
    order_date,
    total_amount,
    SUM(total_amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as running_total
FROM orders;
\`\`\`

## Shorter Syntax

\`\`\`sql
SELECT
    order_date,
    total_amount,
    SUM(total_amount) OVER (ORDER BY order_date) as running_total
FROM orders;
\`\`\`

## Moving Average (3-day)

\`\`\`sql
SELECT
    order_date,
    total_amount,
    AVG(total_amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as moving_avg_3
FROM orders;
\`\`\`

## By Category

\`\`\`sql
SELECT
    category,
    order_date,
    total_amount,
    SUM(total_amount) OVER (
        PARTITION BY category
        ORDER BY order_date
    ) as category_running_total
FROM orders;
\`\`\``,
        order_index: 5,
        duration_minutes: 40,
        has_code_exercise: true,
      },
      {
        course_id: advancedSqlCourse.id,
        title: 'Common Table Expressions (CTEs)',
        slug: 'ctes',
        content: `# Common Table Expressions (CTEs)

Named temporary result sets for complex queries.

## Basic CTE

\`\`\`sql
WITH high_value_customers AS (
    SELECT customer_id, SUM(total_amount) as total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(total_amount) > 1000
)
SELECT c.first_name, c.last_name, h.total_spent
FROM high_value_customers h
JOIN customers c ON h.customer_id = c.customer_id;
\`\`\`

## Multiple CTEs

\`\`\`sql
WITH
customer_totals AS (
    SELECT customer_id, SUM(total_amount) as total_spent
    FROM orders
    GROUP BY customer_id
),
avg_spending AS (
    SELECT AVG(total_spent) as avg_amount
    FROM customer_totals
)
SELECT c.first_name, ct.total_spent
FROM customer_totals ct
JOIN customers c ON ct.customer_id = c.customer_id
WHERE ct.total_spent > (SELECT avg_amount FROM avg_spending);
\`\`\`

## Recursive CTE

For hierarchical data.

\`\`\`sql
WITH RECURSIVE employee_hierarchy AS (
    -- Anchor: top-level employees
    SELECT employee_id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: employees reporting to previous level
    SELECT e.employee_id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy;
\`\`\``,
        order_index: 6,
        duration_minutes: 45,
        has_code_exercise: true,
      },
      {
        course_id: advancedSqlCourse.id,
        title: 'CASE Statements',
        slug: 'case-statements',
        content: `# CASE Statements

Conditional logic in SQL.

## Simple CASE

\`\`\`sql
SELECT
    product_name,
    price,
    CASE
        WHEN price < 50 THEN 'Budget'
        WHEN price < 200 THEN 'Mid-Range'
        ELSE 'Premium'
    END as price_category
FROM products;
\`\`\`

## Searched CASE

\`\`\`sql
SELECT
    order_id,
    total_amount,
    CASE
        WHEN total_amount > 1000 THEN 'Large'
        WHEN total_amount > 500 THEN 'Medium'
        WHEN total_amount > 100 THEN 'Small'
        ELSE 'Tiny'
    END as order_size
FROM orders;
\`\`\`

## CASE in Aggregations

\`\`\`sql
SELECT
    category,
    COUNT(*) as total_products,
    SUM(CASE WHEN price < 100 THEN 1 ELSE 0 END) as budget_count,
    SUM(CASE WHEN price >= 100 THEN 1 ELSE 0 END) as premium_count
FROM products
GROUP BY category;
\`\`\`

## CASE in ORDER BY

\`\`\`sql
SELECT product_name, category
FROM products
ORDER BY
    CASE category
        WHEN 'Electronics' THEN 1
        WHEN 'Computers' THEN 2
        ELSE 3
    END;
\`\`\``,
        order_index: 7,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: advancedSqlCourse.id,
        title: 'Query Optimization',
        slug: 'query-optimization',
        content: `# Query Optimization

Improve query performance.

## Using Indexes

\`\`\`sql
-- Create index
CREATE INDEX idx_customer_email ON customers(email);

-- Index on multiple columns
CREATE INDEX idx_order_customer_date
ON orders(customer_id, order_date);
\`\`\`

## Explain Query Plans

\`\`\`sql
EXPLAIN SELECT * FROM orders
WHERE customer_id = 123;

EXPLAIN ANALYZE SELECT * FROM orders
JOIN customers ON orders.customer_id = customers.customer_id;
\`\`\`

## Optimization Tips

### 1. Use WHERE Instead of HAVING

\`\`\`sql
-- Bad
SELECT category, COUNT(*)
FROM products
GROUP BY category
HAVING category = 'Electronics';

-- Good
SELECT category, COUNT(*)
FROM products
WHERE category = 'Electronics'
GROUP BY category;
\`\`\`

### 2. Avoid SELECT *

\`\`\`sql
-- Bad
SELECT * FROM customers;

-- Good
SELECT customer_id, first_name, last_name FROM customers;
\`\`\`

### 3. Use EXISTS Instead of IN for Subqueries

\`\`\`sql
-- Good
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.customer_id
);
\`\`\`

### 4. Limit Result Sets

\`\`\`sql
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 100;
\`\`\``,
        order_index: 8,
        duration_minutes: 40,
        has_code_exercise: false,
      },
    ] : [];

    const allLessons = [...pythonLessons, ...sqlLessons, ...advancedSqlLessons];

    if (allLessons.length > 0) {
      console.log('Inserting lessons...');
      const { error: lessonsError } = await supabase
        .from('lessons')
        .upsert(allLessons, { onConflict: 'slug' });

      if (lessonsError) throw lessonsError;
      console.log(`Inserted ${allLessons.length} lessons`);
    }

    console.log('✅ Database seeded successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
