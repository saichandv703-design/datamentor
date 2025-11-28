export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'student' | 'instructor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          short_description: string
          description: string
          thumbnail_url: string | null
          price: number
          level: 'beginner' | 'intermediate' | 'advanced'
          category: 'data-engineering' | 'ai-ml' | 'cloud'
          instructor_id: string
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          short_description: string
          description: string
          thumbnail_url?: string | null
          price: number
          level: 'beginner' | 'intermediate' | 'advanced'
          category: 'data-engineering' | 'ai-ml' | 'cloud'
          instructor_id: string
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          short_description?: string
          description?: string
          thumbnail_url?: string | null
          price?: number
          level?: 'beginner' | 'intermediate' | 'advanced'
          category?: 'data-engineering' | 'ai-ml' | 'cloud'
          instructor_id?: string
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          slug: string
          content: string
          order_index: number
          duration_minutes: number
          has_code_exercise: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          slug: string
          content: string
          order_index: number
          duration_minutes: number
          has_code_exercise?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          slug?: string
          content?: string
          order_index?: number
          duration_minutes?: number
          has_code_exercise?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          enrolled_at: string
          progress: number
          completed: boolean
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          enrolled_at?: string
          progress?: number
          completed?: boolean
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          enrolled_at?: string
          progress?: number
          completed?: boolean
          completed_at?: string | null
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          course_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          status: 'pending' | 'completed' | 'failed'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          course_id: string
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          course_id: string
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          course_id?: string
          price?: number
          created_at?: string
        }
      }
      lab_sessions: {
        Row: {
          id: string
          user_id: string
          course_id: string
          lab_type: 'snowflake' | 'databricks' | 'general'
          status: 'starting' | 'running' | 'stopping' | 'stopped'
          started_at: string | null
          stopped_at: string | null
          connection_info: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          lab_type: 'snowflake' | 'databricks' | 'general'
          status?: 'starting' | 'running' | 'stopping' | 'stopped'
          started_at?: string | null
          stopped_at?: string | null
          connection_info?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          lab_type?: 'snowflake' | 'databricks' | 'general'
          status?: 'starting' | 'running' | 'stopping' | 'stopped'
          started_at?: string | null
          stopped_at?: string | null
          connection_info?: Json | null
          created_at?: string
        }
      }
      code_submissions: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          code: string
          language: 'python' | 'sql'
          output: string | null
          status: 'success' | 'error'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          code: string
          language: 'python' | 'sql'
          output?: string | null
          status?: 'success' | 'error'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          code?: string
          language?: 'python' | 'sql'
          output?: string | null
          status?: 'success' | 'error'
          created_at?: string
        }
      }
    }
  }
}
