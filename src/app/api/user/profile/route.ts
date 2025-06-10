import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_LINK || "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get user profile from backend
    const response = await axios.get(`${BACKEND_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Return user profile data
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    
    // Handle different error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return NextResponse.json(
        { error: error.response.data.message || 'Failed to fetch user profile' },
        { status: error.response.status }
      );
    } else if (error.request) {
      // The request was made but no response was received
      return NextResponse.json(
        { error: 'No response from server' },
        { status: 503 }
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      return NextResponse.json(
        { error: 'Error setting up request' },
        { status: 500 }
      );
    }
  }
}