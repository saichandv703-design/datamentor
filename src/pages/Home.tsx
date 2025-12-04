import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { BookOpen, Code, Cloud, Zap, Users, Award } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-white border-b-4 border-gfg-green py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Learn to Code with
              <span className="text-gfg-green"> Interactive Tutorials</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-3xl mx-auto">
              Master Python, SQL, and Advanced SQL with hands-on examples, practice exercises, and a built-in compiler
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-gfg-green hover:bg-gfg-green-dark text-white font-semibold">
                  Start Learning
                </Button>
              </Link>
              <Link to="/challenges">
                <Button size="lg" variant="outline" className="border-2 border-gfg-green text-gfg-green hover:bg-gfg-green hover:text-white">
                  Practice Problems
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-gfg-green" />
              <span>100+ Tutorials</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-gfg-green" />
              <span>Live Compiler</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gfg-green" />
              <span>Free Courses</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gfg-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Popular Courses</h2>
            <p className="text-lg text-gray-600">
              Start your coding journey with these comprehensive tutorials
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/courses/python-programming">
              <Card hover className="h-full border border-gfg-border hover:border-gfg-green transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-gfg-green rounded-lg flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Python Tutorial</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Learn Python from basics to advanced with hands-on examples and practice exercises
                  </p>
                  <div className="mt-4 text-gfg-green font-semibold text-sm">FREE • 8 Lessons</div>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/courses/sql-tutorial">
              <Card hover className="h-full border border-gfg-border hover:border-gfg-green transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-gfg-green rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">SQL Tutorial</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Master SQL from scratch with comprehensive examples covering queries, joins, and more
                  </p>
                  <div className="mt-4 text-gfg-green font-semibold text-sm">FREE • 8 Lessons</div>
                </CardHeader>
              </Card>
            </Link>
            <Link to="/courses/advanced-sql">
              <Card hover className="h-full border border-gfg-border hover:border-gfg-green transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-gfg-green rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Advanced SQL</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Take your SQL skills to the next level with window functions, CTEs, and optimization
                  </p>
                  <div className="mt-4 text-gfg-green font-semibold text-sm">FREE • 8 Lessons</div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Why Learn Here?</h2>
            <p className="text-lg text-gray-600">
              Everything you need to master programming
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-gfg-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Built-in Compiler</h3>
              <p className="text-gray-600">
                Write and execute code directly in your browser with instant results
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-gfg-green rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Step-by-Step Tutorials</h3>
              <p className="text-gray-600">
                Learn at your own pace with clear explanations and examples
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-gfg-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Practice Exercises</h3>
              <p className="text-gray-600">
                Reinforce your learning with hands-on coding challenges
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gfg-green text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Learning Today</h2>
          <p className="text-lg mb-8 text-green-50">
            Join thousands of learners and master Python, SQL, and more
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-gfg-green hover:bg-gray-100 font-semibold">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
