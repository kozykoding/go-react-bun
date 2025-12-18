import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { HealthCheck } from "./components/HealthCheck";
import { TodoList } from "./components/TodoList";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [resetId, setResetId] = useState(0);
  const [hasHealthActivity, setHasHealthActivity] = useState(false);

  // Prefer a full API URL via Vite env, fall back to localhost:4200 (Docker/default dev API port)
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = () => {
    fetch(`${apiUrl}/`)
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const reset = () => {
    setCount(0);
    setMessage("");
    setHasHealthActivity(false);
    setResetId((id) => id + 1);
  };

  const hasActivity = count > 0 || message !== "" || hasHealthActivity;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="z-top sticky p-4">
        <ModeToggle />
      </header>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-lg mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">React + Bun + Go</h1>
          </div>

          <div className="p-6 rounded-lg shadow-lg">
            <div className="text-center space-y-4">
              <Button
                onClick={() => setCount((count) => count + 1)}
                variant="secondary"
              >
                Count is {count}
              </Button>

              <Button
                onClick={fetchData}
                className="w-full p-4"
                variant="outline"
              >
                Fetch From Go Server
              </Button>

              {message && (
                <div className="mt-4 p-4 rounded-md">
                  <p className="text-muted-foreground">Go Server Response:</p>
                  <p className="text-primary font-medium">{message}</p>
                </div>
              )}
            </div>
            <div className="p-4 items-center text-center">
              <HealthCheck
                key={resetId}
                onChecked={() => setHasHealthActivity(true)}
              />
            </div>

            {hasActivity && (
              <Button onClick={reset} className="w-full" variant="destructive">
                Reset All
              </Button>
            )}
          </div>
          <div className="mt-6">
            <TodoList />
          </div>

          <div className="text-center text-muted-foreground text-sm mt-4">
            Built with Vite React, Go, and ShadCN / Tailwind CSS
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
