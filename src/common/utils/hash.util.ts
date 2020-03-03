import * as bcrypt from 'bcryptjs'
import { GeneralError } from '../general-error'
import { HttpStatus } from '@nestjs/common'

async function hashData(data: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(data, salt)
  } catch (error) {
    throw new GeneralError({
      isPublic: false,
      message: error.message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
  }
}

export { hashData }
