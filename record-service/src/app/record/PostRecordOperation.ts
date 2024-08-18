import { IPostRecordBody, IRecordResponse } from '@archivist/record-service-interface';
import { AbstractApiOperation } from '../../infra/AbstractApiOperation';
import { ILogger } from '../../infra/Logger';

export class PostRecordOperation extends AbstractApiOperation {
  constructor(logger: ILogger, private readonly createRecord: (data: string) => Promise<string>) {
    super(logger)
  }

  public async handleRequest(body: IPostRecordBody): Promise<IRecordResponse> {
    const requestBody = req.body as IPostRecordBody
    const id = await this.createRecord(body.data)
    return res.json({ id, ...body })
  }
}
