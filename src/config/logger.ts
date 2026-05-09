import * as fs from 'fs';
import * as path from 'path';
import { format } from 'date-fns';

/**
 * Industrial Logger for Playwright Framework
 * - 5 Log Levels (DEBUG, INFO, WARN, ERROR, FATAL)
 * - Timestamp + Context + Colors
 * - File output + Console
 * - JSON structured logging
 * - Exception handling
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO', 
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL'
}

export interface LogContext {
  testId?: string;
  file?: string;
  line?: number;
  [key: string]: any;
}

export class Logger {
  private static logDir = './logs';
  private static logFile = `framework-${format(new Date(), 'yyyyMMdd-HHmmss')}.log`;
  private static minLevel: LogLevel = LogLevel.INFO;  // Configurable
  
  // Colors for console (industry standard)
  private static colors: Record<LogLevel, string> = {
    [LogLevel.DEBUG]: '\x1b[36m',  // Cyan
    [LogLevel.INFO]: '\x1b[32m',   // Green  
    [LogLevel.WARN]: '\x1b[33m',   // Yellow
    [LogLevel.ERROR]: '\x1b[31m',  // Red
    [LogLevel.FATAL]: '\x1b[35m\x1b[1m'  // Magenta + Bold
  };

  private static resetColor = '\x1b[0m';

  /**
   * Set minimum log level (DEBUG|INFO|WARN|ERROR|FATAL)
   */
  static setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  /**
   * DEBUG: Detailed diagnostic info (Development only)
   */
  static debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * INFO: General app/test flow (Default level)
   */
  static info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * WARN: Recoverable issues (slow load, retries)
   */
  static warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * ERROR: Non-fatal errors (assertion fail, timeout)
   */
  static error(message: string, error?: Error, context?: LogContext): void {
    const fullMessage = error ? `${message}\n${error.stack}` : message;
    this.log(LogLevel.ERROR, fullMessage, context);
  }

  /**
   * FATAL: App-breaking errors (crash, config fail)
   */
  static fatal(message: string, error?: Error, context?: LogContext): void {
    const fullMessage = error ? `${message}\n${error.stack}` : message;
    this.log(LogLevel.FATAL, fullMessage, context);
    process.exit(1);  // Industry standard: terminate
  }

  /**
   * TRACE: Test execution steps (Playwright integration)
   */
  static trace(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, `[TRACE] ${message}`, context);
  }

  /**
   * JSON structured logging (ELK/Splunk compatible)
   */
  static json(level: LogLevel, message: string, context: LogContext): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context,
      pid: process.pid
    };
    console.log(JSON.stringify(logEntry));
    
    this.appendToFile(JSON.stringify(logEntry));
  }

  // **PRIVATE: Core logging engine**
  private static log(level: LogLevel, message: string, context?: LogContext): void {
    // Skip if below min level
    const levelOrder = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR, LogLevel.FATAL];
    if (levelOrder.indexOf(level) < levelOrder.indexOf(this.minLevel)) return;

    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
    const ctx = context ? ` | ${JSON.stringify(context).slice(1, -1)}` : '';
    
    // Console output (colored)
    const color = this.colors[level];
    const logMessage = `${color}[${timestamp}] [${level}] ${message}${ctx}${this.resetColor}`;
    console.log(logMessage);

    // File output (plain text)
    const fileMessage = `[${timestamp}] [${level}] ${message}${ctx}\n`;
    this.appendToFile(fileMessage);
  }

  private static appendToFile(message: string): void {
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }
      fs.appendFileSync(path.join(this.logDir, this.logFile), message);
    } catch (error) {
      console.error('Logger file write failed:', error);
    }
  }

  /**
   * Get current log file path
   */
  static getLogFile(): string {
    return path.join(this.logDir, this.logFile);
  }

  /**
   * Clear logs (before new run)
   */
  static clearLogs(): void {
    if (fs.existsSync(this.logDir)) {
      fs.rmSync(this.logDir, { recursive: true, force: true });
    }
  }
}