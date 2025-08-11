import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/clerk-webhook",
  "/api/trip/(.*)",
  // "/api/create",
];

const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware(async (auth, request) => {
  //   if (process.env.NODE_ENV === "development") {
  //     return;
  //   }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Match pages but exclude static files and _next internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Match all API routes (including /api/create)
    "/api/:path*",
  ],
};
