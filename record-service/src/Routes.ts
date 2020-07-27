import { RecordOperations } from './app/record/RecordOperations';

export class Routes {
  public static async build() {
    return {
      record: await RecordOperations.build()
    }
  }
}
