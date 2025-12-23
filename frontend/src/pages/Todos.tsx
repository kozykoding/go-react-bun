import { TodoList } from "@/components/TodoList";

export default function TodosPage() {
  return (
    <div className="container max-w-lg mx-auto mt-6 rounded-md shadow-lg mb-6">
      <div className="text-center mb-4">
        <h1 className="text-4xl text-primary font-bold mb-2">
          Go + PostgreSQL
        </h1>
        <p className="text-muted-foreground text-sm">
          After you've completed an item, click on it to mark is as completed
        </p>
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
}
