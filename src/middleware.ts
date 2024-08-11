import { NextResponse, NextRequest } from "next/server";

const getProfileData = async ({ authToken }: { authToken: any }) => {
  const response = await fetch("http://localhost:3000/auth/profile", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await response.json();

  return {
    isValid: data?.success,
    data,
  };
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("access_token")?.value;

  try {
    const isAuthSuccessful = await getProfileData({ authToken });

    if (
      isAuthSuccessful.isValid &&
      (pathname.startsWith("/account") || pathname === "/")
    ) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    if (
      !isAuthSuccessful.isValid &&
      (pathname.startsWith("/home") || pathname === "/")
    ) {
      return NextResponse.redirect(new URL("/account/login", req.url));
    }
  } catch (error) {
    console.error(
      "Error while checking authentication or fetching profile data:",
      error
    );
  }
}

export const middlewareConfig = {
  matcher: ["/account/:path*", "/home/:path*"],
};
