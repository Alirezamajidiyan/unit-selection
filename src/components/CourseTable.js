import React from "react";

export default function CourseTable(props) {
  const { courses, deleteCourse } = props

  function checkDay(day) {
    switch (day) {
      case '0':
        return 'پنج شنبه'
      case '1':
        return 'چهارشنبه'
      case '2':
        return 'سه شنبه'
      case '3':
        return 'دوشنبه'
      case '4':
        return 'یکشنبه'
      default:
        return 'شنبه'
    }
  }

  function checkType(time) {
    if (time.timeType === 'odd') {
      return 'فرد'
    }
    else if (time.timeType === 'even') {
      return 'زوج'
    }
    else {
      return ''
    }
  }

  function optimizeTime(course) {
    let courseTime = ''

    let i = 0
    course.times.forEach(time => {
      courseTime += `${i ? ' / ' : ''} ${checkDay(time.day)} ${time.startTime} - ${Number(time.startTime) + 2} ${checkType(time)}`
      i++
    })

    return courseTime
  }

  const coursesElements = courses.map(course => (
    <tr key={course.code}>
      <td>{`تاریخ ${course.examDate} - ساعت ${course.examTime}`}</td>
      <td>{optimizeTime(course)}</td>
      <td>{course.professor}</td>
      <td>{course.unit}</td>
      <td>{course.name}</td>
      <td className="delete-button-container">
        {course.code}
        <button onClick={() => deleteCourse(course.code)} className="delete-button">x</button>
      </td>
    </tr>
  ))

  return (
    <table>
      <tr>
        <th>زمان امتحان</th>
        <th>زمان کلاس</th>
        <th>نام استاد</th>
        <th>واحد</th>
        <th>نام درس</th>
        <th>کد درس</th>
      </tr>
      {coursesElements}
    </table>
  )
}