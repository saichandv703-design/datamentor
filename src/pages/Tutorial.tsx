import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, ChevronRight, ChevronDown, CheckCircle } from 'lucide-react';

interface TutorialSection {
  title: string;
  icon: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    completed?: boolean;
  }[];
}

interface TutorialContent {
  id: string;
  title: string;
  content: string;
}

const SQL_TUTORIAL_SECTIONS: TutorialSection[] = [
  {
    title: 'Getting Started',
    icon: '📘',
    lessons: [
      { id: 'intro', title: 'Introduction to SQL', duration: '10 min' },
      { id: 'install', title: 'Installing SQLite', duration: '15 min' },
      { id: 'first-query', title: 'Your First Query', duration: '12 min' },
    ],
  },
  {
    title: 'Core SELECT Operations',
    icon: '📗',
    lessons: [
      { id: 'select-basics', title: 'SELECT Statement Basics', duration: '15 min' },
      { id: 'where', title: 'Filtering with WHERE', duration: '20 min' },
      { id: 'sorting', title: 'Sorting and Limiting', duration: '18 min' },
    ],
  },
  {
    title: 'Working with Multiple Tables',
    icon: '📙',
    lessons: [
      { id: 'joins-intro', title: 'Understanding JOINs', duration: '15 min' },
      { id: 'join-types', title: 'JOIN Types (INNER, LEFT, RIGHT)', duration: '25 min' },
      { id: 'multiple-joins', title: 'Multiple Table Joins', duration: '20 min' },
    ],
  },
  {
    title: 'Aggregations & Grouping',
    icon: '📕',
    lessons: [
      { id: 'aggregates', title: 'Aggregate Functions', duration: '20 min' },
      { id: 'group-by', title: 'GROUP BY Clause', duration: '18 min' },
      { id: 'having', title: 'HAVING vs WHERE', duration: '15 min' },
    ],
  },
  {
    title: 'Data Manipulation',
    icon: '📓',
    lessons: [
      { id: 'insert', title: 'INSERT Data', duration: '12 min' },
      { id: 'update', title: 'UPDATE Records', duration: '15 min' },
      { id: 'delete', title: 'DELETE Records', duration: '10 min' },
    ],
  },
];

const ADVANCED_SQL_SECTIONS: TutorialSection[] = [
  {
    title: 'Window Functions',
    icon: '🎯',
    lessons: [
      { id: 'window-intro', title: 'Window Functions Basics', duration: '25 min' },
      { id: 'row-number', title: 'ROW_NUMBER & RANK', duration: '20 min' },
      { id: 'lag-lead', title: 'LAG and LEAD Functions', duration: '22 min' },
      { id: 'moving-avg', title: 'Moving Averages', duration: '20 min' },
    ],
  },
  {
    title: 'Common Table Expressions',
    icon: '🔧',
    lessons: [
      { id: 'cte-basics', title: 'CTE Basics', duration: '18 min' },
      { id: 'recursive-cte', title: 'Recursive CTEs', duration: '30 min' },
      { id: 'cte-vs-subquery', title: 'CTEs vs Subqueries', duration: '15 min' },
    ],
  },
  {
    title: 'Query Optimization',
    icon: '⚡',
    lessons: [
      { id: 'indexes', title: 'Understanding Indexes', duration: '25 min' },
      { id: 'explain', title: 'Reading EXPLAIN Plans', duration: '20 min' },
      { id: 'optimization', title: 'Query Optimization Techniques', duration: '30 min' },
    ],
  },
  {
    title: 'Advanced Techniques',
    icon: '🚀',
    lessons: [
      { id: 'subqueries', title: 'Complex Subqueries', duration: '25 min' },
      { id: 'pivot', title: 'Pivot and Unpivot', duration: '20 min' },
      { id: 'analytical', title: 'Analytical Queries', duration: '28 min' },
    ],
  },
];

const TUTORIAL_CONTENT: Record<string, TutorialContent> = {
  'first-query': {
    id: 'first-query',
    title: 'Your First Query',
    content: `# Your First Query

Now that you have SQLite installed, let's write and execute your first SQL queries!

## Setting Up Practice Data

First, let's create a simple database with some data to practice with.

### Step 1: Create Database and Table

\`\`\`bash
sqlite3 myFirstDatabase.db
\`\`\`

\`\`\`sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER,
    genre TEXT,
    rating REAL
);
\`\`\`

### Step 2: Insert Sample Data

\`\`\`sql
INSERT INTO books (title, author, year, genre, rating) VALUES
    ('1984', 'George Orwell', 1949, 'Fiction', 4.7),
    ('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction', 4.8),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Fiction', 4.4),
    ('Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 4.6),
    ('The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 4.7);
\`\`\`

## Your First SELECT Query

The most basic SQL command is SELECT - it retrieves data from a table.

### Select Everything

\`\`\`sql
SELECT * FROM books;
\`\`\`

**Output:**
\`\`\`
1|1984|George Orwell|1949|Fiction|4.7
2|To Kill a Mockingbird|Harper Lee|1960|Fiction|4.8
3|The Great Gatsby|F. Scott Fitzgerald|1925|Fiction|4.4
4|Pride and Prejudice|Jane Austen|1813|Romance|4.6
5|The Hobbit|J.R.R. Tolkien|1937|Fantasy|4.7
\`\`\`

### Select Specific Columns

\`\`\`sql
SELECT title, author FROM books;
\`\`\`

**Output:**
\`\`\`
1984|George Orwell
To Kill a Mockingbird|Harper Lee
The Great Gatsby|F. Scott Fitzgerald
Pride and Prejudice|Jane Austen
The Hobbit|J.R.R. Tolkien
\`\`\`

## Filtering Results with WHERE

Find specific records using conditions:

### Books from a Specific Year

\`\`\`sql
SELECT title, year FROM books
WHERE year > 1940;
\`\`\`

### Books by a Specific Author

\`\`\`sql
SELECT * FROM books
WHERE author = 'George Orwell';
\`\`\`

### High-Rated Books

\`\`\`sql
SELECT title, rating FROM books
WHERE rating >= 4.7;
\`\`\`

## Sorting Results

### Sort by Year (Oldest First)

\`\`\`sql
SELECT title, year FROM books
ORDER BY year ASC;
\`\`\`

### Sort by Rating (Highest First)

\`\`\`sql
SELECT title, rating FROM books
ORDER BY rating DESC;
\`\`\`

## Limiting Results

### Top 3 Rated Books

\`\`\`sql
SELECT title, rating FROM books
ORDER BY rating DESC
LIMIT 3;
\`\`\`

## Practice Exercises

Try these queries on your own:

**Exercise 1:** Select only the title and genre of all books

**Exercise 2:** Find all Fiction books

**Exercise 3:** Find books published before 1950

**Exercise 4:** Sort books alphabetically by title

**Exercise 5:** Find the oldest book in the database

---

### Solutions

\`\`\`sql
-- Exercise 1
SELECT title, genre FROM books;

-- Exercise 2
SELECT * FROM books WHERE genre = 'Fiction';

-- Exercise 3
SELECT * FROM books WHERE year < 1950;

-- Exercise 4
SELECT * FROM books ORDER BY title;

-- Exercise 5
SELECT * FROM books ORDER BY year LIMIT 1;
\`\`\`

## Key Takeaways

✅ \`SELECT *\` retrieves all columns
✅ \`SELECT column1, column2\` retrieves specific columns
✅ \`WHERE\` filters rows based on conditions
✅ \`ORDER BY\` sorts results
✅ \`LIMIT\` restricts the number of rows returned

**Next:** Learn advanced SELECT operations and column aliases!`,
  },
  intro: {
    id: 'intro',
    title: 'Introduction to SQL',
    content: `# Introduction to SQL

## What is SQL?

**SQL (Structured Query Language)** is the standard language for working with relational databases. It allows you to:

- 📊 **Query** data (retrieve information)
- ➕ **Insert** new data
- ✏️ **Update** existing data
- 🗑️ **Delete** data
- 🏗️ **Create** database structures

## Why Learn SQL?

### 1. Universal Language
SQL works across all major database systems:
- MySQL
- PostgreSQL
- SQL Server
- Oracle
- SQLite

### 2. Essential for Data Careers
SQL is required for:
- Data Analysts
- Data Engineers
- Data Scientists
- Backend Developers
- Business Analysts

### 3. Powerful & Fast
- Query millions of records in seconds
- Perform complex data analysis
- Combine data from multiple sources

### 4. Easy to Learn
SQL has an English-like syntax that's intuitive and readable.

## Database Basics

### What is a Database?
A database is an organized collection of data stored electronically. Think of it as a digital filing cabinet.

### Relational Databases
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

**Row (Record)**: A single entry (e.g., one employee)

**Column (Field)**: A specific attribute (e.g., first_name, salary)

**Primary Key**: Unique identifier for each row (e.g., id)

**Foreign Key**: Links tables together (e.g., department_id references departments table)

## SQL Statement Categories

### DQL - Data Query Language
\`\`\`sql
SELECT * FROM employees;
\`\`\`
Retrieve data from tables.

### DML - Data Manipulation Language
\`\`\`sql
INSERT INTO employees VALUES (...);
UPDATE employees SET salary = 55000 WHERE id = 1;
DELETE FROM employees WHERE id = 5;
\`\`\`
Modify data in tables.

### DDL - Data Definition Language
\`\`\`sql
CREATE TABLE employees (...);
ALTER TABLE employees ADD COLUMN email VARCHAR(100);
DROP TABLE old_table;
\`\`\`
Define and modify database structure.

### DCL - Data Control Language
\`\`\`sql
GRANT SELECT ON employees TO user123;
REVOKE DELETE ON employees FROM user123;
\`\`\`
Control access permissions.

## Your First SQL Query

Let's retrieve all data from the employees table:

\`\`\`sql
SELECT * FROM employees;
\`\`\`

**Breakdown:**
- \`SELECT\` - Command to retrieve data
- \`*\` - Means "all columns"
- \`FROM employees\` - Specifies the table

## What's Next?

In the next lesson, you'll learn how to install SQLite and start writing queries on your own computer!

---

### Practice Question
**Q:** What does DML stand for and what operations does it include?

**A:** Data Manipulation Language. It includes INSERT, UPDATE, and DELETE operations for modifying data.`,
  },
  install: {
    id: 'install',
    title: 'Installing SQLite',
    content: `# Installing SQLite

SQLite is a lightweight, serverless database that's perfect for learning SQL. It's fast, reliable, and requires no configuration!

## Why SQLite for Learning?

✅ **No server setup** - Everything runs locally
✅ **Zero configuration** - Just install and go
✅ **Lightweight** - Only a few megabytes
✅ **Full SQL support** - Learn real SQL syntax
✅ **Portable** - Database is a single file

## Installation Instructions

### Windows

#### Option 1: Download Precompiled Binaries

1. **Download SQLite Tools**
   - Visit: https://www.sqlite.org/download.html
   - Download: \`sqlite-tools-win32-x86-*.zip\`

2. **Extract Files**
   - Unzip to \`C:\\sqlite\`
   - You'll see: \`sqlite3.exe\`

3. **Add to PATH** (Optional but recommended)
   - Right-click "This PC" → Properties
   - Advanced system settings → Environment Variables
   - Edit "Path" → New → Add \`C:\\sqlite\`

4. **Verify Installation**
   \`\`\`bash
   sqlite3 --version
   \`\`\`

#### Option 2: Using Chocolatey Package Manager

\`\`\`bash
choco install sqlite
\`\`\`

### macOS

#### Option 1: Using Homebrew (Recommended)

\`\`\`bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install SQLite
brew install sqlite
\`\`\`

#### Option 2: SQLite is Pre-installed

macOS comes with SQLite! Check with:

\`\`\`bash
sqlite3 --version
\`\`\`

If you see a version number, you're ready to go!

### Linux (Ubuntu/Debian)

\`\`\`bash
sudo apt update
sudo apt install sqlite3
\`\`\`

### Linux (Fedora/RHEL)

\`\`\`bash
sudo dnf install sqlite
\`\`\`

## Verify Installation

Open your terminal/command prompt and run:

\`\`\`bash
sqlite3 --version
\`\`\`

You should see output like:
\`\`\`
3.42.0 2023-05-16 12:36:15
\`\`\`

## Creating Your First Database

### 1. Start SQLite

\`\`\`bash
sqlite3 learning.db
\`\`\`

This creates a new database file called \`learning.db\`.

### 2. Create Your First Table

\`\`\`sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    grade TEXT
);
\`\`\`

### 3. Insert Sample Data

\`\`\`sql
INSERT INTO students (name, age, grade) VALUES
    ('Alice', 20, 'A'),
    ('Bob', 22, 'B'),
    ('Charlie', 21, 'A');
\`\`\`

### 4. Query Your Data

\`\`\`sql
SELECT * FROM students;
\`\`\`

**Output:**
\`\`\`
1|Alice|20|A
2|Bob|22|B
3|Charlie|21|A
\`\`\`

## SQLite Command-Line Basics

### Useful Commands

\`\`\`sql
-- List all tables
.tables

-- Show table structure
.schema students

-- Change output mode
.mode column
.headers on

-- Exit SQLite
.quit
\`\`\`

### Pretty Output Format

\`\`\`sql
.mode column
.headers on
.width auto

SELECT * FROM students;
\`\`\`

**Better Output:**
\`\`\`
id  name     age  grade
--  -------  ---  -----
1   Alice    20   A
2   Bob      22   B
3   Charlie  21   A
\`\`\`

## SQLite GUI Tools (Optional)

While command-line is great for learning, you might want a visual interface:

### DB Browser for SQLite (Free)
- Download: https://sqlitebrowser.org/
- Available for Windows, macOS, Linux
- Visual table editor, query builder

### DBeaver (Free)
- Download: https://dbeaver.io/
- Supports multiple databases
- Professional-grade features

## Practice Database Setup

Let's create a practice database with sample data:

\`\`\`bash
sqlite3 practice.db
\`\`\`

\`\`\`sql
-- Create employees table
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    department TEXT,
    salary INTEGER,
    hire_date DATE
);

-- Insert sample data
INSERT INTO employees (first_name, last_name, department, salary, hire_date) VALUES
    ('John', 'Doe', 'Sales', 50000, '2022-01-15'),
    ('Jane', 'Smith', 'Marketing', 60000, '2021-03-20'),
    ('Bob', 'Johnson', 'IT', 70000, '2020-06-10'),
    ('Alice', 'Williams', 'Sales', 55000, '2023-02-01'),
    ('Charlie', 'Brown', 'IT', 75000, '2019-11-05');

-- Create departments table
CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT
);

INSERT INTO departments VALUES
    (1, 'Sales', 'New York'),
    (2, 'Marketing', 'Chicago'),
    (3, 'IT', 'San Francisco');
\`\`\`

## Test Your Setup

Run this query to verify everything works:

\`\`\`sql
SELECT first_name, last_name, department, salary
FROM employees
WHERE salary > 55000
ORDER BY salary DESC;
\`\`\`

If you see results, congratulations! You're ready to start learning SQL! 🎉

## Troubleshooting

**Issue:** "sqlite3 command not found"
**Solution:** Make sure SQLite is in your PATH or use the full path to the executable.

**Issue:** Database file not found
**Solution:** Check your current directory or specify full path: \`sqlite3 /path/to/database.db\`

**Issue:** Permission denied
**Solution:** Make sure you have write permissions in the current directory.

---

### Quick Reference Card

\`\`\`bash
# Start SQLite
sqlite3 database.db

# SQLite commands (start with .)
.tables          # List tables
.schema table    # Show table structure
.quit            # Exit
.help            # Show all commands

# SQL statements (end with ;)
SELECT * FROM table;
CREATE TABLE ...;
INSERT INTO ...;
\`\`\`

**Next:** In the next lesson, you'll write your first queries!`,
  },
};

export function Tutorial() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [currentLesson, setCurrentLesson] = useState('intro');

  const isAdvanced = slug === 'advanced-sql';
  const sections = isAdvanced ? ADVANCED_SQL_SECTIONS : SQL_TUTORIAL_SECTIONS;
  const tutorialTitle = isAdvanced ? 'Advanced SQL Mastery' : 'SQL Tutorial';

  useEffect(() => {
    const allSections = sections.reduce((acc, section) => {
      acc[section.title] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedSections(allSections);
  }, [slug]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const currentContent = TUTORIAL_CONTENT[currentLesson] || {
    id: currentLesson,
    title: 'Coming Soon',
    content: '# Coming Soon\n\nThis lesson content is being prepared. Check back soon!',
  };

  const handleLessonClick = (lessonId: string) => {
    setCurrentLesson(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 min-h-screen sticky top-0 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={() => navigate('/courses')}
              className="text-sm text-gray-600 hover:text-gray-900 mb-3 flex items-center gap-1"
            >
              ← Back to Courses
            </button>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Book className="w-6 h-6 text-blue-600" />
              {tutorialTitle}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {sections.reduce((acc, s) => acc + s.lessons.length, 0)} lessons
            </p>
          </div>

          <nav className="p-4">
            {sections.map((section) => (
              <div key={section.title} className="mb-2">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <span className="font-semibold text-gray-900 text-sm">
                      {section.title}
                    </span>
                  </div>
                  {expandedSections[section.title] ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {expandedSections[section.title] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          currentLesson === lesson.id
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{lesson.title}</span>
                          {lesson.completed && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {lesson.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <article className="max-w-4xl mx-auto px-8 py-12">
            <div className="prose prose-lg prose-slate max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownToHTML(currentContent.content),
                }}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                ← Previous Lesson
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                Next Lesson →
              </button>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;

  html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-6 text-gray-900">$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-12 mb-4 text-gray-900">$2</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-3 text-gray-900">$3</h3>');

  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-gray-900">$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  html = html.replace(/```sql\n([\s\S]*?)```/gim, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-sql">$1</code></pre>');
  html = html.replace(/```bash\n([\s\S]*?)```/gim, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-bash">$1</code></pre>');
  html = html.replace(/```\n([\s\S]*?)```/gim, '<pre class="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/gim, '<code class="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">$1</code>');

  html = html.replace(/^- (.*$)/gim, '<li class="ml-6 my-2">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/gim, '<ul class="list-disc space-y-2 my-4">$&</ul>');

  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 my-2">$1</li>');

  html = html.replace(/^(?!<[hl]|<pre|<ul|<li)(.*$)/gim, '<p class="my-4 text-gray-700 leading-relaxed">$1</p>');

  html = html.replace(/✅/g, '<span class="text-green-600">✅</span>');
  html = html.replace(/📊|➕|✏️|🗑️|🏗️/g, (match) => `<span class="text-2xl mr-2">${match}</span>`);

  html = html.replace(/^---$/gim, '<hr class="my-8 border-gray-300" />');

  return html;
}
