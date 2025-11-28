import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { BookOpen, Code, Cloud, Zap, Users, Award } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 animate-fade-in">
            🚀 Join 10,000+ learners worldwide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up leading-tight">
            Master Data Engineering<br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              & AI/ML
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Learn with interactive courses, real cloud labs, and hands-on projects. From SQL basics to advanced ML pipelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
            <Link to="/courses">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Browse Courses
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                Start Learning Free
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm animate-fade-in animation-delay-600">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              <span>Industry-recognized</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              <span>10k+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-400" />
              <span>100% Hands-on</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose DataLearn?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to become a world-class data professional
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="group transition-all duration-300 hover:shadow-2xl border-t-4 border-t-blue-500">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Interactive Code Editor</h3>
                <p className="text-gray-600 leading-relaxed">
                  Practice Python and SQL directly in your browser with instant feedback and AI-powered assistance
                </p>
              </CardHeader>
            </Card>
            <Card hover className="group transition-all duration-300 hover:shadow-2xl border-t-4 border-t-green-500">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Cloud Lab Access</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get hands-on with Snowflake and Databricks in real cloud environments without paying for access
                </p>
              </CardHeader>
            </Card>
            <Card hover className="group transition-all duration-300 hover:shadow-2xl border-t-4 border-t-orange-500">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Learn by Doing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Build real projects and gain practical skills that employers value through project-based learning
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover>
              <CardHeader className="text-center">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">$0</div>
                <p className="text-gray-600">Perfect to get started</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li>✓ Access to free courses</li>
                  <li>✓ Community support</li>
                  <li>✓ Basic code editor</li>
                  <li>✗ Cloud labs</li>
                </ul>
                <Link to="/signup">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="border-2 border-blue-600">
              <CardHeader className="text-center">
                <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-2">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">$49<span className="text-lg text-gray-600">/mo</span></div>
                <p className="text-gray-600">For serious learners</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li>✓ All free features</li>
                  <li>✓ Access to all courses</li>
                  <li>✓ Unlimited cloud labs</li>
                  <li>✓ Priority support</li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover>
              <CardHeader className="text-center">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">Custom</div>
                <p className="text-gray-600">For teams and organizations</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li>✓ All Pro features</li>
                  <li>✓ Custom content</li>
                  <li>✓ Team analytics</li>
                  <li>✓ Dedicated support</li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                    S
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-gray-600">Data Engineer at AWS</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The hands-on Snowflake labs were incredible. I learned more in 2 weeks than I did in 6 months on my own."
                </p>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">
                    M
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">Marcus Johnson</div>
                    <div className="text-sm text-gray-600">ML Engineer at Google</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Best platform for learning data engineering. The interactive exercises make complex concepts easy to understand."
                </p>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-lg">
                    P
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">Priya Patel</div>
                    <div className="text-sm text-gray-600">Data Scientist at Microsoft</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The cloud lab access is a game-changer. I could practice with real tools without spending money on cloud resources."
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students mastering Data Engineering and AI/ML
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
