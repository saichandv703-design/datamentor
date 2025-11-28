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
      .single();

    if (!profile) {
      console.error('Profile not found');
      return;
    }

    const courses = [
      {
        title: 'SQL Tutorial - Complete Guide',
        slug: 'sql-tutorial',
        short_description: 'Learn SQL from scratch with hands-on examples. Master SELECT, JOIN, filtering, and database fundamentals.',
        description: `# SQL Tutorial - Complete Guide

A comprehensive, beginner-friendly guide to SQL following a structured learning path.

## Course Overview

This tutorial will take you from SQL beginner to confident practitioner through clear explanations and practical examples.

## What You'll Learn

### Part 1: Getting Started
- What is SQL and why learn it
- Database fundamentals
- Your first queries

### Part 2: Core SELECT Operations
- Basic SELECT syntax
- Filtering with WHERE
- Sorting and limiting results
- Working with NULL values

### Part 3: Multiple Tables
- Understanding relationships
- INNER JOIN, LEFT JOIN, RIGHT JOIN
- Multiple table joins
- Table aliases

### Part 4: Aggregations
- COUNT, SUM, AVG, MIN, MAX
- GROUP BY for summaries
- HAVING for filtering groups

### Part 5: Data Manipulation
- INSERT new records
- UPDATE existing data
- DELETE operations

## Prerequisites

No prior SQL or database experience required! Just bring curiosity and willingness to practice.`,
        thumbnail_url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
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

Take your SQL skills to a professional level with advanced techniques used in real-world data engineering and analytics.

## Course Overview

Learn the powerful SQL features that separate beginners from experts.

## What You'll Learn

### Window Functions
- ROW_NUMBER, RANK, DENSE_RANK
- LEAD and LAG for time-series analysis
- Moving averages and running totals
- PARTITION BY for grouped calculations

### Common Table Expressions (CTEs)
- Simplifying complex queries
- Recursive CTEs for hierarchical data
- Multiple CTEs in one query
- When to use CTEs vs subqueries

### Subqueries Mastery
- Correlated subqueries
- Subqueries in SELECT, FROM, WHERE
- EXISTS and NOT EXISTS
- Performance considerations

### Query Optimization
- Understanding execution plans
- Index strategies
- Query rewriting techniques
- Common performance pitfalls

### Advanced Joins
- Self-joins
- CROSS JOIN
- Multiple join conditions
- Join vs subquery performance

### Analytical Queries
- Cohort analysis
- Pivot and unpivot
- Time-series analysis
- Statistical functions

## Prerequisites

Strong foundation in basic SQL (SELECT, JOIN, GROUP BY). Complete "SQL Tutorial" course first.`,
        thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        price: 39.99,
        level: 'advanced',
        category: 'data-engineering',
        instructor_id: user.id,
        is_published: true,
      },
      {
        title: 'Python Programming Fundamentals',
        slug: 'python-fundamentals',
        short_description: 'Complete Python course from basics to advanced. Learn syntax, data structures, functions, OOP, and more.',
        description: `# Python Programming Fundamentals

Complete beginner-friendly Python course covering everything from basics to advanced concepts.

## Course Overview

Master Python from ground zero through clear explanations, practical examples, and hands-on exercises.

## What You'll Learn

### Part 1: Python Basics
- Installing Python and setting up your environment
- Variables, data types, and operators
- Strings and string manipulation
- Input/output operations
- Comments and code style

### Part 2: Control Flow
- Conditional statements (if, elif, else)
- Comparison and logical operators
- Loops (for, while)
- Break, continue, and pass
- List comprehensions

### Part 3: Functions
- Defining and calling functions
- Parameters and arguments
- Return values
- Lambda functions
- Scope and namespaces
- Decorators basics

### Part 4: Data Structures
- Lists and list methods
- Tuples and immutability
- Dictionaries and key-value pairs
- Sets and set operations
- Working with nested structures

### Part 5: Object-Oriented Programming
- Classes and objects
- Attributes and methods
- Inheritance and polymorphism
- Special methods
- Encapsulation

### Part 6: File Handling
- Reading and writing files
- Working with CSV and JSON
- File paths and directories
- Exception handling

### Part 7: Advanced Topics
- Modules and packages
- Error handling with try-except
- Working with dates and times
- Regular expressions basics
- Virtual environments

## Prerequisites

No prior programming experience required! Just bring curiosity and willingness to practice.`,
        thumbnail_url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
        price: 0,
        level: 'beginner',
        category: 'ai-ml',
        instructor_id: user.id,
        is_published: true,
      },
      {
        title: 'Python for Data Science',
        slug: 'python-data-science',
        short_description: 'Learn Python for data analysis using pandas, NumPy, matplotlib. Real-world projects included.',
        description: `# Python for Data Science

Master Python libraries essential for data analysis and data science workflows.

## What You'll Learn

### Data Analysis with Pandas
- DataFrames and Series
- Reading CSV, Excel, JSON files
- Data cleaning and preprocessing
- Filtering, sorting, grouping
- Merging and joining datasets
- Time series analysis

### Numerical Computing with NumPy
- Arrays and array operations
- Mathematical functions
- Broadcasting and vectorization
- Linear algebra basics
- Statistical operations

### Data Visualization
- Matplotlib fundamentals
- Creating line, bar, scatter plots
- Customizing plots
- Subplots and layouts
- Seaborn for statistical plots

### Real-World Projects
- Analyzing sales data
- Customer segmentation
- Time series forecasting
- A/B testing analysis

Perfect for aspiring data analysts and scientists.`,
        thumbnail_url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
        price: 49.99,
        level: 'intermediate',
        category: 'ai-ml',
        instructor_id: user.id,
        is_published: true,
      },
      {
        title: 'Data Engineering Fundamentals',
        slug: 'data-engineering-fundamentals',
        short_description: 'Learn core data engineering concepts: ETL pipelines, data warehousing, and modern data stack.',
        description: `# Data Engineering Fundamentals

Build a strong foundation in data engineering principles and practices.

## Topics Covered

- Data pipeline design
- ETL vs ELT patterns
- Data warehousing concepts
- Data quality and validation
- Modern data stack tools
- Batch vs stream processing

Learn the skills to build scalable data infrastructure.`,
        thumbnail_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
        price: 49.99,
        level: 'intermediate',
        category: 'data-engineering',
        instructor_id: user.id,
        is_published: true,
      },
      {
        title: 'Snowflake for Data Engineers',
        slug: 'snowflake-data-engineers',
        short_description: 'Master Snowflake cloud data warehouse with hands-on labs and real-world scenarios.',
        description: `# Snowflake for Data Engineers

Complete guide to Snowflake with practical, hands-on experience.

## Course Content

- Snowflake architecture
- Data loading and unloading
- Virtual warehouses
- Query optimization
- Time travel and cloning
- Streams and tasks
- Security and governance

Includes access to real Snowflake environments for practice.`,
        thumbnail_url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
        price: 99.99,
        level: 'advanced',
        category: 'cloud',
        instructor_id: user.id,
        is_published: true,
      },
    ];

    console.log('Inserting courses...');
    const { data: insertedCourses, error: coursesError } = await supabase
      .from('courses')
      .insert(courses)
      .select();

    if (coursesError) throw coursesError;
    console.log(`Inserted ${insertedCourses?.length} courses`);

    if (!insertedCourses || insertedCourses.length === 0) {
      console.error('No courses inserted');
      return;
    }

    const sqlTutorialLessons = [
      {
        course_id: insertedCourses[0].id,
        title: '1. Introduction to SQL',
        slug: 'intro-to-sql',
        content: `# Introduction to SQL

## What is SQL?

SQL (Structured Query Language) is the standard language for working with relational databases. It's used to:

- **Query** data (retrieve information)
- **Insert** new data
- **Update** existing data
- **Delete** data
- **Create** database structures

## Why Learn SQL?

1. **Universal**: Works across MySQL, PostgreSQL, SQL Server, Oracle, SQLite
2. **Essential**: Required for data analyst, data engineer, and data scientist roles
3. **Powerful**: Query millions of records in seconds
4. **Simple**: Easy to learn, read, and understand

## Database Basics

### Tables
Data is organized in **tables** (like spreadsheets):

\`\`\`
employees table:
+----+------------+-----------+------------+--------+
| id | first_name | last_name | department | salary |
+----+------------+-----------+------------+--------+
|  1 | John       | Doe       | Sales      |  50000 |
|  2 | Jane       | Smith     | Marketing  |  60000 |
|  3 | Bob        | Johnson   | IT         |  70000 |
+----+------------+-----------+------------+--------+
\`\`\`

### Key Concepts

- **Row**: A single record (one employee)
- **Column**: A specific attribute (first_name, salary)
- **Primary Key**: Unique identifier (id)
- **Foreign Key**: Links tables together

## Your First Query

Let's retrieve all data from the employees table:

\`\`\`sql
SELECT * FROM employees;
\`\`\`

**Breakdown:**
- \`SELECT\` - tells database we want to retrieve data
- \`*\` - means "all columns"
- \`FROM employees\` - specifies which table

## SQL Statement Types

### DQL - Data Query Language
- \`SELECT\` - Retrieve data

### DML - Data Manipulation Language
- \`INSERT\` - Add new records
- \`UPDATE\` - Modify records
- \`DELETE\` - Remove records

### DDL - Data Definition Language
- \`CREATE\` - Create tables/databases
- \`ALTER\` - Modify structure
- \`DROP\` - Delete tables/databases

## Try It Yourself

In the next lessons, you'll practice writing queries with real examples!`,
        order_index: 1,
        duration_minutes: 15,
        has_code_exercise: false,
      },
      {
        course_id: insertedCourses[0].id,
        title: '2. SELECT Basics',
        slug: 'select-basics',
        content: `# The SELECT Statement

## Basic Syntax

\`\`\`sql
SELECT column1, column2
FROM table_name;
\`\`\`

## Select All Columns

\`\`\`sql
SELECT * FROM employees;
\`\`\`

Returns all columns and all rows.

## Select Specific Columns

\`\`\`sql
SELECT first_name, last_name, salary
FROM employees;
\`\`\`

**Tip**: Only select columns you need for better performance!

## Column Aliases

Rename columns in output using \`AS\`:

\`\`\`sql
SELECT
  first_name AS "First Name",
  last_name AS "Last Name",
  salary AS "Annual Salary"
FROM employees;
\`\`\`

## Expressions and Calculations

\`\`\`sql
SELECT
  first_name,
  last_name,
  salary,
  salary * 12 AS annual_salary,
  salary * 0.1 AS monthly_bonus
FROM employees;
\`\`\`

## String Concatenation

Combine columns:

\`\`\`sql
SELECT
  first_name || ' ' || last_name AS full_name,
  department
FROM employees;
\`\`\`

## DISTINCT - Remove Duplicates

Get unique values:

\`\`\`sql
SELECT DISTINCT department
FROM employees;
\`\`\`

Returns each department only once.

## Practice Examples

### Example 1: Product Catalog
\`\`\`sql
SELECT
  product_name,
  price,
  price * 0.9 AS sale_price
FROM products;
\`\`\`

### Example 2: Customer Names
\`\`\`sql
SELECT
  first_name || ' ' || last_name AS customer_name,
  email
FROM customers;
\`\`\`

## Key Takeaways

- \`SELECT *\` gets all columns
- Specify column names for better performance
- Use \`AS\` for readable column names
- Perform calculations in SELECT
- \`DISTINCT\` removes duplicates`,
        order_index: 2,
        duration_minutes: 20,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '3. Filtering with WHERE',
        slug: 'filtering-where',
        content: `# Filtering Data with WHERE

## Basic WHERE Clause

Filter rows that meet a condition:

\`\`\`sql
SELECT * FROM employees
WHERE department = 'Sales';
\`\`\`

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| = | Equal |
| != or <> | Not equal |
| > | Greater than |
| < | Less than |
| >= | Greater or equal |
| <= | Less or equal |

### Examples

\`\`\`sql
-- High earners
SELECT * FROM employees
WHERE salary > 60000;

-- Not in IT
SELECT * FROM employees
WHERE department != 'IT';
\`\`\`

## Logical Operators

### AND - All conditions must be true

\`\`\`sql
SELECT * FROM employees
WHERE department = 'Sales'
  AND salary > 50000;
\`\`\`

### OR - At least one condition true

\`\`\`sql
SELECT * FROM employees
WHERE department = 'Sales'
   OR department = 'Marketing';
\`\`\`

### NOT - Negate condition

\`\`\`sql
SELECT * FROM employees
WHERE NOT department = 'HR';
\`\`\`

## IN - Multiple Values

\`\`\`sql
SELECT * FROM employees
WHERE department IN ('Sales', 'Marketing', 'Support');
\`\`\`

## BETWEEN - Range

\`\`\`sql
SELECT * FROM employees
WHERE salary BETWEEN 50000 AND 80000;
\`\`\`

Includes both 50000 and 80000.

## LIKE - Pattern Matching

- \`%\` = any characters
- \`_\` = single character

\`\`\`sql
-- Names starting with J
SELECT * FROM employees
WHERE first_name LIKE 'J%';

-- Emails ending with @company.com
SELECT * FROM employees
WHERE email LIKE '%@company.com';

-- 5-letter first names
SELECT * FROM employees
WHERE first_name LIKE '_____';
\`\`\`

## NULL Values

\`\`\`sql
-- Missing phone numbers
SELECT * FROM employees
WHERE phone IS NULL;

-- Has manager assigned
SELECT * FROM employees
WHERE manager_id IS NOT NULL;
\`\`\`

**Important**: Use \`IS NULL\`, not \`= NULL\`

## Combining Conditions

\`\`\`sql
SELECT * FROM employees
WHERE (department = 'Sales' OR department = 'Marketing')
  AND salary > 55000
  AND hire_date >= '2023-01-01';
\`\`\`

## Practice Exercises

Try writing queries to find:

1. Employees in IT earning over 70000
2. Products with price between 10 and 50
3. Customers with Gmail addresses
4. Orders from last 30 days`,
        order_index: 3,
        duration_minutes: 25,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '4. Sorting and Limiting',
        slug: 'sorting-limiting',
        content: `# Sorting and Limiting Results

## ORDER BY - Sorting

### Ascending (Default)

\`\`\`sql
SELECT * FROM employees
ORDER BY last_name;
\`\`\`

### Descending

\`\`\`sql
SELECT * FROM employees
ORDER BY salary DESC;
\`\`\`

### Multiple Columns

\`\`\`sql
SELECT * FROM employees
ORDER BY department ASC, salary DESC;
\`\`\`

Sorts by department first, then by salary within each department.

## LIMIT - Restrict Rows

\`\`\`sql
-- Top 10 highest paid
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 10;
\`\`\`

## OFFSET - Skip Rows

\`\`\`sql
-- Rows 11-20 (pagination)
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 10 OFFSET 10;
\`\`\`

## Practical Examples

### Top 5 Most Expensive Products

\`\`\`sql
SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 5;
\`\`\`

### Recent Orders

\`\`\`sql
SELECT order_id, customer_name, order_date, total
FROM orders
ORDER BY order_date DESC
LIMIT 20;
\`\`\`

### Lowest Stock Products

\`\`\`sql
SELECT product_name, stock_quantity
FROM products
WHERE stock_quantity > 0
ORDER BY stock_quantity ASC
LIMIT 10;
\`\`\`

### Pagination Example

Page 1 (rows 1-25):
\`\`\`sql
SELECT * FROM customers
ORDER BY customer_name
LIMIT 25 OFFSET 0;
\`\`\`

Page 2 (rows 26-50):
\`\`\`sql
SELECT * FROM customers
ORDER BY customer_name
LIMIT 25 OFFSET 25;
\`\`\`

## Combining Everything

\`\`\`sql
SELECT
  product_name,
  category,
  price,
  stock_quantity
FROM products
WHERE category = 'Electronics'
  AND price < 1000
ORDER BY price DESC
LIMIT 10;
\`\`\`

This finds the top 10 most expensive electronics under $1000.

## Best Practices

1. Always use ORDER BY with LIMIT for consistent results
2. Order by indexed columns for better performance
3. Consider pagination for large result sets
4. Use OFFSET carefully (can be slow with large offsets)

## Practice

Write queries to:

1. Find 5 cheapest products in stock
2. Get 10 most recent signups
3. Show customers alphabetically, page 3 (rows 51-75)
4. Top 3 departments by average salary`,
        order_index: 4,
        duration_minutes: 20,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '5. SQL Joins',
        slug: 'sql-joins',
        content: `# SQL Joins - Combining Tables

## Why Joins?

Relational databases store data across multiple related tables. Joins let us combine them.

### Example Tables

**employees**
\`\`\`
| id | name      | dept_id |
|----|-----------|---------|
| 1  | John Doe  | 101     |
| 2  | Jane Smith| 102     |
| 3  | Bob Wilson| NULL    |
\`\`\`

**departments**
\`\`\`
| id  | dept_name  |
|-----|------------|
| 101 | Sales      |
| 102 | Marketing  |
| 103 | IT         |
\`\`\`

## INNER JOIN

Returns only matching rows from both tables:

\`\`\`sql
SELECT
  e.name,
  d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;
\`\`\`

**Result**: John and Jane (Bob has no department)

## LEFT JOIN

All rows from left table + matching from right:

\`\`\`sql
SELECT
  e.name,
  d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
\`\`\`

**Result**: John, Jane, Bob (Bob's dept_name is NULL)

## RIGHT JOIN

All rows from right table + matching from left:

\`\`\`sql
SELECT
  e.name,
  d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.id;
\`\`\`

**Result**: John, Jane, IT department (no employee)

## FULL OUTER JOIN

All rows from both tables:

\`\`\`sql
SELECT
  e.name,
  d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.id;
\`\`\`

**Result**: Everyone and every department

## Practical Examples

### Orders with Customer Names

\`\`\`sql
SELECT
  o.order_id,
  c.customer_name,
  o.order_date,
  o.total
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
WHERE o.order_date >= '2024-01-01';
\`\`\`

### Products with Categories

\`\`\`sql
SELECT
  p.product_name,
  p.price,
  c.category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.product_name;
\`\`\`

### Find Customers Without Orders

\`\`\`sql
SELECT
  c.customer_name,
  c.email
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
\`\`\`

## Multiple Joins

\`\`\`sql
SELECT
  o.order_id,
  c.customer_name,
  p.product_name,
  o.quantity,
  o.total
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN products p ON o.product_id = p.id
WHERE o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC;
\`\`\`

## Self Join

Join a table to itself:

\`\`\`sql
-- Employee and their manager
SELECT
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

## Join Best Practices

1. Use table aliases (e, d, c) for readability
2. Always specify join condition (ON)
3. Choose correct join type
4. Index foreign key columns
5. Use INNER JOIN when possible (fastest)

## Visual Guide

- **INNER JOIN**: Intersection only
- **LEFT JOIN**: All left + matching right
- **RIGHT JOIN**: All right + matching left
- **FULL OUTER**: Everything

## Practice

1. List all orders with customer and product names
2. Find products never ordered
3. Show employees and their managers
4. Calculate total sales per customer`,
        order_index: 5,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '6. Aggregate Functions',
        slug: 'aggregate-functions',
        content: `# Aggregate Functions

## What Are Aggregates?

Functions that calculate a single value from multiple rows.

## COUNT

\`\`\`sql
-- Total employees
SELECT COUNT(*) FROM employees;

-- Employees in Sales
SELECT COUNT(*) FROM employees
WHERE department = 'Sales';

-- Count non-NULL values
SELECT COUNT(phone) FROM employees;

-- Count unique values
SELECT COUNT(DISTINCT department) FROM employees;
\`\`\`

## SUM

\`\`\`sql
-- Total payroll
SELECT SUM(salary) FROM employees;

-- Revenue this month
SELECT SUM(total) FROM orders
WHERE order_date >= '2024-06-01';
\`\`\`

## AVG

\`\`\`sql
-- Average salary
SELECT AVG(salary) FROM employees;

-- Average order value
SELECT AVG(total) FROM orders;
\`\`\`

## MIN and MAX

\`\`\`sql
-- Salary range
SELECT
  MIN(salary) AS lowest,
  MAX(salary) AS highest
FROM employees;
\`\`\`

## GROUP BY

Calculate aggregates per group:

\`\`\`sql
-- Average salary by department
SELECT
  department,
  AVG(salary) AS avg_salary,
  COUNT(*) AS employee_count
FROM employees
GROUP BY department;
\`\`\`

### Multiple Grouping Columns

\`\`\`sql
-- Sales by year and month
SELECT
  EXTRACT(YEAR FROM order_date) AS year,
  EXTRACT(MONTH FROM order_date) AS month,
  SUM(total) AS monthly_sales
FROM orders
GROUP BY
  EXTRACT(YEAR FROM order_date),
  EXTRACT(MONTH FROM order_date)
ORDER BY year, month;
\`\`\`

## HAVING - Filter Groups

WHERE filters rows, HAVING filters groups:

\`\`\`sql
-- Departments with avg salary > 60000
SELECT
  department,
  AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
\`\`\`

### WHERE vs HAVING

\`\`\`sql
SELECT
  department,
  COUNT(*) AS emp_count,
  AVG(salary) AS avg_salary
FROM employees
WHERE salary > 40000        -- Filter individuals
GROUP BY department
HAVING COUNT(*) >= 5        -- Filter groups
ORDER BY avg_salary DESC;
\`\`\`

## Practical Examples

### Customer Purchase Summary

\`\`\`sql
SELECT
  c.customer_name,
  COUNT(o.id) AS total_orders,
  SUM(o.total) AS total_spent,
  AVG(o.total) AS avg_order
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.customer_name
HAVING SUM(o.total) > 1000
ORDER BY total_spent DESC;
\`\`\`

### Product Performance

\`\`\`sql
SELECT
  p.category,
  COUNT(DISTINCT p.id) AS product_count,
  SUM(o.quantity) AS units_sold,
  SUM(o.total) AS revenue
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
GROUP BY p.category
ORDER BY revenue DESC;
\`\`\`

### Monthly Revenue Report

\`\`\`sql
SELECT
  DATE_TRUNC('month', order_date) AS month,
  COUNT(*) AS order_count,
  SUM(total) AS revenue,
  AVG(total) AS avg_order_value
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;
\`\`\`

## Common Patterns

### Top Customers
\`\`\`sql
SELECT
  customer_id,
  SUM(total) AS lifetime_value
FROM orders
GROUP BY customer_id
ORDER BY lifetime_value DESC
LIMIT 10;
\`\`\`

### Active vs Inactive Products
\`\`\`sql
SELECT
  CASE
    WHEN COUNT(o.id) > 0 THEN 'Active'
    ELSE 'Inactive'
  END AS status,
  COUNT(*) AS product_count
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
GROUP BY
  CASE
    WHEN COUNT(o.id) > 0 THEN 'Active'
    ELSE 'Inactive'
  END;
\`\`\`

## Key Points

- Aggregates work on multiple rows
- GROUP BY creates groups for aggregates
- HAVING filters groups (not rows)
- Can combine multiple aggregates
- NULL values ignored (except COUNT(*))

## Practice

1. Total orders and revenue per customer
2. Average product price by category
3. Departments with more than 5 employees
4. Monthly revenue trend for last year`,
        order_index: 6,
        duration_minutes: 30,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '7. Subqueries',
        slug: 'subqueries',
        content: `# Subqueries in SQL

## What Are Subqueries?

A query nested inside another query.

## Subquery in WHERE

### Single Value

\`\`\`sql
-- Employees earning more than average
SELECT * FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);
\`\`\`

### IN with Multiple Values

\`\`\`sql
-- Employees in high-revenue departments
SELECT * FROM employees
WHERE department IN (
  SELECT department
  FROM sales
  GROUP BY department
  HAVING SUM(revenue) > 100000
);
\`\`\`

### NOT IN

\`\`\`sql
-- Products never ordered
SELECT * FROM products
WHERE id NOT IN (
  SELECT DISTINCT product_id
  FROM orders
);
\`\`\`

## Subquery in SELECT

\`\`\`sql
SELECT
  name,
  salary,
  (SELECT AVG(salary) FROM employees) AS avg_salary,
  salary - (SELECT AVG(salary) FROM employees) AS difference
FROM employees;
\`\`\`

## Subquery in FROM

Treat subquery result as a table:

\`\`\`sql
SELECT
  dept_stats.department,
  dept_stats.avg_salary
FROM (
  SELECT
    department,
    AVG(salary) AS avg_salary,
    COUNT(*) AS emp_count
  FROM employees
  GROUP BY department
) AS dept_stats
WHERE dept_stats.emp_count > 5;
\`\`\`

## Correlated Subqueries

References outer query:

\`\`\`sql
-- Employees earning above their department average
SELECT e1.name, e1.department, e1.salary
FROM employees e1
WHERE salary > (
  SELECT AVG(salary)
  FROM employees e2
  WHERE e2.department = e1.department
);
\`\`\`

## EXISTS

Check if subquery returns any rows:

\`\`\`sql
-- Customers with orders
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
);
\`\`\`

### NOT EXISTS

\`\`\`sql
-- Customers without orders
SELECT * FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
);
\`\`\`

## Practical Examples

### Find Second Highest Salary

\`\`\`sql
SELECT MAX(salary)
FROM employees
WHERE salary < (
  SELECT MAX(salary)
  FROM employees
);
\`\`\`

### Employees in Top 3 Departments by Size

\`\`\`sql
SELECT * FROM employees
WHERE department IN (
  SELECT department
  FROM employees
  GROUP BY department
  ORDER BY COUNT(*) DESC
  LIMIT 3
);
\`\`\`

### Products Above Category Average Price

\`\`\`sql
SELECT
  p.name,
  p.category,
  p.price,
  (
    SELECT AVG(price)
    FROM products p2
    WHERE p2.category = p.category
  ) AS category_avg
FROM products p
WHERE price > (
  SELECT AVG(price)
  FROM products p2
  WHERE p2.category = p.category
);
\`\`\`

## Subquery vs JOIN

### Same Result, Different Approaches

**Using Subquery:**
\`\`\`sql
SELECT * FROM employees
WHERE department IN (
  SELECT name FROM departments
  WHERE location = 'NYC'
);
\`\`\`

**Using JOIN:**
\`\`\`sql
SELECT e.*
FROM employees e
JOIN departments d ON e.department = d.name
WHERE d.location = 'NYC';
\`\`\`

JOINs are often faster for large datasets.

## Tips

- Use EXISTS instead of IN for better performance with large datasets
- Avoid correlated subqueries in large tables (slow)
- Consider JOINs as alternative
- Test performance with EXPLAIN

## Practice

1. Find products more expensive than average in their category
2. List customers who haven't ordered in last 90 days
3. Find top 3 employees by salary in each department
4. Calculate running total vs query total`,
        order_index: 7,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '8. Data Modification - INSERT, UPDATE, DELETE',
        slug: 'data-modification',
        content: `# Data Modification

## INSERT - Add New Rows

\`\`\`sql
INSERT INTO employees (first_name, last_name, salary)
VALUES ('John', 'Doe', 55000);

-- Multiple rows
INSERT INTO employees VALUES
  ('Alice', 'Smith', 65000),
  ('Bob', 'Johnson', 52000);

-- From SELECT
INSERT INTO top_performers
SELECT * FROM employees WHERE salary > 80000;
\`\`\`

## UPDATE - Modify Rows

\`\`\`sql
UPDATE employees
SET salary = 60000
WHERE id = 123;

-- Multiple columns
UPDATE employees
SET salary = 65000, department = 'Management'
WHERE id = 123;

-- With calculation
UPDATE employees
SET salary = salary * 1.10
WHERE department = 'Sales';
\`\`\`

## DELETE - Remove Rows

\`\`\`sql
DELETE FROM employees
WHERE id = 123;

-- DANGER: Always use WHERE!
DELETE FROM temp_data WHERE created_at < '2023-01-01';
\`\`\`

## RETURNING Clause

\`\`\`sql
INSERT INTO employees (name, salary)
VALUES ('John', 50000)
RETURNING id, name;

UPDATE employees SET salary = 60000
WHERE id = 123
RETURNING *;
\`\`\`

## Safety Tips

1. Always use WHERE clause
2. Test with SELECT first
3. Use transactions for multiple changes
4. Backup before bulk operations

## Practice

1. Insert 5 new products
2. Update prices: 20% increase for low stock
3. Delete inactive users (last_login > 1 year)
4. Implement soft delete with deleted_at timestamp`,
        order_index: 8,
        duration_minutes: 30,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '9. Advanced JOINs and Set Operations',
        slug: 'advanced-joins-sets',
        content: `# Advanced JOINs and Set Operations

## Self JOIN

Join table to itself:

\`\`\`sql
-- Employee hierarchy
SELECT
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Employees in same department
SELECT e1.name, e2.name, e1.department
FROM employees e1
JOIN employees e2
  ON e1.department = e2.department
  AND e1.id < e2.id;
\`\`\`

## CROSS JOIN

Every combination:

\`\`\`sql
SELECT c.name AS color, s.name AS size
FROM colors c
CROSS JOIN sizes s;
\`\`\`

## UNION

Combine results:

\`\`\`sql
SELECT name, 'Customer' AS type FROM customers
UNION
SELECT name, 'Supplier' AS type FROM suppliers;

-- UNION ALL (keeps duplicates)
SELECT name FROM customers
UNION ALL
SELECT name FROM suppliers;
\`\`\`

## INTERSECT

Rows in both:

\`\`\`sql
SELECT email FROM customers
INTERSECT
SELECT email FROM suppliers;
\`\`\`

## EXCEPT

Rows in first but not second:

\`\`\`sql
-- Customers who never ordered
SELECT id FROM customers
EXCEPT
SELECT DISTINCT customer_id FROM orders;
\`\`\`

## Practical Examples

\`\`\`sql
-- Customer purchase history
SELECT
  c.name,
  COUNT(o.id) AS orders,
  SUM(o.total) AS lifetime_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;

-- Combine archives
SELECT * FROM orders_2023
UNION ALL
SELECT * FROM orders_2024
ORDER BY order_date;
\`\`\`

## Practice

1. Find employee reporting hierarchies
2. Generate all product-size-color combinations
3. List all contacts (customers + suppliers, no duplicates)
4. Find products never ordered`,
        order_index: 9,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '10. String and Date Functions',
        slug: 'string-date-functions',
        content: `# String and Date Functions

## String Functions

\`\`\`sql
SELECT
  UPPER(name) AS uppercase,
  LOWER(email) AS lowercase,
  LENGTH(description) AS length,
  SUBSTRING(code FROM 1 FOR 3) AS prefix,
  CONCAT(first_name, ' ', last_name) AS full_name,
  TRIM(name) AS trimmed,
  REPLACE(phone, '-', '') AS phone_digits
FROM users;
\`\`\`

### String Splitting

\`\`\`sql
SELECT
  SPLIT_PART(email, '@', 1) AS username,
  SPLIT_PART(email, '@', 2) AS domain
FROM users;
\`\`\`

## Date and Time Functions

\`\`\`sql
SELECT
  CURRENT_DATE AS today,
  NOW() AS right_now,
  EXTRACT(YEAR FROM order_date) AS year,
  EXTRACT(MONTH FROM order_date) AS month,
  DATE_TRUNC('month', order_date) AS month_start,
  order_date + INTERVAL '7 days' AS week_later
FROM orders;
\`\`\`

### Date Formatting

\`\`\`sql
SELECT
  TO_CHAR(order_date, 'YYYY-MM-DD') AS iso_date,
  TO_CHAR(order_date, 'Mon DD, YYYY') AS readable,
  TO_CHAR(order_date, 'Day') AS day_name
FROM orders;
\`\`\`

## Practical Examples

### Monthly Sales Report

\`\`\`sql
SELECT
  TO_CHAR(order_date, 'YYYY-MM') AS month,
  COUNT(*) AS orders,
  SUM(total) AS revenue
FROM orders
WHERE order_date >= NOW() - INTERVAL '12 months'
GROUP BY month
ORDER BY month;
\`\`\`

### Day of Week Analysis

\`\`\`sql
SELECT
  TO_CHAR(order_date, 'Day') AS day_name,
  COUNT(*) AS order_count
FROM orders
GROUP BY EXTRACT(DOW FROM order_date), day_name
ORDER BY EXTRACT(DOW FROM order_date);
\`\`\`

### Email Domain Analysis

\`\`\`sql
SELECT
  SPLIT_PART(email, '@', 2) AS domain,
  COUNT(*) AS user_count
FROM users
GROUP BY domain
ORDER BY user_count DESC;
\`\`\`

## Practice

1. Extract email domains and count users
2. Format customer names properly (capitalize first letter)
3. Calculate customer age groups from birth_date
4. Find orders placed on weekends
5. Generate URL-friendly slugs from product names`,
        order_index: 10,
        duration_minutes: 30,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[0].id,
        title: '11. Performance Optimization and Indexes',
        slug: 'performance-indexes',
        content: `# Performance Optimization

## What Are Indexes?

Speed up data retrieval (like a book's index).

## Creating Indexes

\`\`\`sql
CREATE INDEX idx_employees_last_name
ON employees(last_name);

-- Composite index (multiple columns)
CREATE INDEX idx_orders_customer_date
ON orders(customer_id, order_date);

-- Unique index
CREATE UNIQUE INDEX idx_users_email
ON users(email);
\`\`\`

## When to Use Indexes

✅ Use on:
- Primary/Foreign keys
- WHERE clause columns
- JOIN columns
- ORDER BY columns

❌ Avoid on:
- Small tables
- Rarely queried columns
- Frequently updated tables

## EXPLAIN - Query Analysis

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM employees
WHERE last_name = 'Smith';
\`\`\`

Look for:
- **Seq Scan** = Full table scan (SLOW!)
- **Index Scan** = Uses index (FAST!)

## Optimization Tips

### 1. Select Only Needed Columns

\`\`\`sql
-- Slow
SELECT * FROM employees;

-- Fast
SELECT id, name FROM employees;
\`\`\`

### 2. Use LIMIT

\`\`\`sql
SELECT * FROM orders
ORDER BY order_date DESC
LIMIT 10;
\`\`\`

### 3. EXISTS vs IN

\`\`\`sql
-- Faster
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id
);

-- Slower
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);
\`\`\`

### 4. Avoid Functions on Indexed Columns

\`\`\`sql
-- Doesn't use index
WHERE UPPER(last_name) = 'SMITH'

-- Uses index
WHERE last_name = 'Smith'
\`\`\`

### 5. Pagination with Keyset

\`\`\`sql
-- Fast (keyset pagination)
SELECT * FROM products
WHERE id > 1000
ORDER BY id
LIMIT 20;

-- Slow (OFFSET on large tables)
SELECT * FROM products
LIMIT 20 OFFSET 1000;
\`\`\`

## Viewing Indexes

\`\`\`sql
SELECT * FROM pg_indexes
WHERE tablename = 'employees';
\`\`\`

## Dropping Indexes

\`\`\`sql
DROP INDEX idx_employees_last_name;
\`\`\`

## Best Practices

1. ✅ Index foreign keys
2. ✅ Use EXPLAIN to find slow queries
3. ✅ Monitor query performance
4. ✅ Update statistics (ANALYZE)
5. ❌ Don't over-index (slows writes)
6. ❌ Don't index small tables
7. ❌ Don't guess - measure!

## Practice

1. Find slow queries with EXPLAIN
2. Add indexes to foreign keys
3. Optimize a complex JOIN query
4. Compare OFFSET vs keyset pagination performance`,
        order_index: 11,
        duration_minutes: 35,
        has_code_exercise: true,
      },
    ];

    const advancedSqlLessons = [
      {
        course_id: insertedCourses[1].id,
        title: '1. Window Functions Basics',
        slug: 'window-functions-basics',
        content: `# Window Functions

## What Are Window Functions?

Calculate across rows **without collapsing** them (unlike GROUP BY).

## vs GROUP BY

**GROUP BY** - Collapses rows:
\`\`\`sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department;
-- Returns 1 row per department
\`\`\`

**Window Function** - Keeps all rows:
\`\`\`sql
SELECT
  name,
  department,
  salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg
FROM employees;
-- Returns all employees with their department average
\`\`\`

## Syntax

\`\`\`sql
function() OVER (
  [PARTITION BY column]
  [ORDER BY column]
  [ROWS/RANGE clause]
)
\`\`\`

## ROW_NUMBER()

Assign sequential numbers:

\`\`\`sql
SELECT
  name,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
FROM employees;
\`\`\`

### With PARTITION BY

Number within each group:

\`\`\`sql
SELECT
  name,
  department,
  salary,
  ROW_NUMBER() OVER (
    PARTITION BY department
    ORDER BY salary DESC
  ) AS dept_rank
FROM employees;
\`\`\`

## RANK() vs DENSE_RANK()

**RANK()** - Leaves gaps after ties
**DENSE_RANK()** - No gaps

\`\`\`sql
SELECT
  name,
  score,
  RANK() OVER (ORDER BY score DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank
FROM students;

-- Scores: 95, 95, 90, 88
-- RANK:   1,  1,  3,  4
-- DENSE:  1,  1,  2,  3
\`\`\`

## Top N per Group

\`\`\`sql
WITH ranked AS (
  SELECT
    product_name,
    category,
    sales,
    ROW_NUMBER() OVER (
      PARTITION BY category
      ORDER BY sales DESC
    ) AS rank
  FROM products
)
SELECT * FROM ranked
WHERE rank <= 3;
\`\`\`

## NTILE() - Buckets

Divide into N groups:

\`\`\`sql
SELECT
  customer_name,
  total_spent,
  NTILE(4) OVER (ORDER BY total_spent DESC) AS quartile
FROM customers;
\`\`\`

Creates 4 equal groups (top 25%, next 25%, etc.)

## Practice

1. Rank employees by salary within each department
2. Find top 5 products per category by revenue
3. Assign customers to spending quartiles
4. Number orders for each customer chronologically`,
        order_index: 1,
        duration_minutes: 30,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[1].id,
        title: '2. Advanced Window Functions',
        slug: 'advanced-window-functions',
        content: `# Advanced Window Functions

## LAG() and LEAD()

Access other rows relative to current.

### LAG() - Previous Row

\`\`\`sql
SELECT
  order_date,
  revenue,
  LAG(revenue) OVER (ORDER BY order_date) AS prev_day,
  revenue - LAG(revenue) OVER (ORDER BY order_date) AS change
FROM daily_sales;
\`\`\`

### LEAD() - Next Row

\`\`\`sql
SELECT
  employee_name,
  hire_date,
  LEAD(hire_date) OVER (ORDER BY hire_date) AS next_hire
FROM employees;
\`\`\`

## Moving Averages

\`\`\`sql
SELECT
  order_date,
  revenue,
  AVG(revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS moving_avg_7day
FROM daily_sales;
\`\`\`

## Running Total

\`\`\`sql
SELECT
  order_date,
  revenue,
  SUM(revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_revenue
FROM daily_sales;
\`\`\`

## FIRST_VALUE() and LAST_VALUE()

\`\`\`sql
SELECT
  product_name,
  sale_date,
  price,
  FIRST_VALUE(price) OVER (
    PARTITION BY product_name
    ORDER BY sale_date
  ) AS first_price,
  LAST_VALUE(price) OVER (
    PARTITION BY product_name
    ORDER BY sale_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS latest_price
FROM sales;
\`\`\`

## Percent of Total

\`\`\`sql
SELECT
  department,
  SUM(salary) AS dept_total,
  SUM(SUM(salary)) OVER () AS company_total,
  ROUND(
    100.0 * SUM(salary) / SUM(SUM(salary)) OVER (),
    2
  ) AS percent_of_total
FROM employees
GROUP BY department;
\`\`\`

## Year-over-Year Growth

\`\`\`sql
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS revenue
  FROM orders
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
  month,
  revenue,
  LAG(revenue, 12) OVER (ORDER BY month) AS same_month_last_year,
  ROUND(
    100.0 * (revenue - LAG(revenue, 12) OVER (ORDER BY month))
    / LAG(revenue, 12) OVER (ORDER BY month),
    2
  ) AS yoy_growth_pct
FROM monthly_sales;
\`\`\`

## Practical Examples

### Customer Retention

\`\`\`sql
SELECT
  customer_id,
  order_date,
  LAG(order_date) OVER (
    PARTITION BY customer_id
    ORDER BY order_date
  ) AS previous_order,
  order_date - LAG(order_date) OVER (
    PARTITION BY customer_id
    ORDER BY order_date
  ) AS days_since_last_order
FROM orders;
\`\`\`

### Inventory Trends

\`\`\`sql
SELECT
  product_id,
  check_date,
  quantity,
  AVG(quantity) OVER (
    PARTITION BY product_id
    ORDER BY check_date
    ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
  ) AS avg_30day_quantity
FROM inventory_checks;
\`\`\`

## Practice

1. Calculate month-over-month revenue growth
2. Find days between customer purchases
3. 14-day moving average of website visitors
4. Compare each employee's salary to department average`,
        order_index: 2,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[1].id,
        title: '3. CTEs and Subqueries',
        slug: 'ctes-subqueries',
        content: `# Common Table Expressions (CTEs)

## What is a CTE?

Temporary named result set for a single query.

## Basic Syntax

\`\`\`sql
WITH cte_name AS (
  SELECT column1, column2
  FROM table_name
  WHERE condition
)
SELECT * FROM cte_name;
\`\`\`

## Simple Example

\`\`\`sql
WITH high_earners AS (
  SELECT * FROM employees
  WHERE salary > 100000
)
SELECT
  department,
  COUNT(*) AS high_earner_count
FROM high_earners
GROUP BY department;
\`\`\`

## Multiple CTEs

\`\`\`sql
WITH
  sales_summary AS (
    SELECT
      product_id,
      SUM(quantity) AS total_sold
    FROM orders
    GROUP BY product_id
  ),
  product_costs AS (
    SELECT
      id,
      name,
      cost_price
    FROM products
  )
SELECT
  p.name,
  s.total_sold,
  p.cost_price * s.total_sold AS total_cost
FROM product_costs p
JOIN sales_summary s ON p.id = s.product_id;
\`\`\`

## Recursive CTEs

For hierarchical data:

\`\`\`sql
WITH RECURSIVE org_chart AS (
  -- Base: Top level
  SELECT
    id,
    name,
    manager_id,
    1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: Add subordinates
  SELECT
    e.id,
    e.name,
    e.manager_id,
    oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart
ORDER BY level, name;
\`\`\`

## Subqueries

### In WHERE

\`\`\`sql
SELECT * FROM employees
WHERE salary > (
  SELECT AVG(salary) FROM employees
);
\`\`\`

### In FROM

\`\`\`sql
SELECT
  dept_summary.department,
  dept_summary.avg_salary
FROM (
  SELECT
    department,
    AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department
) AS dept_summary
WHERE dept_summary.avg_salary > 60000;
\`\`\`

### In SELECT

\`\`\`sql
SELECT
  name,
  salary,
  (SELECT AVG(salary) FROM employees) AS company_avg,
  salary - (SELECT AVG(salary) FROM employees) AS difference
FROM employees;
\`\`\`

## Correlated Subquery

References outer query:

\`\`\`sql
SELECT
  e.name,
  e.department,
  e.salary
FROM employees e
WHERE e.salary > (
  SELECT AVG(salary)
  FROM employees
  WHERE department = e.department
);
\`\`\`

## EXISTS

\`\`\`sql
-- Customers who placed orders
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id
);

-- Products never ordered
SELECT * FROM products p
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.product_id = p.id
);
\`\`\`

## CTE vs Subquery

**Use CTE when:**
- Complex query needs clarity
- Reference result multiple times
- Recursive query
- Debugging

**Use Subquery when:**
- Simple, one-time use
- Very short query

## Practical Example

\`\`\`sql
WITH
  monthly_revenue AS (
    SELECT
      DATE_TRUNC('month', order_date) AS month,
      SUM(total) AS revenue
    FROM orders
    WHERE order_date >= '2024-01-01'
    GROUP BY DATE_TRUNC('month', order_date)
  ),
  targets AS (
    SELECT
      month,
      100000 AS target
    FROM generate_series(
      '2024-01-01'::date,
      '2024-12-01'::date,
      '1 month'::interval
    ) AS month
  )
SELECT
  t.month,
  COALESCE(mr.revenue, 0) AS actual_revenue,
  t.target,
  ROUND(
    100.0 * COALESCE(mr.revenue, 0) / t.target,
    2
  ) AS pct_of_target
FROM targets t
LEFT JOIN monthly_revenue mr ON t.month = mr.month
ORDER BY t.month;
\`\`\`

## Practice

1. CTE for customers above average spending
2. Recursive CTE for category hierarchy
3. Find employees earning more than their department average
4. Calculate customer lifetime value with CTEs`,
        order_index: 3,
        duration_minutes: 40,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[1].id,
        title: '4. Query Optimization',
        slug: 'query-optimization',
        content: `# Query Optimization

## Understanding Performance

### Execution Plans

See how database executes your query:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE customer_id = 12345;
\`\`\`

Look for:
- Sequential scans (slow)
- Index scans (fast)
- Join methods
- Estimated vs actual rows

## Indexes

### When to Index

\`\`\`sql
-- Frequently filtered columns
CREATE INDEX idx_orders_customer
ON orders(customer_id);

-- Multiple columns together
CREATE INDEX idx_orders_date_status
ON orders(order_date, status);

-- Unique values
CREATE UNIQUE INDEX idx_users_email
ON users(email);
\`\`\`

### Index Best Practices

1. Index WHERE clause columns
2. Index JOIN columns
3. Index ORDER BY columns
4. Don't over-index (slows writes)
5. Index foreign keys

## Common Pitfalls

### 1. SELECT * (Avoid!)

\`\`\`sql
-- Bad: Gets unnecessary data
SELECT * FROM orders;

-- Good: Only needed columns
SELECT id, customer_id, total FROM orders;
\`\`\`

### 2. Functions on Indexed Columns

\`\`\`sql
-- Bad: Can't use index
SELECT * FROM orders
WHERE YEAR(order_date) = 2024;

-- Good: Index can be used
SELECT * FROM orders
WHERE order_date >= '2024-01-01'
  AND order_date < '2025-01-01';
\`\`\`

### 3. OR vs IN

\`\`\`sql
-- Slower
WHERE status = 'pending'
   OR status = 'processing'
   OR status = 'shipped';

-- Faster
WHERE status IN ('pending', 'processing', 'shipped');
\`\`\`

### 4. Implicit Type Conversion

\`\`\`sql
-- Bad: Converts every row
WHERE order_id = '12345';  -- order_id is INT

-- Good: Match data types
WHERE order_id = 12345;
\`\`\`

## JOIN Optimization

### Join Smaller Tables First

\`\`\`sql
-- Better: Start with small table
SELECT *
FROM small_lookups s
JOIN large_table l ON s.id = l.lookup_id;
\`\`\`

### EXISTS vs IN

\`\`\`sql
-- Slower with large subquery
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);

-- Faster: Stops at first match
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id
);
\`\`\`

## Pagination

\`\`\`sql
-- Bad: Slow with large offset
SELECT * FROM orders
ORDER BY id
LIMIT 100 OFFSET 1000000;

-- Good: Keyset pagination
SELECT * FROM orders
WHERE id > 1000000
ORDER BY id
LIMIT 100;
\`\`\`

## COUNT Optimization

\`\`\`sql
-- Slow: Counts everything
SELECT COUNT(*) FROM large_table;

-- Fast: Use statistics
SELECT reltuples::bigint AS estimate
FROM pg_class
WHERE relname = 'large_table';
\`\`\`

## Avoid N+1 Queries

\`\`\`sql
-- Bad: Separate query per customer
SELECT * FROM customers;
-- Then for each customer:
SELECT * FROM orders WHERE customer_id = ?;

-- Good: Single query with JOIN
SELECT
  c.*,
  o.*
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
\`\`\`

## Practical Tips

### 1. Limit Result Set Early

\`\`\`sql
-- Better
SELECT expensive_calculation(col)
FROM (
  SELECT col FROM large_table
  WHERE condition
  LIMIT 100
) subquery;
\`\`\`

### 2. Use Covering Indexes

\`\`\`sql
-- Index includes all needed columns
CREATE INDEX idx_orders_covering
ON orders(customer_id, order_date, total);

-- Query uses only indexed columns
SELECT customer_id, order_date, total
FROM orders
WHERE customer_id = 123;
\`\`\`

### 3. Batch Operations

\`\`\`sql
-- Bad: Many single inserts
INSERT INTO logs VALUES (...);
INSERT INTO logs VALUES (...);

-- Good: Batch insert
INSERT INTO logs VALUES
  (...),
  (...),
  (...);
\`\`\`

## Monitoring Slow Queries

\`\`\`sql
-- PostgreSQL: Find slow queries
SELECT
  query,
  calls,
  total_time,
  mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
\`\`\`

## Optimization Checklist

1. ✓ Analyzed execution plan?
2. ✓ Added appropriate indexes?
3. ✓ Avoided SELECT *?
4. ✓ No functions on indexed columns?
5. ✓ Using correct data types?
6. ✓ Optimized joins?
7. ✓ Minimized result set?
8. ✓ Tested with production data volume?

## Practice

1. Analyze and optimize a slow query
2. Create indexes for common query patterns
3. Rewrite queries to avoid pitfalls
4. Compare execution plans before/after`,
        order_index: 4,
        duration_minutes: 45,
        has_code_exercise: true,
      },
    ];

    console.log('Inserting SQL tutorial lessons...');
    const { error: sqlLessonsError } = await supabase
      .from('lessons')
      .insert(sqlTutorialLessons);

    if (sqlLessonsError) throw sqlLessonsError;
    console.log(`Inserted ${sqlTutorialLessons.length} SQL tutorial lessons`);

    console.log('Inserting Advanced SQL lessons...');
    const { error: advancedLessonsError } = await supabase
      .from('lessons')
      .insert(advancedSqlLessons);

    if (advancedLessonsError) throw advancedLessonsError;
    console.log(`Inserted ${advancedSqlLessons.length} Advanced SQL lessons`);

    const pythonFundamentalsLessons = [
      {
        course_id: insertedCourses[2].id,
        title: '1. Getting Started with Python',
        slug: 'getting-started-python',
        content: `# Getting Started with Python

## What is Python?

Python is a high-level, interpreted programming language known for its simplicity and readability.

## Why Learn Python?

### 1. Easy to Learn
Python's syntax is clean and reads like English:

\`\`\`python
# Calculate rectangle area
width = 10
height = 5
area = width * height
print(f"Area is {area}")
\`\`\`

### 2. Versatile
- Web development (Django, Flask)
- Data science (pandas, NumPy)
- Machine learning (TensorFlow, scikit-learn)
- Automation and scripting
- Game development

### 3. In-Demand
Top 3 most popular programming language. Essential for data roles.

## Installing Python

### Windows
1. Visit python.org
2. Download Python 3.x installer
3. Run installer
4. ✅ Check "Add Python to PATH"
5. Click "Install Now"

### macOS
\`\`\`bash
# Using Homebrew
brew install python3
\`\`\`

### Linux (Ubuntu/Debian)
\`\`\`bash
sudo apt update
sudo apt install python3 python3-pip
\`\`\`

## Verify Installation

\`\`\`bash
python3 --version
# Output: Python 3.12.0
\`\`\`

## Your First Program

Create \`hello.py\`:

\`\`\`python
print("Hello, World!")
\`\`\`

Run it:
\`\`\`bash
python3 hello.py
\`\`\`

## Interactive Python (REPL)

\`\`\`bash
python3
>>> 2 + 2
4
>>> print("Python is awesome!")
Python is awesome!
>>> exit()
\`\`\`

## Setting Up IDE

### VS Code (Recommended)
1. Install VS Code
2. Install Python extension
3. Create \`.py\` file
4. Run with F5 or Run button

### PyCharm
Professional Python IDE (Community Edition free)

### Jupyter Notebook
Great for data science and learning

## Python Basics

### Variables
\`\`\`python
name = "Alice"
age = 30
height = 5.6
is_student = True
\`\`\`

### Print Function
\`\`\`python
print("Hello")
print("Score:", 95)
print(f"Name: {name}, Age: {age}")
\`\`\`

### Comments
\`\`\`python
# This is a single-line comment

"""
This is a
multi-line comment
"""
\`\`\`

## Your First Real Program

\`\`\`python
# Simple calculator
num1 = 10
num2 = 5

print(f"Addition: {num1 + num2}")
print(f"Subtraction: {num1 - num2}")
print(f"Multiplication: {num1 * num2}")
print(f"Division: {num1 / num2}")
\`\`\`

## Practice Exercises

1. Print your name and favorite color
2. Calculate area of a circle (π × r²)
3. Convert temperature from Celsius to Fahrenheit
4. Create variables for a book (title, author, pages, price)`,
        order_index: 1,
        duration_minutes: 20,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[2].id,
        title: '2. Variables and Data Types',
        slug: 'variables-data-types',
        content: `# Variables and Data Types

## Variables

Container for storing data values.

\`\`\`python
# Variable assignment
name = "Alice"
age = 25
salary = 75000.50
is_employed = True
\`\`\`

## Naming Rules

✅ Valid:
\`\`\`python
user_name = "Bob"
age2 = 30
_private = "secret"
firstName = "John"
\`\`\`

❌ Invalid:
\`\`\`python
2age = 30        # Can't start with number
first-name = "Jo" # No hyphens
class = "CS101"   # Reserved keyword
\`\`\`

## Data Types

### 1. Numbers

**Integer (int)**
\`\`\`python
count = 100
temperature = -5
population = 8000000000
\`\`\`

**Float**
\`\`\`python
price = 19.99
pi = 3.14159
height = 5.8
\`\`\`

**Operations**
\`\`\`python
# Arithmetic
result = 10 + 5   # 15
result = 10 - 3   # 7
result = 4 * 5    # 20
result = 10 / 3   # 3.333...
result = 10 // 3  # 3 (integer division)
result = 10 % 3   # 1 (remainder)
result = 2 ** 3   # 8 (power)
\`\`\`

### 2. Strings

Text data in quotes:

\`\`\`python
name = "Alice"
message = 'Hello World'
multiline = """This is
a multiline
string"""
\`\`\`

**String Operations**
\`\`\`python
first = "John"
last = "Doe"

# Concatenation
full_name = first + " " + last

# Repetition
stars = "*" * 10  # **********

# Length
length = len(full_name)

# Access characters
first_char = name[0]      # 'A'
last_char = name[-1]      # 'e'
slice = name[0:3]         # 'Ali'
\`\`\`

**String Methods**
\`\`\`python
text = "  Hello World  "

text.upper()        # "  HELLO WORLD  "
text.lower()        # "  hello world  "
text.strip()        # "Hello World"
text.replace("o", "0")  # "  Hell0 W0rld  "
text.split()        # ["Hello", "World"]
\`\`\`

**F-Strings (Formatted strings)**
\`\`\`python
name = "Alice"
age = 30

# Old way
message = "My name is " + name + " and I'm " + str(age)

# Modern way (f-strings)
message = f"My name is {name} and I'm {age}"

# With expressions
total = 100
tax = 0.08
message = f"Total with tax: ${total * (1 + tax):.2f}"
\`\`\`

### 3. Boolean

True or False values:

\`\`\`python
is_active = True
is_admin = False

# Boolean from comparisons
age = 18
is_adult = age >= 18      # True
is_teenager = age < 13    # False
\`\`\`

### 4. NoneType

Represents absence of value:

\`\`\`python
result = None

if result is None:
    print("No result yet")
\`\`\`

## Type Checking

\`\`\`python
age = 25
print(type(age))        # <class 'int'>

price = 19.99
print(type(price))      # <class 'float'>

name = "Alice"
print(type(name))       # <class 'str'>
\`\`\`

## Type Conversion

\`\`\`python
# String to int
age_str = "25"
age = int(age_str)

# Int to string
count = 100
count_str = str(count)

# String to float
price = float("19.99")

# Float to int (truncates)
rounded = int(5.8)  # 5
\`\`\`

## Input from User

\`\`\`python
# Get user input (always returns string)
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Convert to number
age = int(input("Enter your age: "))
print(f"Next year you'll be {age + 1}")
\`\`\`

## Practical Examples

### Temperature Converter
\`\`\`python
celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}°C = {fahrenheit}°F")
\`\`\`

### Simple Calculator
\`\`\`python
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
operation = input("Enter operation (+, -, *, /): ")

if operation == "+":
    result = num1 + num2
elif operation == "-":
    result = num1 - num2
elif operation == "*":
    result = num1 * num2
elif operation == "/":
    result = num1 / num2
else:
    print("Invalid operation")
    result = None

if result is not None:
    print(f"Result: {result}")
\`\`\`

## Practice Exercises

1. Create variables for a person (name, age, city, salary)
2. Calculate body mass index (BMI = weight / height²)
3. Get user's name and age, print in 10 years
4. Build a tip calculator (bill amount, tip %, total)`,
        order_index: 2,
        duration_minutes: 30,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[2].id,
        title: '3. Control Flow - If/Else',
        slug: 'control-flow-if-else',
        content: `# Control Flow with If/Else

## Basic If Statement

\`\`\`python
age = 20

if age >= 18:
    print("You are an adult")
\`\`\`

**Indentation matters!** Use 4 spaces.

## If-Else

\`\`\`python
temperature = 75

if temperature > 80:
    print("It's hot!")
else:
    print("It's nice weather")
\`\`\`

## If-Elif-Else

Multiple conditions:

\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Grade: {grade}")
\`\`\`

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| == | Equal to |
| != | Not equal |
| > | Greater than |
| < | Less than |
| >= | Greater or equal |
| <= | Less or equal |

\`\`\`python
x = 10
y = 5

print(x == y)   # False
print(x != y)   # True
print(x > y)    # True
print(x <= 10)  # True
\`\`\`

## Logical Operators

### AND - Both must be true
\`\`\`python
age = 25
has_license = True

if age >= 18 and has_license:
    print("Can drive")
\`\`\`

### OR - At least one must be true
\`\`\`python
day = "Saturday"

if day == "Saturday" or day == "Sunday":
    print("It's the weekend!")
\`\`\`

### NOT - Negates condition
\`\`\`python
is_raining = False

if not is_raining:
    print("No umbrella needed")
\`\`\`

## Nested If Statements

\`\`\`python
age = 25
has_ticket = True

if age >= 18:
    if has_ticket:
        print("Welcome to the concert!")
    else:
        print("Please buy a ticket")
else:
    print("Sorry, must be 18+")
\`\`\`

## Membership Operators

### in
\`\`\`python
fruits = ["apple", "banana", "orange"]

if "apple" in fruits:
    print("Apple is available")

name = "Alice"
if "ice" in name:
    print("Contains 'ice'")
\`\`\`

### not in
\`\`\`python
forbidden = ["spam", "hate", "abuse"]
message = "Hello world"

if message not in forbidden:
    print("Message is acceptable")
\`\`\`

## Identity Operators

### is / is not
\`\`\`python
x = None

if x is None:
    print("x has no value")

y = 10
if y is not None:
    print("y has a value")
\`\`\`

## Ternary Operator

Short if-else in one line:

\`\`\`python
age = 20
status = "adult" if age >= 18 else "minor"

# Same as:
if age >= 18:
    status = "adult"
else:
    status = "minor"
\`\`\`

## Practical Examples

### Login System
\`\`\`python
username = input("Username: ")
password = input("Password: ")

if username == "admin" and password == "secret123":
    print("✓ Login successful")
else:
    print("✗ Invalid credentials")
\`\`\`

### BMI Calculator with Categories
\`\`\`python
weight = float(input("Weight (kg): "))
height = float(input("Height (m): "))

bmi = weight / (height ** 2)

if bmi < 18.5:
    category = "Underweight"
elif bmi < 25:
    category = "Normal weight"
elif bmi < 30:
    category = "Overweight"
else:
    category = "Obese"

print(f"BMI: {bmi:.1f} - {category}")
\`\`\`

### Discount Calculator
\`\`\`python
total = float(input("Purchase amount: $"))

if total >= 100:
    discount = 0.20
elif total >= 50:
    discount = 0.10
else:
    discount = 0

final_price = total * (1 - discount)

if discount > 0:
    print(f"Discount: {discount * 100}%")
print(f"Final price: ${final_price:.2f}")
\`\`\`

### Leap Year Checker
\`\`\`python
year = int(input("Enter year: "))

if year % 400 == 0:
    is_leap = True
elif year % 100 == 0:
    is_leap = False
elif year % 4 == 0:
    is_leap = True
else:
    is_leap = False

if is_leap:
    print(f"{year} is a leap year")
else:
    print(f"{year} is not a leap year")
\`\`\`

## Common Patterns

### Validating Input
\`\`\`python
age = int(input("Enter age: "))

if age < 0 or age > 120:
    print("Invalid age")
else:
    print(f"Age {age} is valid")
\`\`\`

### Multiple Conditions
\`\`\`python
score = 85
attendance = 0.9

if score >= 80 and attendance >= 0.85:
    result = "Pass with honors"
elif score >= 60 and attendance >= 0.75:
    result = "Pass"
else:
    result = "Fail"
\`\`\`

## Practice Exercises

1. Check if number is positive, negative, or zero
2. Determine if year is leap year
3. Grade calculator (0-100 → letter grade)
4. Password strength checker (length, has numbers, has special chars)
5. Ticket pricing (child < 12, senior > 65, adult)`,
        order_index: 3,
        duration_minutes: 35,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[2].id,
        title: '4. Loops - For and While',
        slug: 'loops-for-while',
        content: `# Loops in Python

## Why Loops?

Execute code repeatedly without writing it multiple times.

## For Loop

Iterate over sequences (lists, strings, ranges).

### Range Function

\`\`\`python
# range(stop)
for i in range(5):
    print(i)
# Output: 0, 1, 2, 3, 4

# range(start, stop)
for i in range(2, 6):
    print(i)
# Output: 2, 3, 4, 5

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)
# Output: 0, 2, 4, 6, 8
\`\`\`

### Loop Over Lists

\`\`\`python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(f"I like {fruit}")

# With index
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# Better way: enumerate
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

### Loop Over Strings

\`\`\`python
name = "Python"

for char in name:
    print(char)
# Output: P, y, t, h, o, n
\`\`\`

### Loop Over Dictionaries

\`\`\`python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Keys only
for key in person:
    print(key)

# Values only
for value in person.values():
    print(value)

# Both keys and values
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

## While Loop

Repeat while condition is true.

\`\`\`python
count = 0

while count < 5:
    print(f"Count: {count}")
    count += 1

# Output: 0, 1, 2, 3, 4
\`\`\`

### User Input Loop

\`\`\`python
password = ""

while password != "secret":
    password = input("Enter password: ")

print("Access granted!")
\`\`\`

### Infinite Loop with Break

\`\`\`python
while True:
    command = input("Enter command (quit to exit): ")

    if command == "quit":
        break

    print(f"You entered: {command}")
\`\`\`

## Break Statement

Exit loop early:

\`\`\`python
# Find first even number
numbers = [1, 3, 5, 8, 9, 10]

for num in numbers:
    if num % 2 == 0:
        print(f"First even: {num}")
        break
\`\`\`

## Continue Statement

Skip to next iteration:

\`\`\`python
# Print only odd numbers
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)
# Output: 1, 3, 5, 7, 9
\`\`\`

## Pass Statement

Placeholder for future code:

\`\`\`python
for i in range(5):
    if i == 3:
        pass  # TODO: implement later
    else:
        print(i)
\`\`\`

## Nested Loops

Loop inside a loop:

\`\`\`python
# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} × {j} = {i * j}")
    print()  # Blank line
\`\`\`

### Pattern Printing

\`\`\`python
# Triangle
for i in range(1, 6):
    print("*" * i)

# Output:
# *
# **
# ***
# ****
# *****
\`\`\`

## List Comprehensions

Create lists using loops in one line:

\`\`\`python
# Traditional way
squares = []
for i in range(10):
    squares.append(i ** 2)

# List comprehension
squares = [i ** 2 for i in range(10)]

# With condition
even_squares = [i ** 2 for i in range(10) if i % 2 == 0]
\`\`\`

## Practical Examples

### Sum of Numbers

\`\`\`python
total = 0
for i in range(1, 101):
    total += i
print(f"Sum of 1-100: {total}")
\`\`\`

### Factorial

\`\`\`python
n = 5
factorial = 1

for i in range(1, n + 1):
    factorial *= i

print(f"{n}! = {factorial}")
\`\`\`

### Countdown Timer

\`\`\`python
import time

for i in range(10, 0, -1):
    print(f"{i}...")
    time.sleep(1)
print("Blast off!")
\`\`\`

### Find Maximum

\`\`\`python
numbers = [45, 12, 78, 34, 89, 23]
max_num = numbers[0]

for num in numbers:
    if num > max_num:
        max_num = num

print(f"Maximum: {max_num}")
\`\`\`

### Validate Input

\`\`\`python
while True:
    age = input("Enter age (1-120): ")

    if age.isdigit():
        age = int(age)
        if 1 <= age <= 120:
            print(f"Valid age: {age}")
            break

    print("Invalid input. Try again.")
\`\`\`

### Menu System

\`\`\`python
while True:
    print("\n=== Menu ===")
    print("1. Option A")
    print("2. Option B")
    print("3. Quit")

    choice = input("Choose: ")

    if choice == "1":
        print("You chose A")
    elif choice == "2":
        print("You chose B")
    elif choice == "3":
        print("Goodbye!")
        break
    else:
        print("Invalid choice")
\`\`\`

## Common Patterns

### Loop Until Valid Input

\`\`\`python
while True:
    try:
        num = int(input("Enter a number: "))
        break
    except ValueError:
        print("That's not a number!")
\`\`\`

### Process Each Character

\`\`\`python
text = "Hello World"
vowels = "aeiouAEIOU"
count = 0

for char in text:
    if char in vowels:
        count += 1

print(f"Vowels: {count}")
\`\`\`

### Build String

\`\`\`python
result = ""
for i in range(1, 6):
    result += str(i) + "-"

result = result[:-1]  # Remove last dash
print(result)  # 1-2-3-4-5
\`\`\`

## Practice Exercises

1. Print numbers 1-100, but "Fizz" for multiples of 3, "Buzz" for 5, "FizzBuzz" for both
2. Count vowels in a string
3. Reverse a string using a loop
4. Find all prime numbers up to 50
5. Create a simple guessing game
6. Calculate average of numbers entered by user (stop on -1)
7. Print multiplication table for any number
8. Remove duplicates from a list`,
        order_index: 4,
        duration_minutes: 40,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[2].id,
        title: '5. Lists and Tuples',
        slug: 'lists-tuples',
        content: `# Lists and Tuples

## Lists

Ordered, mutable collections.

### Creating Lists

\`\`\`python
# Empty list
empty = []

# List with items
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Using list()
items = list(range(5))  # [0, 1, 2, 3, 4]
\`\`\`

### Accessing Elements

\`\`\`python
fruits = ["apple", "banana", "orange", "grape"]

# By index (0-based)
first = fruits[0]      # "apple"
last = fruits[-1]      # "grape"
second_last = fruits[-2]  # "orange"

# Slicing
subset = fruits[1:3]   # ["banana", "orange"]
first_two = fruits[:2] # ["apple", "banana"]
last_two = fruits[-2:] # ["orange", "grape"]
\`\`\`

### Modifying Lists

\`\`\`python
fruits = ["apple", "banana", "orange"]

# Change element
fruits[1] = "blueberry"

# Add element
fruits.append("grape")        # Add to end
fruits.insert(1, "mango")     # Insert at index

# Extend list
fruits.extend(["kiwi", "pear"])
# or
fruits += ["melon"]

# Remove elements
fruits.remove("apple")        # Remove first occurrence
popped = fruits.pop()         # Remove and return last
popped = fruits.pop(0)        # Remove at index
del fruits[1]                 # Delete by index
fruits.clear()                # Remove all
\`\`\`

### List Methods

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2]

# Sort
numbers.sort()                # In-place sort
sorted_nums = sorted(numbers) # Return new sorted list

# Reverse
numbers.reverse()

# Count occurrences
count = numbers.count(1)      # 2

# Find index
index = numbers.index(4)      # 2

# Copy
copy = numbers.copy()
# or
copy = numbers[:]
\`\`\`

### List Operations

\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# Concatenate
combined = list1 + list2      # [1, 2, 3, 4, 5, 6]

# Repeat
repeated = list1 * 3          # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# Length
length = len(list1)           # 3

# Check membership
exists = 2 in list1           # True

# Min, max, sum (for numbers)
numbers = [3, 1, 4, 1, 5]
minimum = min(numbers)        # 1
maximum = max(numbers)        # 5
total = sum(numbers)          # 14
\`\`\`

### Iterating Lists

\`\`\`python
fruits = ["apple", "banana", "orange"]

# Simple loop
for fruit in fruits:
    print(fruit)

# With index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# With index (traditional)
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")
\`\`\`

### List Comprehensions

\`\`\`python
# Squares
squares = [x**2 for x in range(10)]

# Even numbers
evens = [x for x in range(20) if x % 2 == 0]

# Transform strings
names = ["alice", "bob", "charlie"]
upper_names = [name.upper() for name in names]

# Nested comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]
\`\`\`

### 2D Lists (Matrices)

\`\`\`python
# Create 2D list
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access elements
element = matrix[1][2]  # 6 (row 1, col 2)

# Iterate 2D list
for row in matrix:
    for item in row:
        print(item, end=" ")
    print()
\`\`\`

## Tuples

Ordered, immutable collections.

### Creating Tuples

\`\`\`python
# With parentheses
coordinates = (10, 20)
person = ("Alice", 30, "NYC")

# Without parentheses
point = 5, 10

# Single item (comma required!)
single = (42,)

# Empty tuple
empty = ()
\`\`\`

### Accessing Tuples

\`\`\`python
person = ("Alice", 30, "NYC")

name = person[0]       # "Alice"
age = person[1]        # 30

# Unpacking
name, age, city = person
\`\`\`

### Tuple Methods

\`\`\`python
numbers = (1, 2, 3, 2, 4, 2)

# Count
count = numbers.count(2)  # 3

# Index
index = numbers.index(3)  # 2
\`\`\`

### Why Use Tuples?

1. **Immutable** - Can't change (safer)
2. **Faster** - Than lists
3. **Dictionary keys** - Lists can't be keys
4. **Function returns** - Return multiple values

\`\`\`python
# Function returning tuple
def get_min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = get_min_max([1, 5, 3, 9, 2])
\`\`\`

## Practical Examples

### To-Do List Manager

\`\`\`python
todos = []

while True:
    print("\n=== To-Do List ===")
    for i, todo in enumerate(todos, 1):
        print(f"{i}. {todo}")

    print("\n1. Add task")
    print("2. Remove task")
    print("3. Quit")

    choice = input("Choose: ")

    if choice == "1":
        task = input("Enter task: ")
        todos.append(task)
    elif choice == "2":
        num = int(input("Task number: ")) - 1
        if 0 <= num < len(todos):
            removed = todos.pop(num)
            print(f"Removed: {removed}")
    elif choice == "3":
        break
\`\`\`

### Grade Calculator

\`\`\`python
grades = []

while True:
    grade = input("Enter grade (or 'done'): ")

    if grade.lower() == "done":
        break

    grades.append(float(grade))

if grades:
    average = sum(grades) / len(grades)
    print(f"\nAverage: {average:.2f}")
    print(f"Highest: {max(grades)}")
    print(f"Lowest: {min(grades)}")
\`\`\`

### Shopping Cart

\`\`\`python
cart = []
prices = {
    "apple": 0.99,
    "banana": 0.59,
    "orange": 1.29
}

while True:
    print("\nAvailable items:")
    for item, price in prices.items():
        print(f"{item}: ${price}")

    item = input("\nAdd item (or 'done'): ").lower()

    if item == "done":
        break

    if item in prices:
        cart.append(item)
        print(f"Added {item}")
    else:
        print("Item not found")

# Calculate total
total = sum(prices[item] for item in cart)
print(f"\nCart: {cart}")
print(f"Total: ${total:.2f}")
\`\`\`

### Find Duplicates

\`\`\`python
numbers = [1, 2, 3, 2, 4, 5, 3, 6]
duplicates = []

for num in numbers:
    if numbers.count(num) > 1 and num not in duplicates:
        duplicates.append(num)

print(f"Duplicates: {duplicates}")
\`\`\`

### Merge Sorted Lists

\`\`\`python
list1 = [1, 3, 5, 7]
list2 = [2, 4, 6, 8]

merged = list1 + list2
merged.sort()

print(merged)  # [1, 2, 3, 4, 5, 6, 7, 8]
\`\`\`

## Practice Exercises

1. Remove duplicates from a list
2. Find second largest number in a list
3. Rotate list left by n positions
4. Check if list is palindrome
5. Flatten nested list
6. Split list into chunks of size n
7. Find common elements between two lists
8. Create contact book using list of tuples`,
        order_index: 5,
        duration_minutes: 45,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[2].id,
        title: '6. Functions',
        slug: 'functions',
        content: `# Functions in Python

## What Are Functions?

Reusable blocks of code that perform specific tasks.

## Defining Functions

\`\`\`python
def greet():
    print("Hello, World!")

# Call the function
greet()
\`\`\`

## Parameters and Arguments

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!
\`\`\`

### Multiple Parameters

\`\`\`python
def add(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add(5, 3)  # 5 + 3 = 8
\`\`\`

## Return Values

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8

# Use directly
total = add(10, 20) + add(5, 15)
print(total)  # 50
\`\`\`

### Multiple Return Values

\`\`\`python
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

minimum, maximum, total = get_stats([1, 5, 3, 9, 2])
print(f"Min: {minimum}, Max: {maximum}, Sum: {total}")
\`\`\`

## Default Parameters

\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Hi")          # Hi, Bob!
greet("Charlie", "Hey")     # Hey, Charlie!
\`\`\`

### Multiple Defaults

\`\`\`python
def create_profile(name, age=18, city="Unknown"):
    return f"{name}, {age}, from {city}"

print(create_profile("Alice"))
print(create_profile("Bob", 25))
print(create_profile("Charlie", 30, "NYC"))
\`\`\`

## Keyword Arguments

\`\`\`python
def describe_person(name, age, city):
    print(f"{name} is {age} years old and lives in {city}")

# Positional
describe_person("Alice", 30, "NYC")

# Keyword (order doesn't matter)
describe_person(age=25, name="Bob", city="LA")

# Mix (positional first)
describe_person("Charlie", city="Chicago", age=35)
\`\`\`

## Arbitrary Arguments

### *args (Tuple)

\`\`\`python
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))           # 6
print(sum_all(10, 20, 30, 40))    # 100
\`\`\`

### **kwargs (Dictionary)

\`\`\`python
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="NYC")
# Output:
# name: Alice
# age: 30
# city: NYC
\`\`\`

### Combining All

\`\`\`python
def advanced_function(a, b, *args, default=10, **kwargs):
    print(f"a: {a}, b: {b}")
    print(f"args: {args}")
    print(f"default: {default}")
    print(f"kwargs: {kwargs}")

advanced_function(1, 2, 3, 4, 5, default=20, x=100, y=200)
\`\`\`

## Variable Scope

### Local Scope

\`\`\`python
def my_function():
    x = 10  # Local variable
    print(x)

my_function()
# print(x)  # Error: x not defined
\`\`\`

### Global Scope

\`\`\`python
x = 10  # Global variable

def my_function():
    print(x)  # Can read global

my_function()  # 10
\`\`\`

### Modifying Global

\`\`\`python
count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)  # 2
\`\`\`

## Lambda Functions

Anonymous, one-line functions:

\`\`\`python
# Regular function
def square(x):
    return x ** 2

# Lambda equivalent
square = lambda x: x ** 2

print(square(5))  # 25
\`\`\`

### Lambda Use Cases

\`\`\`python
# Sort by second element
pairs = [(1, 5), (3, 2), (2, 8)]
pairs.sort(key=lambda x: x[1])
print(pairs)  # [(3, 2), (1, 5), (2, 8)]

# Filter even numbers
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6]

# Transform all elements
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8, 10, 12]
\`\`\`

## Docstrings

Document your functions:

\`\`\`python
def calculate_area(width, height):
    """
    Calculate the area of a rectangle.

    Args:
        width (float): Width of rectangle
        height (float): Height of rectangle

    Returns:
        float: Area of rectangle
    """
    return width * height

# View docstring
print(calculate_area.__doc__)
\`\`\`

## Practical Examples

### Temperature Converter

\`\`\`python
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

print(f"100°C = {celsius_to_fahrenheit(100)}°F")
print(f"98.6°F = {fahrenheit_to_celsius(98.6)}°C")
\`\`\`

### Password Validator

\`\`\`python
def is_strong_password(password):
    if len(password) < 8:
        return False

    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)

    return has_upper and has_lower and has_digit

print(is_strong_password("Pass123"))   # True
print(is_strong_password("weak"))      # False
\`\`\`

### Prime Number Checker

\`\`\`python
def is_prime(n):
    if n < 2:
        return False

    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False

    return True

def get_primes(start, end):
    primes = []
    for num in range(start, end + 1):
        if is_prime(num):
            primes.append(num)
    return primes

print(get_primes(1, 20))
# [2, 3, 5, 7, 11, 13, 17, 19]
\`\`\`

### Simple Calculator

\`\`\`python
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Division by zero"
    return a / b

def calculator():
    print("Simple Calculator")
    num1 = float(input("First number: "))
    op = input("Operation (+, -, *, /): ")
    num2 = float(input("Second number: "))

    if op == "+":
        result = add(num1, num2)
    elif op == "-":
        result = subtract(num1, num2)
    elif op == "*":
        result = multiply(num1, num2)
    elif op == "/":
        result = divide(num1, num2)
    else:
        result = "Invalid operation"

    print(f"Result: {result}")

calculator()
\`\`\`

### Grade Calculator

\`\`\`python
def calculate_grade(scores):
    average = sum(scores) / len(scores)

    if average >= 90:
        letter = "A"
    elif average >= 80:
        letter = "B"
    elif average >= 70:
        letter = "C"
    elif average >= 60:
        letter = "D"
    else:
        letter = "F"

    return average, letter

def main():
    scores = []

    print("Enter grades (type 'done' when finished):")
    while True:
        grade = input("Grade: ")
        if grade.lower() == "done":
            break
        scores.append(float(grade))

    if scores:
        avg, letter = calculate_grade(scores)
        print(f"\nAverage: {avg:.2f}")
        print(f"Letter Grade: {letter}")

main()
\`\`\`

## Recursion

Function calling itself:

\`\`\`python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print([fibonacci(i) for i in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

## Practice Exercises

1. Function to check if string is palindrome
2. Function to find factorial using recursion
3. Function to count vowels in a string
4. Function to reverse a list
5. Function to find GCD of two numbers
6. Function to generate Fibonacci sequence
7. Function to convert decimal to binary
8. Build a text-based menu system using functions`,
        order_index: 6,
        duration_minutes: 50,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[2].id,
        title: '7. Dictionaries',
        slug: 'dictionaries',
        content: `# Dictionaries in Python

## What Are Dictionaries?

Unordered collections of key-value pairs.

## Creating Dictionaries

\`\`\`python
# Empty dictionary
empty = {}

# With data
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Using dict()
person = dict(name="Alice", age=30, city="NYC")
\`\`\`

## Accessing Values

\`\`\`python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Bracket notation
name = person["name"]      # "Alice"

# get() method (safer)
age = person.get("age")    # 30
country = person.get("country", "USA")  # Default value
\`\`\`

## Modifying Dictionaries

\`\`\`python
person = {"name": "Alice", "age": 30}

# Add/Update
person["city"] = "NYC"     # Add new key
person["age"] = 31         # Update existing

# Update multiple
person.update({"age": 32, "job": "Engineer"})

# Remove items
removed_value = person.pop("city")
last_item = person.popitem()  # Remove last item
del person["age"]
person.clear()  # Remove all
\`\`\`

## Dictionary Methods

\`\`\`python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Get all keys
keys = person.keys()         # dict_keys(['name', 'age', 'city'])

# Get all values
values = person.values()     # dict_values(['Alice', 30, 'NYC'])

# Get key-value pairs
items = person.items()       # dict_items([...])

# Check if key exists
exists = "name" in person    # True
exists = "job" in person     # False

# Copy
copy = person.copy()
\`\`\`

## Iterating Dictionaries

\`\`\`python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Keys only
for key in person:
    print(key)

# Values only
for value in person.values():
    print(value)

# Both keys and values
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

## Nested Dictionaries

\`\`\`python
students = {
    "student1": {
        "name": "Alice",
        "grades": [85, 90, 88]
    },
    "student2": {
        "name": "Bob",
        "grades": [92, 88, 95]
    }
}

# Access nested data
alice_grades = students["student1"]["grades"]
print(f"Alice's average: {sum(alice_grades) / len(alice_grades)}")
\`\`\`

## Dictionary Comprehension

\`\`\`python
# Create dictionary from list
numbers = [1, 2, 3, 4, 5]
squares = {n: n**2 for n in numbers}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With condition
even_squares = {n: n**2 for n in numbers if n % 2 == 0}
# {2: 4, 4: 16}

# From two lists
keys = ["name", "age", "city"]
values = ["Alice", 30, "NYC"]
person = {k: v for k, v in zip(keys, values)}
\`\`\`

## Practical Examples

### Word Counter

\`\`\`python
def count_words(text):
    words = text.lower().split()
    word_count = {}

    for word in words:
        if word in word_count:
            word_count[word] += 1
        else:
            word_count[word] = 1

    return word_count

text = "hello world hello python world"
counts = count_words(text)
print(counts)
# {'hello': 2, 'world': 2, 'python': 1}
\`\`\`

### Phone Book

\`\`\`python
phonebook = {}

def add_contact(name, number):
    phonebook[name] = number
    print(f"Added {name}")

def search_contact(name):
    if name in phonebook:
        print(f"{name}: {phonebook[name]}")
    else:
        print("Contact not found")

def delete_contact(name):
    if name in phonebook:
        del phonebook[name]
        print(f"Deleted {name}")
    else:
        print("Contact not found")

def show_all():
    for name, number in phonebook.items():
        print(f"{name}: {number}")

# Usage
add_contact("Alice", "555-1234")
add_contact("Bob", "555-5678")
show_all()
search_contact("Alice")
delete_contact("Bob")
\`\`\`

### Inventory System

\`\`\`python
inventory = {
    "apple": {"quantity": 50, "price": 0.99},
    "banana": {"quantity": 30, "price": 0.59},
    "orange": {"quantity": 40, "price": 1.29}
}

def add_stock(item, quantity):
    if item in inventory:
        inventory[item]["quantity"] += quantity
    else:
        price = float(input(f"Price for {item}: "))
        inventory[item] = {"quantity": quantity, "price": price}
    print(f"Added {quantity} {item}(s)")

def sell_item(item, quantity):
    if item not in inventory:
        print("Item not found")
        return

    if inventory[item]["quantity"] < quantity:
        print("Insufficient stock")
        return

    inventory[item]["quantity"] -= quantity
    total = quantity * inventory[item]["price"]
    print(f"Sold {quantity} {item}(s) for ${total:.2f}")

def show_inventory():
    for item, details in inventory.items():
        print(f"{item}: {details['quantity']} @ ${details['price']:.2f}")

show_inventory()
sell_item("apple", 5)
add_stock("grape", 20)
\`\`\`

### Grade Book

\`\`\`python
gradebook = {
    "Alice": [85, 90, 88, 92],
    "Bob": [78, 82, 80, 85],
    "Charlie": [92, 88, 95, 90]
}

def add_grade(student, grade):
    if student in gradebook:
        gradebook[student].append(grade)
    else:
        gradebook[student] = [grade]

def get_average(student):
    if student in gradebook:
        grades = gradebook[student]
        return sum(grades) / len(grades)
    return None

def get_class_average():
    all_grades = []
    for grades in gradebook.values():
        all_grades.extend(grades)
    return sum(all_grades) / len(all_grades)

def print_report():
    for student, grades in gradebook.items():
        avg = sum(grades) / len(grades)
        print(f"{student}: {avg:.2f}")

    print(f"\nClass Average: {get_class_average():.2f}")

print_report()
add_grade("Alice", 95)
print(f"Alice's average: {get_average('Alice'):.2f}")
\`\`\`

### Frequency Counter

\`\`\`python
def count_frequency(items):
    frequency = {}

    for item in items:
        frequency[item] = frequency.get(item, 0) + 1

    return frequency

numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
freq = count_frequency(numbers)
print(freq)
# {1: 1, 2: 2, 3: 3, 4: 4}

# Find most common
most_common = max(freq, key=freq.get)
print(f"Most common: {most_common} ({freq[most_common]} times)")
\`\`\`

### Menu System with Prices

\`\`\`python
menu = {
    "burger": 8.99,
    "pizza": 12.99,
    "salad": 6.99,
    "drink": 2.99
}

cart = {}

def show_menu():
    print("\n=== Menu ===")
    for item, price in menu.items():
        print(f"{item.capitalize()}: ${price:.2f}")

def add_to_cart(item, quantity=1):
    if item not in menu:
        print("Item not available")
        return

    if item in cart:
        cart[item] += quantity
    else:
        cart[item] = quantity

    print(f"Added {quantity} {item}(s)")

def show_cart():
    if not cart:
        print("Cart is empty")
        return

    print("\n=== Your Cart ===")
    total = 0
    for item, quantity in cart.items():
        price = menu[item] * quantity
        total += price
        print(f"{item.capitalize()} x{quantity}: ${price:.2f}")

    print(f"\nTotal: ${total:.2f}")

show_menu()
add_to_cart("burger", 2)
add_to_cart("drink", 3)
show_cart()
\`\`\`

## Merging Dictionaries

\`\`\`python
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}

# Python 3.9+
merged = dict1 | dict2

# Update method
merged = dict1.copy()
merged.update(dict2)

# Unpacking
merged = {**dict1, **dict2}
\`\`\`

## Practice Exercises

1. Create a student database with search functionality
2. Build a word frequency analyzer
3. Implement a simple cache using dictionaries
4. Create a shopping cart with discount codes
5. Build a quiz game using dictionary questions/answers
6. Group items by category
7. Find duplicate values in dictionary
8. Implement a simple translation dictionary`,
        order_index: 7,
        duration_minutes: 45,
        has_code_exercise: true,
      },
      {
        course_id: insertedCourses[2].id,
        title: '8. File Handling',
        slug: 'file-handling',
        content: `# File Handling in Python

## Opening Files

\`\`\`python
# Open for reading
file = open("data.txt", "r")

# Always close when done
file.close()
\`\`\`

### Using with Statement (Recommended)

\`\`\`python
with open("data.txt", "r") as file:
    content = file.read()
# File automatically closes
\`\`\`

## File Modes

| Mode | Description |
|------|-------------|
| "r" | Read (default) |
| "w" | Write (overwrites) |
| "a" | Append |
| "r+" | Read and write |
| "b" | Binary mode |

## Reading Files

### Read Entire File

\`\`\`python
with open("data.txt", "r") as file:
    content = file.read()
    print(content)
\`\`\`

### Read Line by Line

\`\`\`python
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())  # Remove newline
\`\`\`

### Read All Lines to List

\`\`\`python
with open("data.txt", "r") as file:
    lines = file.readlines()
    # lines is a list of strings
\`\`\`

### Read One Line

\`\`\`python
with open("data.txt", "r") as file:
    first_line = file.readline()
    second_line = file.readline()
\`\`\`

## Writing Files

### Write Mode (Overwrites)

\`\`\`python
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is line 2\n")
\`\`\`

### Write Multiple Lines

\`\`\`python
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]

with open("output.txt", "w") as file:
    file.writelines(lines)
\`\`\`

## Appending to Files

\`\`\`python
with open("log.txt", "a") as file:
    file.write("New log entry\n")
\`\`\`

## Working with Paths

\`\`\`python
import os

# Check if file exists
if os.path.exists("data.txt"):
    print("File exists")

# Get file size
size = os.path.getsize("data.txt")
print(f"Size: {size} bytes")

# Get absolute path
abs_path = os.path.abspath("data.txt")

# Create directory
os.makedirs("my_folder", exist_ok=True)

# List files in directory
files = os.listdir(".")
print(files)
\`\`\`

## Error Handling

\`\`\`python
try:
    with open("data.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found")
except PermissionError:
    print("Permission denied")
except Exception as e:
    print(f"Error: {e}")
\`\`\`

## CSV Files

\`\`\`python
import csv

# Writing CSV
data = [
    ["Name", "Age", "City"],
    ["Alice", 30, "NYC"],
    ["Bob", 25, "LA"]
]

with open("data.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# Reading CSV
with open("data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

# CSV with dictionaries
with open("data.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["Name"], row["Age"])
\`\`\`

## JSON Files

\`\`\`python
import json

# Writing JSON
data = {
    "name": "Alice",
    "age": 30,
    "scores": [85, 90, 88]
}

with open("data.json", "w") as file:
    json.dump(data, file, indent=2)

# Reading JSON
with open("data.json", "r") as file:
    data = json.load(file)
    print(data["name"])
\`\`\`

## Practical Examples

### Simple Text Logger

\`\`\`python
from datetime import datetime

def log_message(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("app.log", "a") as file:
        file.write(f"[{timestamp}] {message}\n")

log_message("Application started")
log_message("User logged in")
log_message("Error occurred")
\`\`\`

### Contact Manager

\`\`\`python
import json

def load_contacts():
    try:
        with open("contacts.json", "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_contacts(contacts):
    with open("contacts.json", "w") as file:
        json.dump(contacts, file, indent=2)

def add_contact(name, phone):
    contacts = load_contacts()
    contacts[name] = phone
    save_contacts(contacts)
    print(f"Added {name}")

def search_contact(name):
    contacts = load_contacts()
    if name in contacts:
        print(f"{name}: {contacts[name]}")
    else:
        print("Contact not found")

def list_contacts():
    contacts = load_contacts()
    for name, phone in contacts.items():
        print(f"{name}: {phone}")

# Usage
add_contact("Alice", "555-1234")
add_contact("Bob", "555-5678")
list_contacts()
search_contact("Alice")
\`\`\`

### To-Do List App

\`\`\`python
def load_todos():
    try:
        with open("todos.txt", "r") as file:
            return [line.strip() for line in file]
    except FileNotFoundError:
        return []

def save_todos(todos):
    with open("todos.txt", "w") as file:
        for todo in todos:
            file.write(todo + "\n")

def add_todo(task):
    todos = load_todos()
    todos.append(task)
    save_todos(todos)
    print(f"Added: {task}")

def show_todos():
    todos = load_todos()
    if not todos:
        print("No tasks")
        return

    for i, todo in enumerate(todos, 1):
        print(f"{i}. {todo}")

def remove_todo(index):
    todos = load_todos()
    if 0 <= index < len(todos):
        removed = todos.pop(index)
        save_todos(todos)
        print(f"Removed: {removed}")

# Usage
add_todo("Buy groceries")
add_todo("Call dentist")
show_todos()
remove_todo(0)
\`\`\`

### Word Counter

\`\`\`python
def count_words(filename):
    try:
        with open(filename, "r") as file:
            text = file.read()
            words = text.lower().split()

            word_count = {}
            for word in words:
                word = word.strip(".,!?;:")
                word_count[word] = word_count.get(word, 0) + 1

            return word_count
    except FileNotFoundError:
        print(f"File '{filename}' not found")
        return {}

def save_report(word_count, output_file):
    sorted_words = sorted(word_count.items(),
                         key=lambda x: x[1],
                         reverse=True)

    with open(output_file, "w") as file:
        file.write("Word Frequency Report\n")
        file.write("=" * 40 + "\n\n")

        for word, count in sorted_words[:20]:
            file.write(f"{word:20} {count:5}\n")

        file.write(f"\nTotal words: {sum(word_count.values())}")
        file.write(f"\nUnique words: {len(word_count)}")

# Usage
counts = count_words("article.txt")
save_report(counts, "report.txt")
\`\`\`

### Grade Book System

\`\`\`python
import csv

def load_grades():
    try:
        with open("grades.csv", "r") as file:
            reader = csv.DictReader(file)
            return list(reader)
    except FileNotFoundError:
        return []

def save_grades(students):
    if not students:
        return

    with open("grades.csv", "w", newline="") as file:
        fieldnames = students[0].keys()
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(students)

def add_student(name, grade):
    students = load_grades()
    students.append({"name": name, "grade": grade})
    save_grades(students)
    print(f"Added {name} with grade {grade}")

def calculate_average():
    students = load_grades()
    if not students:
        return 0

    total = sum(float(s["grade"]) for s in students)
    return total / len(students)

def show_report():
    students = load_grades()

    print("\n=== Grade Report ===")
    for student in students:
        print(f"{student['name']:15} {student['grade']:5}")

    avg = calculate_average()
    print(f"\nClass Average: {avg:.2f}")

# Usage
add_student("Alice", 85)
add_student("Bob", 92)
add_student("Charlie", 78)
show_report()
\`\`\`

### Configuration File Manager

\`\`\`python
import json

class Config:
    def __init__(self, filename="config.json"):
        self.filename = filename
        self.settings = self.load()

    def load(self):
        try:
            with open(self.filename, "r") as file:
                return json.load(file)
        except FileNotFoundError:
            return {
                "theme": "dark",
                "language": "en",
                "auto_save": True
            }

    def save(self):
        with open(self.filename, "w") as file:
            json.dump(self.settings, file, indent=2)

    def get(self, key, default=None):
        return self.settings.get(key, default)

    def set(self, key, value):
        self.settings[key] = value
        self.save()

# Usage
config = Config()
print(config.get("theme"))
config.set("theme", "light")
config.set("font_size", 14)
\`\`\`

## Practice Exercises

1. Create a note-taking app with save/load
2. Build a simple database using CSV
3. Implement a backup system for files
4. Create a log file analyzer
5. Build a password manager (encrypted)
6. Create a file organizer by extension
7. Implement a simple text editor
8. Build a data export/import tool`,
        order_index: 8,
        duration_minutes: 40,
        has_code_exercise: true,
      },
    ];

    console.log('Inserting Python fundamentals lessons...');
    const { error: pythonLessonsError } = await supabase
      .from('lessons')
      .insert(pythonFundamentalsLessons);

    if (pythonLessonsError) throw pythonLessonsError;
    console.log(`Inserted ${pythonFundamentalsLessons.length} Python lessons`);

    console.log('✅ Seed data inserted successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    return false;
  }
}
