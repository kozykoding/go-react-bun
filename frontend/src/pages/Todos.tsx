import { TodoList } from "@/components/TodoList";

export default function TodosPage() {
  return (
    <div className="container max-w-xl mx-auto mt-6 mb-6">
      <div className="text-center mb-4">
        <h1 className="text-4xl text-primary font-bold mb-2">Go + Postgres</h1>
        <p className="text-muted-foreground text-sm">
          Click an item after you've completed it to mark is as completed
        </p>
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
}
