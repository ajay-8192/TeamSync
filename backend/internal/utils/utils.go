package utils

import (
	"crypto/rand"
	"math/big"
	"os"
	"strconv"
)

func GetEnvOrDefaultValue(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func GenerateOTP() string {
	otp := ""
	for i := 0; i < 6; i++ {
		n, _ := rand.Int(rand.Reader, big.NewInt(10))
		otp += strconv.Itoa(int(n.Int64()))
	}
	return otp
}

