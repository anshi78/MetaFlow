import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from 'next/font/google';
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from '@clerk/nextjs';
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "MetaFlow",
  description: "The app where you can build AI agents by simply describing their behavior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      {/* Added suppressHydrationWarning to ignore extension-injected attributes */}
      <html lang="en" suppressHydrationWarning>
        <body className={outfit.className}>
          <ConvexClientProvider>
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </ConvexClientProvider> 
        </body>
      </html>
    </ClerkProvider>
  );
}