import { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CodeEditor } from '../components/CodeEditor';
import { Code, CheckCircle2, Circle } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  language: 'python' | 'sql';
  starterCode: string;
  category: string;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Print Hello World',
    difficulty: 'easy',
    description: 'Write a Python program that prints "Hello, World!" to the console.',
    language: 'python',
    starterCode: '# Write your code here\n',
    category: 'Python Basics',
  },
  {
    id: '2',
    title: 'Sum of Two Numbers',
    difficulty: 'easy',
    description: 'Write a Python function that takes two numbers as parameters and returns their sum.',
    language: 'python',
    starterCode: 'def add_numbers(a, b):\n    # Write your code here\n    pass\n\n# Test your function\nprint(add_numbers(5, 3))  # Should print 8',
    category: 'Python Basics',
  },
  {
    id: '3',
    title: 'Find Maximum in List',
    difficulty: 'easy',
    description: 'Write a Python function that finds the maximum number in a list.',
    language: 'python',
    starterCode: 'def find_max(numbers):\n    # Write your code here\n    pass\n\n# Test your function\nprint(find_max([3, 7, 2, 9, 1]))  # Should print 9',
    category: 'Python Lists',
  },
  {
    id: '4',
    title: 'Count Vowels',
    difficulty: 'medium',
    description: 'Write a Python function that counts the number of vowels in a string.',
    language: 'python',
    starterCode: 'def count_vowels(text):\n    # Write your code here\n    pass\n\n# Test your function\nprint(count_vowels("Hello World"))  # Should print 3',
    category: 'Python Strings',
  },
  {
    id: '5',
    title: 'FizzBuzz',
    difficulty: 'medium',
    description: 'Print numbers from 1 to 20. For multiples of 3, print "Fizz"; for multiples of 5, print "Buzz"; for multiples of both, print "FizzBuzz".',
    language: 'python',
    starterCode: '# Write your code here\nfor i in range(1, 21):\n    # Your logic here\n    pass',
    category: 'Python Logic',
  },
  {
    id: '6',
    title: 'Reverse a String',
    difficulty: 'easy',
    description: 'Write a Python function that reverses a string.',
    language: 'python',
    starterCode: 'def reverse_string(text):\n    # Write your code here\n    pass\n\n# Test your function\nprint(reverse_string("Python"))  # Should print "nohtyP"',
    category: 'Python Strings',
  },
  {
    id: '7',
    title: 'Select All Customers',
    difficulty: 'easy',
    description: 'Write a SQL query to select all columns from the customers table.',
    language: 'sql',
    starterCode: '-- Write your query here\n',
    category: 'SQL Basics',
  },
  {
    id: '8',
    title: 'Filter by Country',
    difficulty: 'easy',
    description: 'Write a SQL query to select all customers from USA.',
    language: 'sql',
    starterCode: 'SELECT * FROM customers\n-- Add your WHERE clause here',
    category: 'SQL Filtering',
  },
  {
    id: '9',
    title: 'Count Products',
    difficulty: 'medium',
    description: 'Write a SQL query to count the number of products in each category.',
    language: 'sql',
    starterCode: 'SELECT category, COUNT(*) as product_count\nFROM products\n-- Add GROUP BY clause here',
    category: 'SQL Aggregation',
  },
  {
    id: '10',
    title: 'Join Orders and Customers',
    difficulty: 'medium',
    description: 'Write a SQL query to join orders and customers tables and show customer names with their orders.',
    language: 'sql',
    starterCode: 'SELECT c.first_name, c.last_name, o.order_id, o.total_amount\nFROM orders o\n-- Add your JOIN clause here',
    category: 'SQL Joins',
  },
  {
    id: '11',
    title: 'Palindrome Checker',
    difficulty: 'medium',
    description: 'Write a Python function that checks if a string is a palindrome.',
    language: 'python',
    starterCode: 'def is_palindrome(text):\n    # Write your code here\n    pass\n\n# Test your function\nprint(is_palindrome("racecar"))  # Should print True\nprint(is_palindrome("hello"))    # Should print False',
    category: 'Python Strings',
  },
  {
    id: '12',
    title: 'Factorial Calculator',
    difficulty: 'hard',
    description: 'Write a Python function that calculates the factorial of a number using recursion.',
    language: 'python',
    starterCode: 'def factorial(n):\n    # Write your code here\n    pass\n\n# Test your function\nprint(factorial(5))  # Should print 120',
    category: 'Python Recursion',
  },
];

export function Practice() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [filter, setFilter] = useState<'all' | 'python' | 'sql'>('all');
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  const filteredChallenges = challenges.filter(
    (challenge) => filter === 'all' || challenge.language === filter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gfg-gray py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Practice Problems</h1>
          <p className="text-lg text-gray-600">
            Improve your coding skills with hands-on exercises
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-gfg-green text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gfg-border'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('python')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'python'
                ? 'bg-gfg-green text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gfg-border'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setFilter('sql')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'sql'
                ? 'bg-gfg-green text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gfg-border'
            }`}
          >
            SQL
          </button>
        </div>

        {!selectedChallenge ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                hover
                className="cursor-pointer border border-gfg-border hover:border-gfg-green transition-all"
                onClick={() => setSelectedChallenge(challenge)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {completedChallenges.has(challenge.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-gfg-green" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                      <Badge variant={challenge.difficulty as any} className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {challenge.language.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <div className="text-xs text-gray-500">{challenge.category}</div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="border border-gfg-border">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-gfg-green" />
                    <h2 className="text-2xl font-bold text-gray-900">{selectedChallenge.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="text-gfg-green hover:text-gfg-green-dark font-medium"
                  >
                    ← Back to Problems
                  </button>
                </div>
                <div className="flex gap-2 mb-4">
                  <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                    {selectedChallenge.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {selectedChallenge.language.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary" className="bg-gfg-green/10 text-gfg-green">
                    {selectedChallenge.category}
                  </Badge>
                </div>
                <p className="text-gray-700 text-lg">{selectedChallenge.description}</p>
              </CardHeader>
            </Card>

            <Card className="border border-gfg-border">
              <CardContent>
                <CodeEditor
                  initialCode={selectedChallenge.starterCode}
                  language={selectedChallenge.language}
                  lessonId={selectedChallenge.id}
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setCompletedChallenges((prev) => new Set(prev).add(selectedChallenge.id));
                      alert('Challenge marked as complete! Keep up the great work!');
                    }}
                    className="px-6 py-2 bg-gfg-green text-white font-medium rounded-lg hover:bg-gfg-green-dark transition-colors"
                  >
                    Mark as Complete
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
