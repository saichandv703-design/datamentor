import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import type { Database } from '../lib/database.types';

type CartItem = Database['public']['Tables']['cart_items']['Row'] & {
  courses?: Database['public']['Tables']['courses']['Row'];
};

export function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, courses(*)')
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const checkout = async () => {
    if (!user || cartItems.length === 0) return;

    setProcessing(true);
    try {
      const total = cartItems.reduce((sum, item) => {
        return sum + (item.courses?.price || 0);
      }, 0);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        course_id: item.course_id,
        price: item.courses?.price || 0,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await new Promise(resolve => setTimeout(resolve, 1500));

      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', order.id);

      if (updateError) throw updateError;

      const enrollments = cartItems.map(item => ({
        user_id: user.id,
        course_id: item.course_id,
      }));

      const { error: enrollError } = await supabase
        .from('enrollments')
        .insert(enrollments);

      if (enrollError) throw enrollError;

      const { error: clearError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (clearError) throw clearError;

      navigate('/dashboard');
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('Failed to process checkout. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading cart...</p>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.courses?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Start adding courses to your cart to begin learning
              </p>
              <Link to="/courses">
                <Button size="lg">Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const course = item.courses;
                if (!course) return null;

                return (
                  <Card key={item.id}>
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
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {course.short_description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">
                              ${course.price.toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={checkout}
                      disabled={processing}
                    >
                      {processing ? (
                        'Processing...'
                      ) : (
                        <>
                          Checkout
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      By completing your purchase you agree to our Terms of Service
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
