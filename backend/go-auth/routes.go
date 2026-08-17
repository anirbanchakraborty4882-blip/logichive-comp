package main

import "net/http"

// enableCORS wraps handlers to allow frontend connections across different origins
func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Allow your frontend to read this data (* allows any origin during local testing)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight browser requests automatically 
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func (app *App) RegisterRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	// Wrap every handler method inside the enableCORS middleware helper
	mux.HandleFunc("/addUser", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		app.CreateUserController(w, r)
	}))

	mux.HandleFunc("/checkIfUserExists", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		app.CheckUserExistsController(w, r)
	}))

	mux.HandleFunc("/updateUser", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut && r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		app.UpdateUserController(w, r)
	}))

	mux.HandleFunc("/removeUser", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodDelete && r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		app.RemoveUserController(w, r)
	}))

	return mux
}
