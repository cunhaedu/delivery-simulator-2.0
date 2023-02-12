# Delivery simulator

This is a delivery simulator app built during an full cycle's intensive

## Getting Start

First of all, you'll need to setup the apache kafka with docker, for that, just go to [apache-kaafka folder](./apache-kafka/) and execute the following command:


```bash
$ docker-compose up
```

It'll set up the following services:

- zookeeper -> To manage kafka
- kafka
- kafka-topics-generator -> Some commands to automatically set the application topics
- control-center -> A kafka UI from [Confluentinc](https://www.confluent.io/) to interage with the kafka, it'll be available on port 9021

### GO Simulator

Once the kafka service is set up, the next service to run is the [simulator](./simulator/), it interact with kafka giving the positions whenever a route is requested. To run it you'll first need to run the container:

```bash
$ docker-compose up
```

Once the container is up, you can enter in and execute the go script with the following command:

```bash
$ docker exec -it simulator bash
  ->  go run main.go
```

### Nestjs API

Again, you'll need to set up the container with

```bash
$ docker-compose up
```

It'll set up the following services:

- app -> The nestjs api running on port 3000
- mongodb -> A mongodb instance
- mongo-express -> A ui for the mongodb instance available on port 8081


## Observations

Whenever you run a docker-compose up command and stop it you must have to run a docker-compose down in order to run it again
