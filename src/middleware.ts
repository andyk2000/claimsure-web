import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define role-based route patterns
const adminRoutes = /^\/admin(\/.*)?$/;
const medicalAdvisorRoutes = /^\/medical-advisor(\/.*)?$/;
const euRoutes = /^\/eu(\/.*)?$/;

// Public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes and API routes
  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  // If no token, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Get user role from cookies
  const userRole = request.cookies.get('userRole')?.value;
  
  // Handle role-based access
  if (adminRoutes.test(pathname) && userRole !== 'admin') {
    // Redirect non-admin users trying to access admin routes
    const dashboardUrl = getDashboardUrlForRole(userRole || '');
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }
  
  if (medicalAdvisorRoutes.test(pathname) && userRole !== 'medical-advisor') {
    // Redirect non-medical-advisor users trying to access medical-advisor routes
    const dashboardUrl = getDashboardUrlForRole(userRole || '');
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }
  
  if (euRoutes.test(pathname) && !['doctor', 'healthcare-provider', 'end-user'].includes(userRole || '')) {
    // Redirect users without appropriate roles trying to access EU routes
    const dashboardUrl = getDashboardUrlForRole(userRole || '');
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  return NextResponse.next();
}

// Helper function to get dashboard URL based on role
function getDashboardUrlForRole(role: string): string {
  switch (role.toLowerCase()) {
    case 'admin':
      return '/admin/dashboard';
    case 'medical-advisor':
      return '/medical-advisor/dashboard';
    case 'doctor':
    case 'healthcare-provider':
    case 'end-user':
      return '/eu/dashboard';
    default:
      return '/login';
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};