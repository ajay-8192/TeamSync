package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(data any) (string, error) {
	claims := jwt.MapClaims{
		"data": data,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
		"iat": time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	jwtSecret := []byte(GetEnvOrDefaultValue("JWT_SECRET", "jwt_secret"))

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		log.Printf("Failed to generate jwt token: %v", err)
		return "", err
	}

	return tokenString, nil
}


func ValidateToken(token string) ([]byte, error) {
	claims := jwt.MapClaims{}

	parsedToken, err := jwt.ParseWithClaims(token, claims, func(t *jwt.Token) (interface{}, error) {
		return []byte(GetEnvOrDefaultValue("JWT_SECRET", "jwt_secret")), nil
	})

	if err != nil {
		return nil, err
	}

	if !parsedToken.Valid {
		return nil, errors.New("invalid token")
	}

	jsonData, err := json.Marshal(claims["data"])
	if err != nil {
		return nil, fmt.Errorf("failed to marshal token data: %v", err)
	}

	return jsonData, nil
}

