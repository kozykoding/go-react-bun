import { useState } from "react";
import { Button } from "./ui/button";

const API_BASE = import.meta.env.VITE_API_URL;

type HealthCheckProps = {
  onChecked?: () => void;
};

export function HealthCheck({ onChecked }: HealthCheckProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/health`);
      const data = await res.json();
      setStatus(data.status);
      onChecked?.();
    } catch (error) {
      console.error("Health check failed:", error);
      setStatus("error");
      onChecked?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={checkHealth} variant="secondary" disabled={loading}>
        {loading ? "Checking Go Server..." : "Check Go API Status"}
      </Button>
      <div className="p-2">
        {status && (
          <div>
            <p className="text-muted-foreground">Status:</p>
            <p className="text-primary">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
