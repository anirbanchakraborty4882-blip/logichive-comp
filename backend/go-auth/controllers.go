package main

import (
	"encoding/json"
	"net/http"
	"golang.org/x/crypto/bcrypt"
)

// UserModel reflects the columns of your production table schema
type UserModel struct {
	ID           int    `json:"id"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	PasswordHash string `json:"password_hash"`
	CreatedAt    string `json:"created_at"`
	UpdatedAt    string `json:"updated_at"`
}

// CreateUserController hashes the password and inserts a clean record
func (app *App) CreateUserController(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password_hash"` // Accepts the password parameter
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil || input.Username == "" || input.Email == "" || input.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload. username, email, and password_hash are required."})
		return
	}

	// 1. Hash the password securely using bcrypt before storing
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Internal processing failure"})
		return
	}

	// 2. Insert into database (id, created_at, updated_at are handled automatically by MySQL)
	query := "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)"
	result, err := app.DB.Exec(query, input.Username, input.Email, string(hashedBytes))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to save user: " + err.Error()})
		return
	}

	id, _ := result.LastInsertId()

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "success",
		"user_id": id,
		"message": "User added securely with a hashed password",
	})
}

// CheckUserExistsController looks up if an email is already present
func (app *App) CheckUserExistsController(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	if email == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "email parameter is required"})
		return
	}

	var exists bool
	query := "SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)"
	err := app.DB.QueryRow(query, email).Scan(&exists)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"exists": exists})
}

// UpdateUserController changes core details (updated_at resets automatically via MySQL)
func (app *App) UpdateUserController(w http.ResponseWriter, r *http.Request) {
	var input struct {
		ID       int    `json:"id"`
		Username string `json:"username"`
		Email    string `json:"email"`
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil || input.ID == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid payload parameters"})
		return
	}

	query := "UPDATE users SET username = ?, email = ? WHERE id = ?"
	_, err := app.DB.Exec(query, input.Username, input.Email, input.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success", "message": "User attributes modified"})
}

// RemoveUserController deletes a user record by tracking internal ID
func (app *App) RemoveUserController(w http.ResponseWriter, r *http.Request) {
	var input struct {
		ID int `json:"id"`
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil || input.ID == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid validation mapping"})
		return
	}

	query := "DELETE FROM users WHERE id = ?"
	result, err := app.DB.Exec(query, input.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "User target index missing"})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success", "message": "User cleanly scrubbed from storage"})
}
