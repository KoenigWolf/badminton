/**
 * 統一的なロガー
 * 開発環境と本番環境で異なるログレベルを設定可能
 */

type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatMessage(level: LogLevel, message: string, ...args: unknown[]): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  info(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.log(this.formatMessage("info", message), ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(this.formatMessage("warn", message), ...args);
  }

  error(message: string, error?: Error | unknown, ...args: unknown[]): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error(
      this.formatMessage("error", message),
      errorMessage,
      ...(errorStack ? [`\n${errorStack}`] : []),
      ...args
    );
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("debug", message), ...args);
    }
  }
}

export const logger = new Logger();

