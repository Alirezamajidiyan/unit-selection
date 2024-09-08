function TimeTable({ courses, siteTheme }) {
  const coursesTime = [];
  const filled = [];

  for (let i = 0; i < 6; i++) {
    coursesTime.push([]);
    filled.push([]);
  }

  const coursesTimeElement = coursesTime.map(() => {
    const temp = [];
    for (let i = 0; i < 6; i++) {
      temp.push(<td key={i}></td>);
    }
    return temp;
  });

  const innerText = filled.map(() => {
    const temp = [];
    for (let i = 0; i < 6; i++) {
      temp.push("");
    }
    return temp;
  });

  function checkType(time) {
    if (time.timeType === "odd") {
      return "هفته فرد";
    } else if (time.timeType === "even") {
      return "هفته زوج";
    } else {
      return "";
    }
  }

  function fillTable(index, timeDay, courseName, timeType) {
    if (innerText[index][timeDay] === "") {
      innerText[index][timeDay] = `${courseName} ${timeType}`;
      coursesTimeElement[index][timeDay] = (
        <td key={timeDay}>{innerText[index][timeDay]}</td>
      );
    } else {
      innerText[index][timeDay] += `/ ${courseName} ${timeType}`;
      coursesTimeElement[index][timeDay] = (
        <td key={timeDay}>{innerText[index][timeDay]}</td>
      );
    }
  }

  courses.forEach((course) => {
    const courseName = `${course.name} ${course.professor}`;
    course.times.forEach((time) => {
      const timeType = checkType(time);

      if (time.startTime === "8") {
        fillTable(0, time.day, courseName, timeType);
      } else if (time.startTime === "10") {
        fillTable(1, time.day, courseName, timeType);
      } else if (time.startTime === "12") {
        fillTable(2, time.day, courseName, timeType);
      } else if (time.startTime === "14") {
        fillTable(3, time.day, courseName, timeType);
      } else if (time.startTime === "16") {
        fillTable(4, time.day, courseName, timeType);
      } else {
        fillTable(5, time.day, courseName, timeType);
      }
    });
  });

  return (
    <div
      className={`table-responsive ${
        siteTheme === "light" ? "bg-light" : "bg-dark"
      }`}
    >
      <table
        className={`table table-bordered table-striped ${
          siteTheme === "light" ? "table-light" : "table-dark"
        }`}
      >
        <thead
          className={`${siteTheme === "light" ? "thead-light" : "thead-dark"}`}
        >
          <tr>
            <th>پنج شنبه</th>
            <th>چهارشنبه</th>
            <th>سه شنبه</th>
            <th>دوشنبه</th>
            <th>یکشنبه</th>
            <th>شنبه</th>
            <th>تایم</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
}
export default TimeTable;
