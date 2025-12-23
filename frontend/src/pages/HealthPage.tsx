import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HealthCheck } from "@/components/HealthCheck";

export default function HealthPage() {
  // Move local state here
  const [hasHealthActivity, setHasHealthActivity] = useState(false);
  const [resetId, setResetId] = useState(0);
  const [message, setMessage] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = () => {
    fetch(`${apiUrl}/`)
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const reset = () => {
    setMessage("");
    setHasHealthActivity(false);
    setResetId((id) => id + 1);
  };

  return (
    <div className="container max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl text-primary font-bold mb-2">System Health</h1>
        <p className="text-primary/80">Check the Go backend status</p>
      </div>

      <div className="grid grid-cols-2 p-6 rounded-md shadow-lg mb-4 border">
        <div className="items-center text-center">
          <HealthCheck
            key={resetId}
            onChecked={() => setHasHealthActivity(true)}
          />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Button onClick={fetchData} className="max-w-md">
            Fetch Status
          </Button>

          <div className="text-center">
            {message && (
              <div className="mt-4 p-4 rounded-md bg-muted">
                <p className="text-muted-foreground text-xs">Response:</p>
                <p className="text-primary font-medium">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {(hasHealthActivity || message) && (
        <Button onClick={reset} className="w-full" variant="destructive">
          Reset Status
        </Button>
      )}
    </div>
  );
}
