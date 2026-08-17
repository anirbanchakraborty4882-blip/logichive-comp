package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	_ "github.com/go-sql-driver/mysql"
)

// App container manages core application dependencies across our architecture
type App struct {
	DB *sql.DB
}

func main() {
	// 1. Configure the MySQL Database Source Name (DSN)
	// Using empty password string for local root configuration
	dsn := "root:@tcp(127.0.0.1:3306)/auth_db"

	// 2. Open connection to database pool
	var err error
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Critical Error opening database structure: %v", err)
	}
	defer db.Close()

	// 3. Verify server ping status before routing traffic
	if err := db.Ping(); err != nil {
		log.Fatalf("Critical Error connecting to MySQL server instance: %v", err)
	}
	fmt.Println("Successfully connected to MySQL database engine!")

	// 4. Initialize application dependencies struct block
	app := &App{DB: db}

	// 5. Build and capture the API endpoint tree from the routing layer
	router := app.RegisterRoutes()

	// 6. Establish listener port socket and boot the production runner
	fmt.Println("API Gateway active on port 8080... Access at http://localhost:8080")
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatalf("Critical Server execution failure: %v", err)
	}
}
