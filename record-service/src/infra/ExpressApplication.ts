import express, { Express } from 'express'
import { Routes } from '../Routes'
import { IPostRecordBody, IRecordResponse } from '@archivist/record-service-interface'
import expressPinoLogger from 'express-pino-logger'
import { ILogger } from './Logger'

export class ExpressApplication {
  constructor(private readonly logger: ILogger) {

  }
  
  public async start(port: number) {
    const app = this.buildExpressServer()
    await this.addApplicationRoutes(app)
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
  }

  private buildExpressServer() {
    const app = express()
    app.use(express.json())
    app.use(expressPinoLogger({
      name: this.logger.namespace + ':express'
    }))
    return app
  }

  private async addApplicationRoutes(app: Express) {
    const routes = await Routes.build()

    app.get('/', (_, res) => res.send('Hello world from Archivist!'))

    app.post('/record', async (req, res) => {
      const requestBody = req.body as IPostRecordBody
      const responseBody: IRecordResponse = await routes.record.post(requestBody)
      return res.json(responseBody)
    })
  }
}
