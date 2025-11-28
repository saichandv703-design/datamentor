import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '../components/ui/Card';
import { CodeEditor } from '../components/CodeEditor';
import type { Database } from '../lib/database.types';

type Lesson = Database['public']['Tables']['lessons']['Row'];

export function LearnCourse() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && user) {
      loadLessons();
    }
  }, [slug, user]);

  const loadLessons = async () => {
    try {
      const { data: course } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', slug)
        .single();

      if (!course) return;

      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', course.id)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setLessons(data || []);
      if (data && data.length > 0) {
        setCurrentLesson(data[0]);
      }
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 bg-white border-r min-h-screen p-4">
          <h2 className="font-bold mb-4">Lessons</h2>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full text-left p-3 rounded-lg text-sm ${
                  currentLesson?.id === lesson.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                }`}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-8">
          {currentLesson ? (
            <Card>
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold mb-6">{currentLesson.title}</h1>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{currentLesson.content}</p>
                </div>
                {currentLesson.has_code_exercise && (
                  <div className="mt-8">
                    <CodeEditor
                      lessonId={currentLesson.id}
                      language="python"
                      initialCode="# Write your code here\nprint('Hello, World!')"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-gray-600">No lessons available</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
