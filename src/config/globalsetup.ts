import { Utility } from "../reusable/utility";


export default async function globalSetup() {
  const reportPaths = Utility.getExcelReportPath();
  const fileName = Utility.getTimeStampFileName();

  process.env.CURRENT_EXCEL_REPORT_DIR = reportPaths || 'DefaultReport';
  process.env.TIMESTAMP_FILE_NAME = fileName || 'DefaultFile';

}