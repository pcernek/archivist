import express from 'express'
import { ILogger } from './Logger'

export abstract class AbstractApiOperation {
  constructor(private readonly logger: ILogger) {

  }

  public build() {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        await this.handleRequest(req, res)
      } catch (err) {
        this.logger.err(`Caught an error: `, err)
        next(err)
      }
    }
  }

  public abstract async handleRequest(req: express.Request, res: express.Response): Promise<void>
}
