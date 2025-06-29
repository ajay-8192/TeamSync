package main

import (
	"log"
	"net/http"
	"team-sync/internal/chat"
	"team-sync/internal/database"
	"team-sync/internal/users"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load config
	godotenv.Load()

	// Connect to database
	db := database.InitDatabase()

	// Connect to redis
	redisClient := database.InitRedis()

	// query
	userQuery := users.NewUserQuery(db)
	chatQuery := chat.NewChatQuery(db)

	// logic Managers
	userLogicManager := users.NewUserLogicManager(userQuery, redisClient)
	chatLogicManager := chat.NewChatLogicManager(chatQuery, redisClient)

	// Handlers
	userHandler := users.NewUserHandler(userLogicManager)
	chathandler := chat.NewChatHandler(chatLogicManager)

	// Initialize routes
	router := gin.Default()

	var ALLOWED_HOSTS []string = []string{"http://localhost:4173", "http://localhost:5173", "http://localhost:3000"}
	corsConfig := cors.New(cors.Config{
		AllowOrigins:     ALLOWED_HOSTS,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "Token"},
		ExposeHeaders:    []string{"Origin", "Token", "Authorization"},
		AllowCredentials: true,
	})
	router.Use(corsConfig)

	// Routes
	router.GET("/health-check", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "success"})
	})

	routeGroup := router.Group("/api")
	{
		routeGroup.POST("/register", userHandler.RegisterUser)
		routeGroup.POST("/verify-account", userHandler.VerifyAccount)
		routeGroup.POST("/login", userHandler.LoginUser)
		routeGroup.POST("/verify-otp", userHandler.VerifyOTP)

		protectedRoutes := routeGroup.Group("/v1", userHandler.UserMiddleware(redisClient))
		{
			userRoutes := protectedRoutes.Group("/user")
			{
				userRoutes.GET("/me", userHandler.GetProfileDetails)
				userRoutes.GET("/search", userHandler.SearchUser)
			}

			orgRoutes := protectedRoutes.Group("/org")
			{
				orgRoutes.GET("", chathandler.GetOrganisations)
				orgRoutes.POST("/create", chathandler.CreateOrganisation)
			}

			chatRoutes := protectedRoutes.Group("/:orgId")
			{
				chatRoutes.GET("", chathandler.GetConversationsByOrgId)
				chatRoutes.POST("/create",)
			}
		}
	}

	// Start App
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Unable to start application: %v", err)
	}
}
