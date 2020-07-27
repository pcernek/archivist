/* eslint-disable no-console */

export type ContextType = Record<string, unknown>

export interface ILogger {
  namespace: string
  err(message: string, context?: ContextType): void
  warn(message: string, context?: ContextType): void
  info(message: string, context?: ContextType): void
  trace(message: string, context?: ContextType): void
}

export interface ILoggerBuildOptions {
  parentLogger?: ILogger
}

export class Logger implements ILogger {
  public readonly namespace: string

  constructor(namespace: string, buildOptions: ILoggerBuildOptions = {}) {
    const prefix = buildOptions.parentLogger ? `${buildOptions.parentLogger.namespace}:` : ''
    this.namespace = prefix + namespace
  }

  public err(message: string, context?: ContextType): void {
    context ? console.error(message + ' ' + JSON.stringify(context)) : console.error(message)
  }
  public warn(message: string, context?: ContextType): void {
    context ? console.warn(message + ' ' + JSON.stringify(context)) : console.warn(message)
  }
  public info(message: string, context?: ContextType): void {
    context ? console.info(message + ' ' + JSON.stringify(context)) : console.info(message)
  }
  public trace(message: string, context?: ContextType): void {
    context ? console.trace(message + ' ' + JSON.stringify(context)) : console.trace(message)
  }
}
