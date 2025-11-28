# DataLearn - Interactive Learning Platform

A full-stack web application similar to Educative.io, focused on Data Engineering, AI/ML, and hands-on cloud labs.

## Features Implemented

### 1. Complete Database Schema
- **10 tables** with proper relationships and constraints
- **Row Level Security (RLS)** enabled on all tables
- **Comprehensive policies** for students, instructors, and admins
- Tables: profiles, courses, lessons, enrollments, lesson_progress, cart_items, orders, order_items, lab_sessions, code_submissions

### 2. Authentication System
- Sign up / Login / Logout with Supabase Auth
- JWT-based authentication
- User roles: student, instructor, admin
- Protected routes and admin-only access
- Profile management

### 3. Landing Page
- Modern, clean design with Tailwind CSS
- Hero section with compelling CTA
- Features showcase
- Featured courses grid
- Customer testimonials
- Multiple call-to-action sections

### 4. Course System
- **Course catalog** with filtering by category
- **Course detail pages** with full descriptions
- **Lesson management** with order tracking
- **Progress tracking** per lesson and course
- **Enrollment system** linking users to purchased courses

###5. Student Dashboard
- View all enrolled courses
- Track learning progress with visual indicators
- Quick access to continue learning
- Completed courses archive
- Statistics overview

### 6. Interactive Code Editor
- Built-in code editor component
- Support for **Python and SQL**
- **Mock code execution** via Supabase Edge Function
- Real-time output display
- Error handling
- Designed for easy integration with real compute backends

### 7. Cloud Lab Provisioning
- Mock lab provisioning for Snowflake, Databricks, and general environments
- Start/Stop lab functionality
- Session tracking and management
- Connection information display
- Status indicators (starting, running, stopping, stopped)
- Ready for real cloud platform integration

### 8. Shopping Cart & Checkout
- Add courses to cart
- Cart management (view, remove items)
- Order summary with pricing
- Mock checkout process
- Order history tracking
- Automatic enrollment after purchase

### 9. Admin Panel
- Dashboard with key metrics
- **Course management**: Create, edit, delete, publish/unpublish courses
- **Lesson management**: Add and organize lessons
- User management interface
- Orders and enrollment tracking
- Lab session monitoring

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Database**: Supabase PostgreSQL with RLS
- **Build Tool**: Vite
- **Code Execution**: Supabase Edge Functions (mock implementation)

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Main navigation with auth state
│   │   └── Footer.tsx          # Site footer
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Input.tsx           # Form input component
│   │   ├── Card.tsx            # Card container components
│   │   └── Badge.tsx           # Badge/tag component
│   └── CodeEditor.tsx          # Interactive code editor
├── pages/
│   ├── Home.tsx                # Landing page
│   ├── Courses.tsx             # Course catalog
│   ├── CourseDetail.tsx        # Individual course page
│   ├── Dashboard.tsx           # Student dashboard
│   ├── LearnCourse.tsx         # Course learning interface
│   ├── Labs.tsx                # Cloud lab management
│   ├── Cart.tsx                # Shopping cart
│   ├── auth/
│   │   ├── Login.tsx           # Login page
│   │   └── SignUp.tsx          # Registration page
│   └── admin/
│       ├── Admin.tsx           # Admin dashboard
│       ├── CourseManager.tsx   # Course list management
│       └── CourseForm.tsx      # Course create/edit form
├── contexts/
│   └── AuthContext.tsx         # Authentication context
├── lib/
│   ├── supabase.ts             # Supabase client configuration
│   ├── database.types.ts       # TypeScript database types
│   └── seed-data.ts            # Sample data seeding script
└── App.tsx                     # Main app with routing

supabase/
└── functions/
    └── code-execute/
        └── index.ts            # Code execution edge function
```

## Database Schema

### Key Tables
- **profiles**: Extended user information with roles
- **courses**: Course catalog with pricing and categorization
- **lessons**: Individual lessons within courses
- **enrollments**: User course enrollments with progress tracking
- **lesson_progress**: Granular lesson completion tracking
- **cart_items**: Shopping cart management
- **orders** & **order_items**: Purchase history
- **lab_sessions**: Cloud lab provisioning tracking
- **code_submissions**: Code exercise history

All tables include:
- Row Level Security (RLS) policies
- Proper foreign key relationships
- Indexes for performance
- Timestamps for auditing

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase
Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Migration
The database schema has been created via Supabase migration. All tables, RLS policies, and indexes are configured.

### 4. Seed Sample Data (Optional)
To populate the database with sample courses:
```typescript
import { seedDatabase } from './src/lib/seed-data';
// Call seedDatabase() after user authentication
```

### 5. Run Development Server
```bash
npm run dev
```

### 6. Build for Production
```bash
npm run build
```

## Edge Functions

### code-execute
Located in `supabase/functions/code-execute/`

**Purpose**: Mock execution of Python and SQL code

**Endpoint**: `POST /functions/v1/code-execute`

**Request**:
```json
{
  "code": "print('Hello World')",
  "language": "python",
  "lessonId": "optional-lesson-id"
}
```

**Response**:
```json
{
  "output": "Hello World\nCode executed successfully!",
  "status": "success"
}
```

## Features Ready for Extension

### 1. Real Code Execution
The code editor is architected to easily integrate with:
- AWS Lambda
- Google Cloud Functions
- Docker containers
- Jupyter kernels

### 2. Real Cloud Lab Provisioning
The lab module is ready to integrate with:
- Snowflake Partner Connect API
- Databricks Workspace API
- AWS/GCP/Azure provisioning APIs

### 3. Payment Integration
The checkout flow is structured to add:
- Stripe payment processing
- PayPal integration
- Subscription management

### 4. Advanced Features
Extensibility points for:
- Video lessons
- Live coding sessions
- Peer code reviews
- Discussion forums
- Certificates

## Security

- All API routes protected with JWT authentication
- Row Level Security on all database tables
- User data isolated per account
- Admin actions require admin role
- Sensitive operations validated server-side

## Mobile Responsive

- All pages optimized for mobile, tablet, and desktop
- Responsive navigation with mobile menu
- Touch-friendly UI components
- Adaptive layouts

## User Roles

### Student (default)
- Browse and purchase courses
- Track learning progress
- Access cloud labs
- Submit code exercises

### Instructor
- Create and manage own courses
- Add lessons to courses
- View enrollment statistics

### Admin
- Full platform management
- Create/edit/delete any course
- Manage users
- View all orders and sessions
- Platform analytics

## API Routes

All data operations go through Supabase:
- Authentication: Supabase Auth
- Database: PostgreSQL with RLS
- Functions: Supabase Edge Functions

## Notes

- The application uses mock payment processing for demonstration
- Cloud labs are simulated; real provisioning requires platform API integration
- Code execution is mocked; production should use sandboxed environments
- Sample images use Pexels URLs

## Future Enhancements

1. **Real-time features**: WebSocket support for live collaboration
2. **AI assistance**: Code completion and hints
3. **Gamification**: Points, badges, leaderboards
4. **Social features**: User profiles, following, activity feeds
5. **Analytics**: Detailed learning analytics and insights
6. **Mobile apps**: React Native mobile applications
7. **Internationalization**: Multi-language support

## License

This project is a demonstration application for educational purposes.
