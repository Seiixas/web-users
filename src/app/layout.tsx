"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/contexts/sessions.provider";

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main className="flex flex-col h-screen w-screen">
          <section className="h-full overflow-y-auto">
            <QueryClientProvider client={queryClient}>
              <SessionProvider>{children}</SessionProvider>
              <Toaster />
            </QueryClientProvider>
          </section>
        </main>
      </body>
    </html>
  );
}
