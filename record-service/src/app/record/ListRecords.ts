import { IListRecordResponse } from '@archivist/record-service-interface'

export class ListRecords {
  constructor(private readonly listRecords: () => Promise<string[]>) {

  }

  public async list(): Promise<IListRecordResponse> {
    return {
      ids: await this.listRecords()
    }
  }
}
