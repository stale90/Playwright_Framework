/*
* This file contains helper methods to support test operations
*
* */

export class Utility {

    // function to return current date as  04-16-2026
    static getCurrentDate(): string {
        const now = new Date();
        const current_date = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '-');
        return current_date;
        //04-16-2026
    }

    // function to return current date as format  04-16-2026-13_04_59
    static getDateTimeFilename(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeStampFileName = `${month}-${day}-${year}-${hours}_${minutes}_${seconds}`;
        return timeStampFileName;
        // "2026-04-16-12_54_23"
    }

    // function to get unique Report folder location
    static getReportFolder() : string {
      let date = Utility.getCurrentDate();
      let timeStamp = Utility.getDateTimeFilename();
      let folderPath = `${date}/html_${timeStamp}`;
      return folderPath;
    }
}