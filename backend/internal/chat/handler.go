package chat

import (
	"net/http"
	"team-sync/internal/models"

	"github.com/gin-gonic/gin"
)

type ChatHandler struct {
	logicManager *ChatLogicManager
}

func NewChatHandler(logicManager *ChatLogicManager) *ChatHandler {
	return &ChatHandler{logicManager: logicManager}
}

/**
 ** ********************** **
 ** Organization Handlers  **
 ** ********************** **
 */

// Fetch user involved organisations
func (h *ChatHandler) GetOrganisations(ctx *gin.Context) {
	u, ok := ctx.Get("user")
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userId := u.(*models.Users).Id

	orgs, err := h.logicManager.getOrganisations(userId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Fetched all Orgs", "orgs": orgs})
}


type CreateOrganisationPayload struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
}

// Create organisation
func (h *ChatHandler) CreateOrganisation(ctx *gin.Context) {

	var requestBody CreateOrganisationPayload
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u, ok := ctx.Get("user")
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userId := u.(*models.Users).Id

	org, err := h.logicManager.createOrganisation(userId, requestBody.Name, requestBody.Description)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Created New Org", "org": org})
}


/**
 ** ************** **
 ** Chat Handlers  **
 ** ************** **
 */

// Fetch conversation by organisation Id (global/private)
func (h *ChatHandler) GetConversationsByOrgId(ctx *gin.Context) {

	orgId := ctx.Param("orgId")
	u, ok := ctx.Get("user")
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userId := u.(*models.Users).Id

	chats, err := h.logicManager.getConversationsByOrganisationId(userId, orgId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	
	ctx.JSON(http.StatusOK, gin.H{"message": "Get Chat by Org", "channels": chats})
}

func (h *ChatHandler) CreateConversation(ctx *gin.Context) {
	orgId := ctx.Param("orgId")
	u, ok := ctx.Get("user")
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userId := u.(*models.Users).Id

	chat, err := h.logicManager.createConversation(userId, orgId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "created Chat", "chat": chat})
}
