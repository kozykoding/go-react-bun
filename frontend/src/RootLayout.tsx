import { Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { NavMenu } from "@/components/ui/NavMenu";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Header - Always visible */}
      <header className="z-top sticky p-4 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <NavMenu />
        <ModeToggle />
      </header>

      {/* Main Body - The 'Outlet' renders the current page (Home, Docs, etc.) */}
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer - Always visible */}
      <footer className="text-center text-muted-foreground text-sm mt-6 pb-6">
        Built with Vite React, Go, and ShadCN / Tailwind CSS
      </footer>
    </ThemeProvider>
  );
}
