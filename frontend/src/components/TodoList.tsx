import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Item, ItemGroup } from "@/components/ui/item";

const API_BASE = import.meta.env.VITE_API_URL;

type Todo = {
  id: number;
  text: string;
  done: boolean;
  created_at: string;
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/todos`);
      if (!res.ok) {
        console.error("Failed to load todos", await res.text());
        return;
      }
      const data: Todo[] = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading todos", err);
    }
  };

  useEffect(() => {
    void loadTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        console.error("Failed to create todo", await res.text());
        return;
      }
      const created: Todo = await res.json();
      setTodos((prev) => [created, ...(prev ?? [])]);
      setText("");
    } catch (err) {
      console.error("Error creating todo", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/todos/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        console.error("Failed to toggle todo", await res.text());
        return;
      }
      const updated: Todo = await res.json();
      setTodos((prev) => (prev ?? []).map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error("Error toggling todo", err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/todos/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok && res.status !== 204) {
        console.error("Failed to delete todo", await res.text());
        return;
      }
      setTodos((prev) => (prev ?? []).filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  const safeTodos = todos ?? [];

  return (
    <div className="space-y-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <InputGroup>
          <InputGroupInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo...such as 'Hire Sammy'"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="ghost" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>

      <ul className="space-y-2">
        <ItemGroup className="gap-4">
          {safeTodos.map((todo) => (
            <Item key={todo.id} className="p-2 shadow-lg">
              <button
                type="button"
                onClick={() => toggleTodo(todo.id)}
                className={`text-left text-primary flex-1 ${
                  todo.done ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </button>
              <Button
                variant="ghost"
                className="hover:bg-destructive"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </Button>
            </Item>
          ))}
          {safeTodos.length === 0 && (
            <li className="text-sm text-muted-foreground">No todos yet.</li>
          )}
        </ItemGroup>
      </ul>
    </div>
  );
}
