import { HttpException } from '@nestjs/common'

interface GeneralErrorInput {
  isPublic: boolean
  message: string
  status: number
}

export class GeneralError extends HttpException {
  public isPublic: boolean
  constructor({ isPublic, message, status }: GeneralErrorInput) {
    super(message, status)
    this.isPublic = isPublic
  }
}
