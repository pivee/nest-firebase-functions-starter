import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { HttpExceptionFilter } from './filters/http-exception.filter';

export class FirebaseFunction {
  private functionModule;
  private expressInstance;

  constructor(functionModule) {
    this.functionModule = functionModule;
    this.expressInstance = express();
  }

  public async createNestServer() {
    const nestInstance = await NestFactory.create(
      this.functionModule,
      new ExpressAdapter(this.expressInstance),
    );
    (function configureMiddleware() {
      nestInstance.useGlobalFilters(new HttpExceptionFilter());
    })();
    return nestInstance.init();
  }

  public init() {
    this.createNestServer().catch((err) => console.error(err));
    return this.expressInstance;
  }
}
