import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import type { Database } from '../lib/database.types';

type Course = Database['public']['Tables']['courses']['Row'];

export function CourseDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadCourse();
      if (user) checkEnrollment();
    }
  }, [slug, user]);

  const loadCourse = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setCourse(data);
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!user || !course) return;

    try {
      const { data } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .maybeSingle();

      setEnrolled(!!data);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!course) return;

    try {
      await supabase.from('cart_items').insert({
        user_id: user.id,
        course_id: course.id,
      });

      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center"><p>Course not found</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          {course.thumbnail_url && (
            <img src={course.thumbnail_url} alt={course.title} className="w-full h-64 object-cover rounded-t-xl" />
          )}
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Badge>{course.level}</Badge>
              <Badge variant="success">{course.category}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{course.short_description}</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">${course.price}</span>
              {enrolled ? (
                <Link to={`/learn/${course.slug}`}>
                  <Button size="lg">Continue Learning</Button>
                </Link>
              ) : (
                <Button size="lg" onClick={addToCart}>Add to Cart</Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">About This Course</h2>
            <p className="text-gray-700 whitespace-pre-line">{course.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
