import React from "react";

export default function TimeTable(props) {
  const coursesTime = [];
  for (let i = 0; i < 6; i++) {
    coursesTime.push([])
  }
  const coursesTimeElement = coursesTime.map(() => {
    const temp = []
    for (let i = 0; i < 6; i++) {
      temp.push(<td></td>)
    }
    return temp
  })

  const { courses } = props

  function checkType(time) {
    if (time.timeType === 'odd') {
      return 'هفته فرد'
    }
    else if (time.timeType === 'even') {
      return 'هفته زوج'
    }
    else {
      return ''
    }
  }

  courses.forEach(course => {
    const courseName = `${course.name} ${course.professor}`
    course.times.forEach(time => {
      const timeType = checkType(time)
      
      if (time.startTime === "8") {
        coursesTimeElement[0][time.day] = <td>{courseName} {timeType}</td>
      }
      else if (time.startTime === "10") {
        coursesTimeElement[1][time.day] = <td>{courseName} {timeType}</td>
      }
      else if (time.startTime === "12") {
        coursesTimeElement[2][time.day] = <td>{courseName} {timeType}</td>
      }
      else if (time.startTime === "14") {
        coursesTimeElement[3][time.day] = <td>{courseName} {timeType}</td>
      }
      else if (time.startTime === "16") {
        coursesTimeElement[4][time.day] = <td>{courseName} {timeType}</td>
      }
      else {
        coursesTimeElement[5][time.day] = <td>{courseName} {timeType}</td>
      }
    })
  })

  return (
    <table>
      <tr>
        <th>پنج شنبه</th>
        <th>چهارشنبه</th>
        <th>سه شنبه</th>
        <th>دوشنبه</th>
        <th>یکشنبه</th>
        <th>شنبه</th>
        <th>تایم</th>
      </tr>
      <tr>
        {coursesTimeElement[0]}
        <th>8 - 10</th>
      </tr>
      <tr>
        {coursesTimeElement[1]}
        <th>10 - 12</th>
      </tr>
      <tr>
        {coursesTimeElement[2]}
        <th>12 - 14</th>
      </tr>
      <tr>
        {coursesTimeElement[3]}
        <th>14 - 16</th>
      </tr>
      <tr>
        {coursesTimeElement[4]}
        <th>16 - 18</th>
      </tr>
      <tr>
        {coursesTimeElement[5]}
        <th>18 - 20</th>
      </tr>
    </table>
  )
}