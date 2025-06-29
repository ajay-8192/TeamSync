package users

import (
	"context"
	"errors"
	"fmt"
	"log"
	"team-sync/internal/utils"
	"time"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

type UserLogicManager struct {
	redisClient *redis.Client
	query       *UserQuery
}

func NewUserLogicManager(query *UserQuery, redisClient *redis.Client) *UserLogicManager {
	return &UserLogicManager{redisClient: redisClient, query: query}
}

func (l *UserLogicManager) RegisterUser(email, firstName, lastName, username string) error {
	_, err := l.query.getUserByEmailOrUsername(email, username)
	if err == nil {
		return fmt.Errorf("user already exists with username or email")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	draftUser, err := l.query.getDraftUserByEmailOrUsername(email, username)
	if err == nil {
		link := fmt.Sprintf("%s/verify-account?email=%s&verifyId=%s",
			utils.GetEnvOrDefaultValue("UI_HOST", "localhost:3000"), draftUser.Email, draftUser.VerifyID)

		log.Println("Link for verifying account for "+firstName+" "+lastName, ": "+link)
		return nil
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	verifyID := uuid.NewString()

	if err := l.query.createDraftUser(email, username, firstName, lastName, verifyID); err != nil {
		return err
	}

	link := fmt.Sprintf("%s/verify-account?email=%s&verifyId=%s",
		utils.GetEnvOrDefaultValue("UI_HOST", "localhost:3000"), email, verifyID)

	log.Println("Link for verifying account for "+firstName+" "+lastName, ": "+link)
	return nil
}

func (l *UserLogicManager) VerifyAccount(email, verifyId string) error {
	draftUser, err := l.query.getDraftUserByEmailOrUsername(email, "")
	if err != nil {
		return err
	}

	if draftUser.VerifyID != verifyId {
		return fmt.Errorf("invalid verify id")
	}

	_, err = l.query.createUser(draftUser)
	if err != nil {
		return err
	}

	if err := l.query.deleteDraftUser(draftUser); err != nil {
		return err
	}

	return nil
}

func (l *UserLogicManager) LoginUser(email string) error {
	_, err := l.query.getUserByEmailOrUsername(email, "")
	if err != nil {
		return err
	}

	otp := utils.GenerateOTP()
	key := fmt.Sprintf("otp-%s", email)
	l.redisClient.Set(context.Background(), key, otp, time.Minute*5)
	log.Println("OTP: ", otp)
	return nil
}

func (l *UserLogicManager) VerifyOTP(email, otp string) (string, error) {
	u, err := l.query.getUserByEmailOrUsername(email, "")
	if err != nil {
		return "", err
	}

	key := fmt.Sprintf("otp-%s", email)
	otpFromRedis, err := l.redisClient.Get(context.Background(), key).Result()
	if err != nil {
		return "", err
	}

	if otpFromRedis != otp {
		return "", fmt.Errorf("invalid otp")
	}

	l.redisClient.Del(context.Background(), key)
	token, err := utils.GenerateToken(u)
	if err != nil {
		return "", err
	}

	return token, nil
}
