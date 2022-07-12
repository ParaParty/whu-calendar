// https://uc.whu.edu.cn/xl/a2022_2023nxl.htm

import { createEvents, EventAttributes } from 'ics';
import { writeFileSync } from 'fs';
import './utils.js';

let calendar_name = '武汉大学 2022 - 2023 学年校历';

let events : EventAttributes[] = [{
  title: '所有本科生和在籍研究生开始上课',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 9, 5],
  end: [2022, 9, 6],
  calName: calendar_name
}]

events.push({
  title: '本科新生注册',
  description: '请仔细对照录取通知书上的要求准备好材料。',
  busyStatus: 'FREE',
  start: [2022, 8, 18],
  end: [2022, 8, 19]
})

events.push({
  title: '本科生新生入学教育',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 8, 19],
  end: [2022, 8, 20]
})

events.push({
  title: '军训',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 8, 20],
  end: [2022, 9, 4]
})

events.push({
  title: '研究生返校注册',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 9, 2],
  end: [2022, 9, 3]
})

events.push({
  title: '本科生返校注册',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 9, 4],
  end: [2022, 9, 5]
})

events.push({
  title: '研究生新生注册',
  description: '请仔细对照录取通知书上的要求准备好材料。',
  busyStatus: 'FREE',
  start: [2022, 9, 3],
  end: [2022, 9, 4]
})

events.push({
  title: '研究生新生入学教育',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 9, 4],
  end: [2022, 9, 5]
})

events.push({
  title: '研究生新生开始上课',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 9, 5],
  end: [2022, 9, 6]
})


////////////////////////////////////////////////////////////////

/// 2023-2023学年第一学期于2022年9月4日至2023年1月7日，教学周共18周。

for (let i = 0; i < 18; i++) {
  let weekStart = new Date(2022, 8, 4).addWeek(i);
  let weekEnd = new Date(2022, 8, 4).addWeek(i + 1);

  events.push({
    title: `[1] 第 ${i + 1} 周`,
    description: '',
    busyStatus: 'FREE',
    start: weekStart.convertToICSDate(),
    end: weekEnd.convertToICSDate()
  })
}

////////////////////////////////////////////////////////////////

events.push({
  title: '中秋节假期',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 9, 10],
  end: [2022, 9, 11]
})

// events.push({
//   title: '[中秋调休] 第 3 周周一',
//   description: '时间调整见：http://uc.whu.edu.cn/info/1039/12145.htm',
//   busyStatus: 'FREE',
//   start: [2022, 9, 18],
//   end: [2022, 9, 19]
// })

// events.push({
//   title: '[中秋调休] 第 2 周周六',
//   description: '时间调整见：http://uc.whu.edu.cn/info/1039/12145.htm',
//   busyStatus: 'FREE',
//   start: [2022, 9, 20],
//   end: [2022, 9, 21]
// })




events.push({
  title: '国庆节假期',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 10, 1],
  end: [2022, 10, 4]
})

// events.push({
//   title: '[国庆调休] 第 5 周周三',
//   description: '时间调整见：http://uc.whu.edu.cn/info/1039/12145.htm',
//   busyStatus: 'FREE',
//   start: [2022, 9, 26],
//   end: [2022, 9, 27]
// })

// events.push({
//   title: '[国庆调休] 第 4 周周日',
//   description: '时间调整见：http://uc.whu.edu.cn/info/1039/12145.htm',
//   busyStatus: 'FREE',
//   start: [2022, 10, 6],
//   end: [2022, 10, 7]
// })

// events.push({
//   title: '[国庆调休] 第 4 周周六',
//   description: '时间调整见：http://uc.whu.edu.cn/info/1039/12145.htm',
//   busyStatus: 'FREE',
//   start: [2022, 10, 4],
//   end: [2022, 10, 5]
// })

// events.push({
//   title: '[国庆调休] 第 5 周周日',
//   description: '时间调整见：http://uc.whu.edu.cn/info/1039/12145.htm',
//   busyStatus: 'FREE',
//   start: [2022, 10, 5],
//   end: [2022, 10, 6]
// })

// events.push({
//   title: '[国庆调休] 第 5 周周四',
//   description: '时间调整见：http://uc.whu.edu.cn/info/1039/12145.htm',
//   busyStatus: 'FREE',
//   start: [2022, 10, 9],
//   end: [2022, 10, 10]
// })

// events.push({
//   title: '[国庆调休] 第 5 周周六',
//   description: '时间调整见：http://uc.whu.edu.cn/info/1039/12145.htm',
//   busyStatus: 'FREE',
//   start: [2022, 10, 7],
//   end: [2022, 10, 8]
// })



events.push({
  title: '校运会',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 11, 3],
  end: [2022, 11, 6]
})

events.push({
  title: '元旦假期',
  description: '',
  busyStatus: 'FREE',
  start: [2023, 1, 1],
  end: [2023, 1, 2]
})

events.push({
  title: '春节假期',
  description: '',
  busyStatus: 'FREE',
  start: [2023, 1, 22],
  end: [2023, 1, 23]
})

events.push({
  title: '考试周',
  description: '',
  busyStatus: 'FREE',
  start: [2022, 12, 25],
  end: [2023, 1, 8]
})

events.push({
  title: '寒假',
  description: '教职工寒假执行学校通知。',
  busyStatus: 'FREE',
  start: [2023, 1, 8],
  end: [2023, 2, 12]
})

////////////////////////////////////////////////////////////////

/// 2022-2023学年第二学期于2023年2月12日至2023年6月17日，教学周共18周。

for (let i = 0; i < 18; i++) {
  let weekStart = new Date(2023, 1, 12).addWeek(i);
  let weekEnd = new Date(2023, 1, 12).addWeek(i + 1);

  events.push({
    title: `[2] 第 ${i + 1} 周`,
    description: '',
    busyStatus: 'FREE',
    start: weekStart.convertToICSDate(),
    end: weekEnd.convertToICSDate()
  })
}

////////////////////////////////////////////////////////////////


events.push({
  title: '第二学期返校注册',
  description: '',
  busyStatus: 'FREE',
  start: [2023, 2, 12],
  end: [2023, 2, 13]
})

events.push({
  title: '第二学期开始上课',
  description: '',
  busyStatus: 'FREE',
  start: [2023, 2, 13],
  end: [2023, 2, 14]
})

events.push({
  title: '清明节',
  description: '调休细节日后更新',
  busyStatus: 'FREE',
  start: [2023, 4, 5],
  end: [2023, 4, 6]
})

events.push({
  title: '劳动节',
  description: '调休细节日后更新',
  busyStatus: 'FREE',
  start: [2023, 5, 1],
  end: [2023, 5, 2]
})

events.push({
  title: '端午节',
  description: '调休细节日后更新',
  busyStatus: 'FREE',
  start: [2023, 6, 22],
  end: [2023, 6, 23]
})

events.push({
  title: '第二学期考试周',
  description: '',
  busyStatus: 'FREE',
  start: [2023, 6, 4],
  end: [2023, 6, 18]
})

////////////////////////////////////////////////////////////////

for (let i = 0; i < 4; i++) {
  let weekStart = new Date(2023, 5, 18).addWeek(i);
  let weekEnd = new Date(2023, 5, 18).addWeek(i + 1);

  events.push({
    title: `[3] 第 ${i + 1} 周`,
    description: '',
    busyStatus: 'FREE',
    start: weekStart.convertToICSDate(),
    end: weekEnd.convertToICSDate()
  })
}

////////////////////////////////////////////////////////////////

// events.push({
//   title: '第三学期',
//   description: '',
//   busyStatus: 'FREE',
//   start: [2022, 6, 19],
//   end: [2023, 7, 17]
// })

events.push({
  title: '暑假',
  description: '教职工暑假执行学校通知',
  busyStatus: 'FREE',
  start: [2023, 7, 16],
  end: [2023, 9, 3]
})


createEvents(events, async (error, value) => {
  if (error) {
    console.log(error);
  }

  writeFileSync(`${__dirname}/${calendar_name}.ics`, value);
})
