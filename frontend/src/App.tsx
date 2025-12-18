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
      {/*header*/}
      <header className="z-top sticky p-4">
        <ModeToggle />
      </header>

      {/*main body*/}
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {/*first section*/}
        <section className="container max-w-lg mx-auto mb-6">
          <div className="text-center">
            <h1 className="text-4xl text-primary font-bold mb-2">
              React + Bun + Go
            </h1>
            <p className="text-muted-foreground text-sm">
              This is just a small full stack project to showcase separate
              frontend and backend
            </p>
          </div>

          {hasActivity && (
            <Button
              onClick={reset}
              className="mt-4 w-full"
              variant="destructive"
            >
              Clear Server Messages
            </Button>
          )}

          <div className="grid grid-cols-2 p-6 rounded-md shadow-lg mb-4">
            <div className="items-center text-center">
              <HealthCheck
                key={resetId}
                onChecked={() => setHasHealthActivity(true)}
              />
            </div>
            <div className="flex flex-col items-center space-y-2">
              {/*<Button
                onClick={() => setCount((count) => count + 1)}
                variant="secondary"
              >
                Count is {count}
              </Button>*/}

              <Button onClick={fetchData} className="max-w-md">
                Fetch From Go Server
              </Button>

              <div className="text-center">
                {" "}
                {message && (
                  <div className="mt-4 p-4 rounded-md">
                    <p className="text-muted-foreground">Go Server Response:</p>
                    <p className="text-primary font-medium">{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/*second section*/}
        <section className="container max-w-lg mx-auto mt-6 rounded-md shadow-lg mb-6">
          <div className="text-center mb-4">
            <h1 className="text-4xl text-primary font-bold mb-2">
              Go + PostgreSQL
            </h1>
            <p className="text-muted-foreground text-sm">
              After you've completed an item, click on it to mark is as
              completed
            </p>
          </div>
          <div>
            <TodoList />
          </div>
        </section>

        {/*footer section*/}
        <footer className="text-center text-muted-foreground text-sm mt-6">
          Built with Vite React, Go, and ShadCN / Tailwind CSS
        </footer>
      </main>
    </ThemeProvider>
  );
}

export default App;
