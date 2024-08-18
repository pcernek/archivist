import { IRecordResponse } from '@archivist/record-service-interface'
import { AbstractApiOperation } from '../../infra/AbstractApiOperation'
import { IStoredRecord } from './RecordStore'

export class GetRecordOperation extends AbstractApiOperation<string, IRecordResponse> {
  constructor(private readonly getRecord: (id: string) => Promise<IStoredRecord>) {
    super()
  }

  public async handleRequest(id: string): Promise<IRecordResponse> {
    const record = await this.getRecord(id)
    return {
      ...record,
      tags: []
    }
  }
}
