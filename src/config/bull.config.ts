import { BullOptionsFactory, BullModuleOptions } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BullConfigService implements BullOptionsFactory {
  createBullOptions(): BullModuleOptions {
    return {
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
      },
    }
  }
}
