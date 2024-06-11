import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AdminReadModel } from '../../models/admin.read'

@Injectable()
export class ReadUserService {
  constructor(private readonly adminReadModel: AdminReadModel) {}

  async getAllFeedbacks() {
    const allFeedbacks = await this.adminReadModel.getAllFeedbacks()

    if (allFeedbacks.length === 0) {
      throw new HttpException(
        'Ainda não existe nenhum feedback',
        HttpStatus.NO_CONTENT,
      )
    }

    return  allFeedbacks 
  }
}
