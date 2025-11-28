import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Course = Database['public']['Tables']['courses']['Row'];

export function CourseManager() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCourses();
    }
  }, [user]);

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;
      await loadCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const togglePublish = async (courseId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ is_published: !currentStatus })
        .eq('id', courseId);

      if (error) throw error;
      await loadCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">{courses.length} total courses</p>
          </div>
          <Link to="/admin/courses/new">
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              New Course
            </Button>
          </Link>
        </div>

        {courses.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Create your first course to get started</p>
              <Link to="/admin/courses/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {course.thumbnail_url && (
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {course.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant={course.is_published ? 'success' : 'default'}>
                              {course.is_published ? 'Published' : 'Draft'}
                            </Badge>
                            <span className="text-sm text-gray-500">{course.level}</span>
                            <span className="text-sm text-gray-500">{course.category}</span>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                          ${course.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.short_description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Link to={`/admin/courses/${course.id}/edit`}>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Link to={`/admin/courses/${course.id}/lessons`}>
                          <Button size="sm" variant="outline">
                            Manage Lessons
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => togglePublish(course.id, course.is_published)}
                        >
                          {course.is_published ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
