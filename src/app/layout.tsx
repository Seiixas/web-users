"use client";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionProvider from "@/contexts/sessions.provider";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main className="flex flex-col h-screen w-screen bg-background text-foreground">
          <section className="h-full overflow-y-auto bg-background">
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
