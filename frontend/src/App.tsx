import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>("");

  // Prefer a full API URL via Vite env, fall back to localhost:4200 (Docker/default dev API port)
  const apiUrl =
    import.meta.env.VITE_API_URL || `http://localhost:4200`;

  const fetchData = () => {
    fetch(`${apiUrl}/`)
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="z-top sticky p-4">
        <ModeToggle />
      </header>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Vite + React + Bun + Go</h1>
            <p className="text-primary">
              Get started by editing{" "}
              <code className="text-sm p-1 rounded">src/App.tsx</code>
            </p>
          </div>

          <div className="p-6 rounded-lg shadow-lg">
            <div className="text-center space-y-4">
              <Button
                onClick={() => setCount((count) => count + 1)}
                className="bg-primary p-2"
              >
                Count is {count}
              </Button>

              <Button
                onClick={fetchData}
                className="w-full p-4"
                variant="outline"
              >
                Fetch from Server
              </Button>

              {message && (
                <div className="mt-4 p-4 rounded-md">
                  <p className="text-muted-foreground">Go Server Response:</p>
                  <p className="text-primary font-medium">{message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            Built with Vite, React, Go, and ShadCN / Tailwind CSS
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

