import { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request) {
  // Ensure the request is a NextRequest instance
  if (!(request instanceof NextRequest)) {
    throw new Error('Middleware must be used with NextRequest');
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};