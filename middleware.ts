import { authMiddleware, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// export default authMiddleware({
//   publicRoutes: ["/", "/api/:path*",'/api/test'],
//   ignoredRoutes: ["/api/:path*"],
//   afterAuth: (auth, req) => auth.isPublicRoute ? NextResponse.next() : undefined
// });
export default clerkMiddleware({})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
