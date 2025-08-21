import pkg from "ics";
const { createEvents } = pkg;
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 导入所有年份的日历数据
import "./dist/calendar_2021.js";
import "./dist/calendar_2022.js";
import "./dist/calendar_2023.js";
import "./dist/calendar_2024.js";
import "./dist/calendar_2025.js";

// 读取生成的ICS文件内容
function readICSFile(filename) {
  const filePath = `${__dirname}/dist/${filename}`;
  if (existsSync(filePath)) {
    return readFileSync(filePath, 'utf8');
  }
  return null;
}

// 合并ICS文件内容
function mergeICSFiles(files) {
  if (files.length === 0) return "";
  
  const contents = files.map(file => {
    const content = readICSFile(file);
    if (!content) return "";
    // 提取VEVENT部分，去掉BEGIN:VCALENDAR和END:VCALENDAR
    const events = content.split('BEGIN:VEVENT').slice(1);
    return events.map(event => 'BEGIN:VEVENT' + event).join('');
  }).filter(content => content.length > 0);

  if (contents.length === 0) return "";

  // 创建合并的ICS文件
  const mergedContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:adamgibbons/ics
METHOD:PUBLISH
X-WR-CALNAME:武汉大学校历合集
X-PUBLISHED-TTL:PT1H
${contents.join('')}END:VCALENDAR`;

  return mergedContent;
}

// 生成所有年份的合集
function generateAllYears() {
  const allFiles = [
    "2021-2022.ics",
    "2022-2023.ics", 
    "2023-2024.ics",
    "2024-2025.ics",
    "2025-2026.ics"
  ];
  
  const mergedContent = mergeICSFiles(allFiles);
  if (mergedContent) {
    writeFileSync(`${__dirname}/dist/all.ics`, mergedContent);
    console.log("Generated all.ics");
  }
}

// 生成legacy文件夹和按年份的合集
function generateLegacyFiles() {
  const legacyDir = `${__dirname}/dist/legacy`;
  if (!existsSync(legacyDir)) {
    mkdirSync(legacyDir, { recursive: true });
  }

  const yearFiles = [
    { year: 2021, files: ["2021-2022.ics"] },
    { year: 2022, files: ["2021-2022.ics", "2022-2023.ics"] },
    { year: 2023, files: ["2021-2022.ics", "2022-2023.ics", "2023-2024.ics"] },
    { year: 2024, files: ["2021-2022.ics", "2022-2023.ics", "2023-2024.ics", "2024-2025.ics"] },
    { year: 2025, files: ["2021-2022.ics", "2022-2023.ics", "2023-2024.ics", "2024-2025.ics", "2025-2026.ics"] }
  ];

  yearFiles.forEach(({ year, files }) => {
    const mergedContent = mergeICSFiles(files);
    if (mergedContent) {
      writeFileSync(`${legacyDir}/${year}.ics`, mergedContent);
      console.log(`Generated legacy/${year}.ics`);
    }
  });
}

// 等待一段时间确保所有ICS文件都已生成
setTimeout(() => {
  generateAllYears();
  generateLegacyFiles();
  console.log("Build completed!");
}, 2000);
