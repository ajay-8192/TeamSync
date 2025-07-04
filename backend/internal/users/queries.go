package users

import (
	"team-sync/internal/models"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserQuery struct {
	db *gorm.DB
}

func NewUserQuery(db *gorm.DB) *UserQuery {
	return &UserQuery{db: db}
}

func (q *UserQuery) getUserByEmailOrUsername(email, username string) (*models.Users, error) {
	var user *models.Users
	if err := q.db.Model(&models.Users{}).Where("email = ? or username = ?", email, username).First(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (q *UserQuery) getDraftUserByEmailOrUsername(email, username string) (*models.DraftUsers, error) {
	var draftUser *models.DraftUsers
	if err := q.db.Model(&models.DraftUsers{}).Where("email = ? or username = ?", email, username).First(&draftUser).Error; err != nil {
		return nil, err
	}

	return draftUser, nil
}

func (q *UserQuery) createDraftUser(email, username, firstName, lastName, verifyId string) error {
	draftUser := &models.DraftUsers{
		Email:     email,
		Username:  username,
		FirstName: firstName,
		LastName:  lastName,
		VerifyID:  verifyId,
	}

	if err := q.db.Model(&models.DraftUsers{}).Create(&draftUser).Error; err != nil {
		return err
	}

	return nil
}

func (q *UserQuery) createUser(draftUser *models.DraftUsers) (*models.Users, error) {
	user := &models.Users{
		Id:        uuid.NewString(),
		FirstName: draftUser.FirstName,
		LastName:  draftUser.LastName,
		Username:  draftUser.Username,
		Email:     draftUser.Email,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	if err := q.db.Model(&models.Users{}).Create(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (q *UserQuery) deleteDraftUser(draftUser *models.DraftUsers) error {
	if err := q.db.Model(&models.DraftUsers{}).Where("email = ? or username = ?", draftUser.Email, draftUser.Username).Delete(&draftUser).Error; err != nil {
		return err
	}

	return nil
}

func (q *UserQuery) getSearchUsers(query string) ([]*models.Users, error) {
	var users []*models.Users
	prefix := query + "%"
	substring := "%" + query + "%"	
	if err := q.db.Raw(`
		(
			SELECT * FROM users WHERE username ILIKE ? ORDER BY username LIMIT 5
		)
		UNION ALL
		(
			SELECT * FROM users WHERE username ILIKE ? AND username NOT ILIKE ? ORDER BY username LIMIT 5
		)
		LIMIT 5
	`, prefix, substring, prefix).Scan(&users).Error; err != nil {
			return nil, err
		}

	return users, nil
}
