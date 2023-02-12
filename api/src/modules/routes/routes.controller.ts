import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Producer } from 'kafkajs';
import { RoutesService } from './routes.service';

type NewPositionMessage = {
  routeId: string;
  clientId: string;
  position: [number, number];
  finished: boolean;
};

@Controller('routes')
export class RoutesController implements OnModuleInit {
  private kafkaProducer: Producer;

  constructor(
    private readonly routesService: RoutesService,
    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.kafkaClient.connect();
  }

  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @Get(':id/start')
  startRoute(@Param('id') id: string) {
    this.kafkaProducer.send({
      topic: 'route.new-direction',
      messages: [
        {
          key: 'route.new-direction',
          value: JSON.stringify({ routeId: id, clientId: '' }),
        },
      ],
    });
  }

  @MessagePattern('route.new-position')
  consumeNewPosition(@Payload() message: { value: NewPositionMessage }) {
    console.log(message);
  }
}
