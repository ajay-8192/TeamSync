package models

import "time"

type Users struct {
	Id        string `json:"id" gorm:"primaryKey;unique;index"`
	FirstName string `json:"firstName" gorm:"not null;index:idx_name,priority:1"`
	LastName  string `json:"lastName" gorm:"not null;index:idx_name,priority:2"`
	Email     string `json:"email" gorm:"not null;unique;index"`
	Username  string `json:"username" gorm:"not null;unique;index"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type DraftUsers struct {
	FirstName string `json:"firstname" gorm:"not null"`
	LastName  string `json:"lastname" gorm:"not null"`
	Email     string `json:"email" gorm:"not null"`
	Username  string `json:"username" gorm:"not null"`
	VerifyID  string `json:"verifyid" gorm:"not null"`
}
