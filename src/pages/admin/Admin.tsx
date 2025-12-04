import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { BookOpen, Users, ShoppingCart, Plus, Database } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { seedDatabase } from '../../lib/seed-data';
import { useState } from 'react';

export function Admin() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedMessage('');
    try {
      await seedDatabase();
      setSeedMessage('Database seeded successfully! Refresh the Courses page to see the new content.');
    } catch (error) {
      setSeedMessage('Error seeding database. Make sure you are logged in.');
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
              <p className="text-xl text-gray-600">Manage your platform</p>
            </div>
            <Button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="bg-green-600 hover:bg-green-700"
            >
              <Database className="h-4 w-4 mr-2" />
              {isSeeding ? 'Seeding...' : 'Seed Database'}
            </Button>
          </div>
          {seedMessage && (
            <div className={`p-4 rounded-lg ${seedMessage.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
              {seedMessage}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">1,234</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">$45.2K</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Labs</p>
                  <p className="text-3xl font-bold text-gray-900">28</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hover>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
                <Link to="/admin/courses/new">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Course
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Create, edit, and manage courses and lessons
              </p>
              <Link to="/admin/courses">
                <Button variant="outline" className="w-full">
                  Manage Courses
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View and manage user accounts and permissions
              </p>
              <Link to="/admin/users">
                <Button variant="outline" className="w-full">
                  Manage Users
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">Orders & Enrollments</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View purchase history and enrollment data
              </p>
              <Link to="/admin/orders">
                <Button variant="outline" className="w-full">
                  View Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">Lab Sessions</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Monitor active lab sessions and usage
              </p>
              <Link to="/admin/labs">
                <Button variant="outline" className="w-full">
                  View Lab Sessions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
