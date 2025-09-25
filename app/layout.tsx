import { Inter } from "next/font/google";
// radix import above globals
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <QueryClientProvider>
        <AuthProvider>
          <body>
            <Theme accentColor="violet">
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </body>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  );
}
