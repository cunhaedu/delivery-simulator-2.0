package main

import (
	"fmt"
	"log"

	kafka2 "github.com/cunhaedu/delivery-simulator/application/kafka"
	kafka "github.com/cunhaedu/delivery-simulator/infra/kafka"
	"github.com/joho/godotenv"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	msgChan := make(chan *ckafka.Message)

	consumer := kafka.NewKafkaConsumer(msgChan)

	go consumer.Consume()

	for msg := range msgChan {
		fmt.Println(string(msg.Value))
		go kafka2.Produce(msg)
	}
}
