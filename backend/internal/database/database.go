package database

import (
	"fmt"
	"log"
	"team-sync/internal/config"
	"team-sync/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDatabase() *gorm.DB {
	cfg := config.LoadDBConfig()

	log.Println(cfg)

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		cfg.DB_HOST, cfg.DB_USER, cfg.DB_PASSWORD, cfg.DB_NAME, cfg.DB_PORT, cfg.DB_SSLMODE)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	if err := db.AutoMigrate(
		&models.Users{},
		&models.DraftUsers{},
		&models.Workspace{},
		&models.WorkspaceMembers{},
		&models.Conversations{},
		&models.ConversationMembers{},
		&models.Messages{},
	); err != nil {
		log.Fatalf("Failed to migrate: %v", err)
	}

	return db
}
