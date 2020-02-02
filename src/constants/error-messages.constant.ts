import { HttpStatus } from '@nestjs/common'

const ErrorMessages = {
  [HttpStatus.BAD_REQUEST]: 'Bad request',
  [HttpStatus.INTERNAL_SERVER_ERROR]:
    'There has been an error. Please try again later',
}

function getErrorMessageByStatus(status: HttpStatus) {
  return ErrorMessages[status] || 'Internal server error'
}

export { getErrorMessageByStatus }
