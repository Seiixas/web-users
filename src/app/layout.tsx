"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider } from "@/contexts/sessions.provider";
import { useSession } from "@/hooks/use-sessions";
import { useToast } from "@/hooks/use-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { clearSession } = useSession();
  const { toast } = useToast();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        if (error.statusCode === 401) {
          toast({
            title: "Sua sessão expirou, por favor faça login novamente.",
            variant: "destructive",
          });
          setTimeout(() => {
            clearSession();
          }, 10);
        }
      },
    }),
    mutationCache: new MutationCache({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        if (error.statusCode === 401) {
          toast({
            title: "Sua sessão expirou, por favor faça login novamente.",
            variant: "destructive",
          });
          setTimeout(() => {
            clearSession();
          }, 10);
        }
      },
    }),
  });

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
