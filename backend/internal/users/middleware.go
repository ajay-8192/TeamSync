package users

import (
	"encoding/json"
	"net/http"
	"team-sync/internal/models"
	"team-sync/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func (h *UserHandler) UserMiddleware(redisClient *redis.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token, err := ctx.Cookie("token")
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			ctx.Abort()
			return
		}

		userBytes, err := utils.ValidateToken(token)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			ctx.Abort()
			return
		}

		var userData models.Users
		if err := json.Unmarshal(userBytes, &userData); err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user data"})
			ctx.Abort()
			return
		}

		ctx.Set("user", &userData)
		ctx.Next()
	}
}