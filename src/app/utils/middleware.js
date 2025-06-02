import { NextRequest } from 'next/server';
import { updateSession } from './supabase/middleware';

export async function middleware(request) {
  // Ensure the request is a NextRequest instance
  if (!(request instanceof NextRequest)) {
    throw new Error('Middleware must be used with NextRequest');
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/admin/*)',
  ],
};