import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Only run auth middleware on admin and login routes — public pages skip it entirely
  matcher: ["/admin/:path*", "/login"],
};
