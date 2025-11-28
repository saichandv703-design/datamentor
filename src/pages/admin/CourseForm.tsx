import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';

export function CourseForm() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    thumbnail_url: '',
    price: '0',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    category: 'data-engineering' as 'data-engineering' | 'ai-ml' | 'cloud',
    is_published: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadCourse();
    }
  }, [id]);

  const loadCourse = async () => {
    if (!id || id === 'new') return;

    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          short_description: data.short_description,
          description: data.description,
          thumbnail_url: data.thumbnail_url || '',
          price: data.price.toString(),
          level: data.level,
          category: data.category,
          is_published: data.is_published,
        });
      }
    } catch (error) {
      console.error('Error loading course:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        instructor_id: user.id,
      };

      if (id && id !== 'new') {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('courses')
          .insert(courseData);

        if (error) throw error;
      }

      navigate('/admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {id && id !== 'new' ? 'Edit Course' : 'Create New Course'}
          </h1>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Course Title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }}
                required
              />

              <Input
                label="URL Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />

              <Input
                label="Short Description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={6}
                  required
                />
              </div>

              <Input
                label="Thumbnail URL"
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="https://images.pexels.com/..."
              />

              <Input
                label="Price ($)"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="data-engineering">Data Engineering</option>
                  <option value="ai-ml">AI/ML</option>
                  <option value="cloud">Cloud</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Publish course (make visible to students)
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Course'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/courses')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
