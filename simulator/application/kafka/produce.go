package kafka

import (
	"encoding/json"
	"log"
	"os"
	"time"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"

	"github.com/cunhaedu/delivery-simulator/application/route"
	"github.com/cunhaedu/delivery-simulator/infra/kafka"
)

func Produce(msg *ckafka.Message) {
	producer := kafka.NewKafkaProducer()

	route := route.NewRoute()
	json.Unmarshal(msg.Value, &route)

	route.LoadPositions()

	positions, err := route.ExportJSONPositions()

	if err != nil {
		log.Println(err.Error())
	}

	for _, p := range positions {
		kafka.Publish(p, os.Getenv("KafkaProduceTopic"), producer)
		time.Sleep(time.Millisecond * 500)
	}
}
