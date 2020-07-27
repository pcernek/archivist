import { IPostRecordBody, IRecordResponse } from '@archivist/record-service-interface';

export class PostRecord {
  constructor(private readonly createRecord: (data: string) => Promise<string>) {

  }

  public async post(body: IPostRecordBody): Promise<IRecordResponse> {
    const id = await this.createRecord(body.data)
    return { id, ...body }
  }
}
