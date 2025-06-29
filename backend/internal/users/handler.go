package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	logicManager *UserLogicManager
}

func NewUserHandler(logicManager *UserLogicManager) *UserHandler {
	return &UserHandler{logicManager: logicManager}
}

type RegisterUserPayload struct {
	FirstName string `json:"firstname" binding:"required,min=1"`
	LastName  string `json:"lastname"`
	Email     string `json:"email" binding:"required,email"`
	Username  string `json:"username" binding:"required,min=5"`
}

func (h *UserHandler) RegisterUser(ctx *gin.Context) {
	var requestBody RegisterUserPayload
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := h.logicManager.RegisterUser(requestBody.Email, requestBody.FirstName, requestBody.LastName, requestBody.Username); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Verification link sent to " + requestBody.Email})
}

type VerifyAccountPayload struct {
	Email    string `json:"email" binding:"required,email"`
	VerifyId string `json:"verifyId" binding:"required"`
}

func (h *UserHandler) VerifyAccount(ctx *gin.Context) {
	var requestBody VerifyAccountPayload
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	if err := h.logicManager.VerifyAccount(requestBody.Email, requestBody.VerifyId); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"message": "User Account Verified"})
}

type LoginUserPayload struct {
	Email string `json:"email" binding:"email"`
}

func (h *UserHandler) LoginUser(ctx *gin.Context) {
	var requestBody LoginUserPayload
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	if err := h.logicManager.LoginUser(requestBody.Email); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"message": "OTP sent to email: " + requestBody.Email})
}

type VerifyOTPPayload struct {
	Email string `json:"email" binding:"email"`
	OTP   string `json:"otp" binding:"required"`
}

func (h *UserHandler) VerifyOTP(ctx *gin.Context) {
	var requestBody VerifyOTPPayload
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, err := h.logicManager.VerifyOTP(requestBody.Email, requestBody.OTP)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.SetCookie("token", token, 60*60*24*7, "/", "", false, true)

	ctx.JSON(200, gin.H{"message": "Login Successfully"})
}

func (h *UserHandler) GetProfileDetails(ctx *gin.Context) {
	u, ok := ctx.Get("user")
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	ctx.JSON(200, gin.H{"message": "Get User", "user": u})
}

type SearchUserPayload struct{}

func (h *UserHandler) SearchUser(ctx *gin.Context) {
	var requestBody SearchUserPayload
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User search successful"})
}
