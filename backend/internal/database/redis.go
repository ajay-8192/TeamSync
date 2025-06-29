package database

import (
	"context"
	"team-sync/internal/config"

	"github.com/redis/go-redis/v9"
)

func InitRedis() *redis.Client {
	cfg := config.LoadRedisConfig()

	redisClient := redis.NewClient(&redis.Options{
		Addr:     cfg.REDIS_ADDR,
		Password: cfg.REDIS_PASS,
		DB:       0,
	})

	ctx := context.Background()
	_, err := redisClient.Ping(ctx).Result()
	if err != nil {
		panic("Failed to connect to Redis: " + err.Error())
	}

	return redisClient
}
