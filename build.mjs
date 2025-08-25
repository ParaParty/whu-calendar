import pkg from 'ics'
const { createEvents } = pkg
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { spawnSync } from 'child_process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 检测运行环境，确定正确的路径
const isInDist = __dirname.includes('/dist') || __dirname.includes('\\dist')
const basePath = isInDist ? '' : './dist/'

// 动态获取所有年份
function getAvailableYears() {
  const distDir = `${__dirname}/dist`
  const files = readdirSync(distDir)
  const years = []

  files.forEach((file) => {
    const match = file.match(/^calendar_(\d{4})\.js$/)
    if (match) {
      years.push(parseInt(match[1]))
    }
  })

  return years.sort((a, b) => a - b)
}

// 动态获取所有ICS文件名
function getAvailableICSFiles() {
  const years = getAvailableYears()
  return years.map((year) => `${year}-${year + 1}.ics`)
}

// 运行所有年份的日历生成脚本
function generateIndividualICS() {
  const years = getAvailableYears()
  console.log(`Found ${years.length} calendar years: ${years.join(', ')}`)

  years.forEach((year) => {
    const scriptPath = `calendar_${year}.js`
    console.log(`Generating ${year} calendar...`)
    const result = spawnSync('node', [scriptPath], {
      stdio: 'inherit',
      cwd: `${__dirname}/dist`,
    })
    if (result.status !== 0) {
      console.error(`Failed to generate ${year} calendar`)
      process.exit(1)
    }
  })
}

// 读取生成的ICS文件内容
function readICSFile(filename) {
  const filePath = `${__dirname}/${filename}`
  if (existsSync(filePath)) {
    return readFileSync(filePath, 'utf8')
  }
  // 如果在当前目录找不到，尝试在dist目录中查找
  const distPath = `${__dirname}/dist/${filename}`
  if (existsSync(distPath)) {
    return readFileSync(distPath, 'utf8')
  }
  return null
}

// 合并ICS文件内容
function mergeICSFiles(files) {
  if (files.length === 0) return ''

  const contents = files
    .map((file) => {
      const content = readICSFile(file)
      if (!content) return ''
      // 提取VEVENT部分，去掉BEGIN:VCALENDAR和END:VCALENDAR
      const events = content.split('BEGIN:VEVENT').slice(1)
      return events
        .map((event) => {
          // 去掉每个事件末尾的END:VCALENDAR
          const cleanEvent = event.replace(/END:VCALENDAR[\s\S]*$/, '')
          return 'BEGIN:VEVENT' + cleanEvent
        })
        .join('')
    })
    .filter((content) => content.length > 0)

  if (contents.length === 0) return ''

  // 创建合并的ICS文件
  const mergedContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:adamgibbons/ics
METHOD:PUBLISH
X-WR-CALNAME:武汉大学校历合集
X-PUBLISHED-TTL:PT1H
${contents.join('')}END:VCALENDAR`

  return mergedContent
}

// 生成所有年份的合集
function generateAllYears() {
  const allFiles = getAvailableICSFiles()
  console.log(`Merging ${allFiles.length} ICS files: ${allFiles.join(', ')}`)

  const mergedContent = mergeICSFiles(allFiles)
  if (mergedContent) {
    writeFileSync(`${__dirname}/dist/all.ics`, mergedContent)
    console.log('Generated all.ics')
  }
}

// 生成legacy文件夹和按年份的合集
function generateLegacyFiles() {
  const legacyDir = `${__dirname}/dist/legacy`
  if (!existsSync(legacyDir)) {
    mkdirSync(legacyDir, { recursive: true })
  }

  const years = getAvailableYears()
  const allICSFiles = getAvailableICSFiles()

  years.forEach((year, index) => {
    // 获取从第一年到当前年份的所有文件
    const files = allICSFiles.slice(0, index + 1)
    console.log(`Generating legacy/${year}.ics with files: ${files.join(', ')}`)

    const mergedContent = mergeICSFiles(files)
    if (mergedContent) {
      writeFileSync(`${legacyDir}/${year}.ics`, mergedContent)
      console.log(`Generated legacy/${year}.ics`)
    }
  })
}

// 生成年份信息文件供前端使用
function generateYearsInfo() {
  const years = getAvailableYears()
  const yearsInfo = {
    years: years,
    lastUpdated: new Date().toISOString(),
    totalYears: years.length,
  }

  writeFileSync(`${__dirname}/dist/years.json`, JSON.stringify(yearsInfo, null, 2))
  console.log(`Generated years.json with ${years.length} years: ${years.join(', ')}`)
}

// 主构建流程
function main() {
  console.log('Starting build process...')

  // 1. 生成各个年份的ICS文件
  generateIndividualICS()

  // 2. 等待一下确保文件写入完成
  setTimeout(() => {
    // 3. 生成合集文件
    generateAllYears()
    generateLegacyFiles()
    generateYearsInfo()
    console.log('Build completed!')
  }, 1000)
}

// 运行主流程
main()
