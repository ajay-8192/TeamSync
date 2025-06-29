package chat

import (
	"team-sync/internal/models"
	"time"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
)

type ChatLogicManager struct {
	redisClient *redis.Client
	query       *ChatQuery
}

func NewChatLogicManager(query *ChatQuery, redisClient *redis.Client) *ChatLogicManager {
	return &ChatLogicManager{redisClient: redisClient, query: query}
}

func (l *ChatLogicManager) getOrganisations(userId string) ([]*models.Workspace, error) {
	return l.query.getAllOrgs(userId)
}

func (l *ChatLogicManager) createOrganisation(userId, name, description string) (*models.Workspace, error) {
	id := uuid.NewString()
	workspace := &models.Workspace{
		Name:        name,
		Description: description,
		ID:          id,
		CreatedBy:   userId,
		CreatedAt:   time.Now(),
	}

	workspaceMember := &models.WorkspaceMembers{
		WorkspaceId: id,
		UserId:      userId,
		Role:        "ADMIN",
		JoinedAt:    time.Now(),
		LastVisitedAt: time.Now(),
	}

	tx := l.query.db.Begin()
	if err := tx.Create(workspace).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Create(workspaceMember).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	return workspace, nil
}

func (l *ChatLogicManager) getConversationsByOrganisationId(userId, orgId string) ([]*models.Conversations, error) {

	// update last visited for org
	if err := l.query.updateOrgLastVisited(userId, orgId); err != nil {
		return  nil, err
	}

	// get conversations for select org
	return l.query.getConversationsByOrganisationId(userId, orgId);
}

func (l *ChatLogicManager) createConversation(userId, orgId string) (*models.Conversations, error) {
	return  nil, nil
}
