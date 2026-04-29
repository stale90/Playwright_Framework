import * as fs from 'fs';
import * as path from 'path';

export class FileUtils {
  /**
   * Writes string array to .txt file (pipe-separated)
   * @param paths - Array of strings
   * @param filename - Output file (default: paths.txt)
   */

  static writePathsToFile(paths: string[], filename: string = 'paths.txt'): void {
    const pipeSeparated = paths.join('|');
    fs.writeFileSync(filename, pipeSeparated, 'utf8');
  }

  /**
   * Reads pipe-separated file and returns string array
   * @param filename - Input file (default: paths.txt)
   * @returns String array
   */
  static readPathsFromFile(filename: string = 'paths.txt'): string[] {
    if (!fs.existsSync(filename)) {
      throw new Error(`File not found: ${filename}`);
    }
    const content = fs.readFileSync(filename, 'utf8').trim();
    return content ? content.split('|') : [];
  }

  /**
   * Prints paths (one per line)
   * @param paths - String array or filename
   */
  static printPaths(pathsOrFile: string[] | string = 'paths.txt'): void {
    let paths: string[];
    if (typeof pathsOrFile === 'string') {
      paths = this.readPathsFromFile(pathsOrFile);
    } else {
      paths = pathsOrFile;
    }
    
    console.log('📁 Report Paths:');
    paths.forEach((path, index) => {
      console.log(`${index + 1}. ${path}`);
    });
  }
}