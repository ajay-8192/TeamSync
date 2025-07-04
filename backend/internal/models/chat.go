package models

import "time"

type Workspace struct {
	ID          string    `json:"id" gorm:"primaryKey;index"`
	Name        string    `json:"name" gorm:"not null;index"`
	Description string    `json:"description" gorm:"not null"`
	CreatedBy   string    `json:"createdBy" gorm:"not null;index"`
	CreatedAt   time.Time `json:"createdAt"`
	ProfilePic  string    `json:"ProfilePic"`

	Members       []WorkspaceMembers `json:"-" gorm:"foreignKey:WorkspaceId;constraint:OnDelete:CASCADE"`
	Conversations []Conversations    `json:"-" gorm:"foreignKey:WorkspaceId;constraint:OnDelete:CASCADE"`
	MembersCount  int                `json:"membersCount" gorm:"-"`
}

type WorkspaceMembers struct {
	WorkspaceId   string    `json:"workspaceId" gorm:"not null;index;primaryKey"`
	UserId        string    `json:"userId" gorm:"not null;index;primaryKey"`
	Role          string    `json:"role"`
	JoinedAt      time.Time `json:"joinedAt"`
	LastVisitedAt time.Time `json:"lastVisitedAt"`

	Workspace Workspace `json:"-" gorm:"foreignKey:WorkspaceId;references:ID;constraint:OnDelete:CASCADE"`
}

type Conversations struct {
	ID          string    `json:"id" gorm:"primaryKey;index"`
	WorkspaceId string    `json:"workspaceId" gorm:"not null;index"`
	Name        string    `json:"name" gorm:"index"`
	Type        string    `json:"type" gorm:"not null;index"`
	IsPrivate   bool      `json:"isPrivate"`
	CreatedBy   string    `json:"createdBy" gorm:"not null;index"`
	CreatedAt   time.Time `json:"createdAt"`

	Workspace Workspace             `json:"-" gorm:"foreignKey:WorkspaceId;references:ID;constraint:OnDelete:CASCADE"`
	Members   []ConversationMembers `json:"members" gorm:"foreignKey:ConversationId;constraint:OnDelete:CASCADE"`
	Messages  []Messages            `json:"messages" gorm:"foreignKey:ConversationId;constraint:OnDelete:CASCADE"`
}

type ConversationMembers struct {
	ConversationId string    `json:"conversationId" gorm:"not null;index;primaryKey"`
	UserId         string    `json:"userId" gorm:"not null;index;primaryKey"`
	Role           string    `json:"role"`
	JoinedAt       time.Time `json:"joinedAt"`
	LastVisitedAt  time.Time `json:"lastVisitedAt"`

	LastReadAt 		time.Time `json:"lastReadAt"`

	Conversation Conversations `json:"-" gorm:"foreignKey:ConversationId;references:ID;constraint:OnDelete:CASCADE"`
}

type Messages struct {
	ID             string    `json:"id" gorm:"primaryKey;index"`
	ConversationId string    `json:"conversationId" gorm:"not null;index"`
	SenderId       string    `json:"senderId" gorm:"not null;index"`
	Content        string    `json:"content" gorm:"not null;type:text"`
	CreatedAt      time.Time `json:"createdAt"`

	Conversation Conversations `json:"-" gorm:"foreignKey:ConversationId;references:ID;constraint:OnDelete:CASCADE"`
}
