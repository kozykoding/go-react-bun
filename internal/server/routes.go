package server

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"
)

func (s *Server) RegisterRoutes() http.Handler {
	mux := http.NewServeMux()

	// Register routes
	mux.HandleFunc("/", s.HelloWorldHandler)
	mux.HandleFunc("/api/health", s.HealthCheckHandler)
	mux.HandleFunc("/health", s.healthHandler)
	mux.HandleFunc("/api/todos", s.todosHandler)      // GET, POST
	mux.HandleFunc("/api/todos/toggle", s.toggleTodo) // POST
	mux.HandleFunc("/api/todos/delete", s.deleteTodo) // POST

	// Wrap the mux with CORS middleware
	return s.corsMiddleware(mux)
}

type todoPayload struct {
	Text string `json:"text"`
}

type togglePayload struct {
	ID int64 `json:"id"`
}

func (s *Server) corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 1. Get the origin from the environment variable
		// 2. Provide a fallback for local development
		allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
		if allowedOrigin == "" {
			allowedOrigin = "http://localhost:5173"
		}

		// Set CORS headers using the dynamic origin
		w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, X-CSRF-Token")
		w.Header().Set("Access-Control-Allow-Credentials", "false") // Set to "true" if credentials are required

		// Handle preflight OPTIONS requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		// Proceed with the next handler
		next.ServeHTTP(w, r)
	})
}

func (s *Server) HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	resp := map[string]string{"Message": "Fetched From The Server!"}
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	if _, err := w.Write(jsonResp); err != nil {
		log.Printf("Failed to write response: %v", err)
	}
}

func (s *Server) HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	now := time.Now().UTC().Format(time.RFC3339)

	payload := map[string]any{
		"status": "Fine & Dandy!",
		"time":   now,
	}

	if err := json.NewEncoder(w).Encode(payload); err != nil {
		log.Printf("failed to encode health check: %v", err)
	}
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	resp, err := json.Marshal(s.db.Health())
	if err != nil {
		http.Error(w, "Failed to marshal health check response", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	if _, err := w.Write(resp); err != nil {
		log.Printf("Failed to write response: %v", err)
	}
}

func (s *Server) todosHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {
	case http.MethodGet:
		todos, err := s.db.ListTodos(r.Context())
		if err != nil {
			log.Printf("list todos error: %v", err)
			http.Error(w, "failed to list todos", http.StatusInternalServerError)
			return
		}
		if err := json.NewEncoder(w).Encode(todos); err != nil {
			log.Printf("encode todos error: %v", err)
			http.Error(w, "failed to encode todos", http.StatusInternalServerError)
		}

	case http.MethodPost:
		var payload todoPayload
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			log.Printf("decode todo payload error: %v", err)
			http.Error(w, "invalid payload", http.StatusBadRequest)
			return
		}
		if payload.Text == "" {
			http.Error(w, "text is required", http.StatusBadRequest)
			return
		}

		todo, err := s.db.CreateTodo(r.Context(), payload.Text)
		if err != nil {
			log.Printf("create todo error: %v", err)
			http.Error(w, "failed to create todo", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(todo); err != nil {
			log.Printf("encode todo error: %v", err)
			http.Error(w, "failed to encode todo", http.StatusInternalServerError)
		}

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func (s *Server) toggleTodo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	var payload togglePayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		log.Printf("decode toggle payload error: %v", err)
		http.Error(w, "invalid payload", http.StatusBadRequest)
		return
	}

	todo, err := s.db.ToggleTodo(r.Context(), payload.ID)
	if err != nil {
		log.Printf("toggle todo error: %v", err)
		http.Error(w, "failed to toggle todo", http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(todo); err != nil {
		log.Printf("encode toggled todo error: %v", err)
		http.Error(w, "failed to encode todo", http.StatusInternalServerError)
	}
}

func (s *Server) deleteTodo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost && r.Method != http.MethodDelete {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var payload togglePayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		log.Printf("decode delete payload error: %v", err)
		http.Error(w, "invalid payload", http.StatusBadRequest)
		return
	}

	if err := s.db.DeleteTodo(r.Context(), payload.ID); err != nil {
		log.Printf("delete todo error: %v", err)
		http.Error(w, "failed to delete todo", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
