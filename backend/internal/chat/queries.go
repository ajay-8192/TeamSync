package chat

import (
	"team-sync/internal/models"

	"gorm.io/gorm"
)

type ChatQuery struct {
	db *gorm.DB
}

func NewChatQuery(db *gorm.DB) *ChatQuery {
	return &ChatQuery{db: db}
}

func (q *ChatQuery) getAllOrgs(userId string) ([]*models.Workspace, error) {
	type OrgWithCount struct {
		models.Workspace
		MembersCount int `json:"membersCount"`
	}

	var orgsWithCounts []OrgWithCount
	err := q.db.Table("workspaces").
		Select("workspaces.*, COUNT(workspace_members.user_id) as members_count").
		Joins("JOIN workspace_members ON workspace_members.workspace_id = workspaces.id").
		Where("workspace_members.user_id = ?", userId).
		Group("workspaces.id").
		Scan(&orgsWithCounts).Error
	if err != nil {
		return nil, err
	}

	// Convert to []*models.Workspace and set MembersCount
	var workspaces []*models.Workspace
	for _, org := range orgsWithCounts {
		ws := org.Workspace
		ws.MembersCount = org.MembersCount
		workspaces = append(workspaces, &ws)
	}

	return workspaces, nil
}

func (q *ChatQuery) updateOrgLastVisited(userId, orgId string) error {
	return q.db.Table("workspace_members").
		Where("user_id = ? AND workspace_id = ?", userId, orgId).
		Update("last_visited_at", gorm.Expr("NOW()")).Error
}

func (q *ChatQuery) getConversationsByOrganisationId(userId, orgId string) ([]*models.Conversations, error) {
	var conversations []*models.Conversations

	err := q.db.Table("conversations").
		Joins("JOIN conversation_members ON conversation_members.conversation_id = conversations.id").
		Where("conversation_members.user_id = ? AND conversations.workspace_id = ?", userId, orgId).
		Find(&conversations).Error

	if err != nil {
		return nil, err
	}

	return conversations, nil
}
