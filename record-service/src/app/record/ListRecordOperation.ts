import { IListRecordResponse, IListRecordQueryParams } from '@archivist/record-service-interface'
import { AbstractApiOperation } from '../../infra/AbstractApiOperation'

export class ListRecordOperation extends AbstractApiOperation<IListRecordQueryParams, IListRecordResponse> {
  constructor(private readonly listRecords: () => Promise<string[]>) {
    super()
  }

  public async handleRequest(): Promise<IListRecordResponse> {
    return {
      ids: await this.listRecords()
    }
  }
}
