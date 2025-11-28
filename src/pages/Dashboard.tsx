import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BookOpen, Clock } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Enrollment = Database['public']['Tables']['enrollments']['Row'] & {
  courses?: Database['public']['Tables']['courses']['Row'];
};

export function Dashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadEnrollments();
    }
  }, [user]);

  const loadEnrollments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*, courses(*)')
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

        {enrollments.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Start learning by enrolling in a course</p>
              <Link to="/courses">
                <Button size="lg">Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.courses;
              if (!course) return null;

              return (
                <Card key={enrollment.id} hover>
                  {course.thumbnail_url && (
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-48 object-cover rounded-t-xl" />
                  )}
                  <CardHeader>
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(enrollment.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${enrollment.progress}%` }} />
                      </div>
                    </div>
                    <Link to={`/learn/${course.slug}`}>
                      <Button className="w-full">Continue Learning</Button>
                    </Link>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
