import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import TopLoader from "./components/top-loader/TopLoader";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-apple antialiased">
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <TopLoader />
          <div className="flex-1">{children}</div>
        </div>
        <TailwindIndicator />
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
