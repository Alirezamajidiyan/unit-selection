import TimeTable from "./TimeTable";
import { useRef, useState, useEffect } from "react";
import CourseTable from "./CourseTable";
import { toast } from "react-toastify";
function MainContent({ siteTheme, setSiteTheme, setTotalUnits }) {
  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("courses")) || []
  );
  const [modal,setModal]=useState('close');
  const [mapw,setmapw]=useState(false);
  const courseInputs = {
    code: useRef(null),
    name: useRef(null),
    professor: useRef(null),
    unit: useRef(null),
    day: useRef(null),
    time: useRef(null),
    classType: useRef(null),
    examDate: useRef(null),
    examTime: useRef(null),
  };
  useEffect(() => {
    setSiteTheme(localStorage.getItem("theme") || "light");
    inputReset();
    localStorage.setItem("courses", JSON.stringify(courses));
    setTotalUnits(() => {
      let units = 0;
      courses.forEach((course) => (units += Number(course.unit)));
      return units;
    });
  }, [courses]);

  function deleteCourse(code) {
    setCourses((oldCourses) =>
      oldCourses.filter((course) => course.code !== code)
    );
  }
  function inputReset() {
    courseInputs.name.current.value = "";
    courseInputs.professor.current.value = "";
    courseInputs.unit.current.value = "";
    courseInputs.day.current.value = "";
    courseInputs.time.current.value = "";
    courseInputs.classType.current.value = "";
    courseInputs.examDate.current.value = "";
    courseInputs.examTime.current.value = "";
  }
  function resetLS() {
    setModal('open');
    courseInputs.code.current.value = "";
    localStorage.removeItem("courses");
    window.location.reload();
  }
  function editCourse() {
    if (courseInputs.code.current.value === "") {
      if (siteTheme === "light") {
        toast.error("فیلد کد درس نمی تواند خالی باشد", {
          theme: "light",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("فیلد کد درس نمی تواند خالی باشد", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return;
    }

    if (
      (courseInputs.day.current.value !== "" ||
        courseInputs.time.current.value !== "" ||
        courseInputs.classType.current.value !== "") &&
      (courseInputs.day.current.value === "" ||
        courseInputs.time.current.value === "" ||
        courseInputs.classType.current.value === "")
    ) {
      toast.error(
        "برای ویرایش زمان کلاس درس مورد نظر باید تمامی فیلد های روز های هفته، بازه زمانی و نوع برگزاری کلاس پر شوند",
        {
          theme: "light",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    let changed = false;
    setCourses((oldCourses) =>
      oldCourses.map((course) => {
        if (course.code !== courseInputs.code.current.value) {
          return course;
        } else {
          changed = true;
          return {
            code: course.code,

            name:
              courseInputs.name.current.value === ""
                ? course.name
                : courseInputs.name.current.value,

            professor:
              courseInputs.professor.current.value === ""
                ? course.professor
                : courseInputs.professor.current.value,

            unit:
              courseInputs.unit.current.value === ""
                ? course.unit
                : courseInputs.unit.current.value,

            times:
              courseInputs.day.current.value === "" ||
              courseInputs.time.current.value === "" ||
              courseInputs.classType.current.value === ""
                ? course.times
                : [
                    {
                      day: courseInputs.day.current.value,
                      startTime: courseInputs.time.current.value,
                      timeType: courseInputs.classType.current.value,
                    },
                  ],

            examDate:
              courseInputs.examDate.current.value === ""
                ? course.examDate
                : courseInputs.examDate.current.value,

            examTime:
              courseInputs.examTime.current.value === ""
                ? course.examTime
                : courseInputs.examTime.current.value,
          };
        }
      })
    );

    if (!changed) {
      if (siteTheme === "light") {
        toast.error("کد درس وارد شده یافت نشد", {
          theme: "light",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("کد درس وارد شده یافت نشد", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  function submit() {
    let found = false;
    let needAlert = checkAlert();

    if (!needAlert) {
      courses.forEach((course) => {
        if (course.code === courseInputs.code.current.value) {
          found = true;
        }
      });

      if (found) {
        setCourses((oldCourses) =>
          oldCourses.map((course) => {
            if (courseInputs.code.current.value === course.code) {
              return {
                ...course,
                times: [
                  ...course.times,
                  {
                    day: courseInputs.day.current.value,
                    startTime: courseInputs.time.current.value,
                    timeType: courseInputs.classType.current.value,
                  },
                ],
              };
            } else {
              return course;
            }
          })
        );
      } else {
        setCourses((oldCourses) => [
          ...oldCourses,
          {
            code: courseInputs.code.current.value,
            name: courseInputs.name.current.value,
            professor: courseInputs.professor.current.value,
            unit: courseInputs.unit.current.value,
            times: [
              {
                day: courseInputs.day.current.value,
                startTime: courseInputs.time.current.value,
                timeType: courseInputs.classType.current.value,
              },
            ],
            examDate: courseInputs.examDate.current.value,
            examTime: courseInputs.examTime.current.value,
          },
        ]);
      }
    }
  }
  
  function checkAlert() {
    if (courseInputs.code.current.value === "") {
      if (siteTheme === "light") {
        toast.error("فیلد کد درس نمی تواند خالی باشد", {
          theme: "light",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("فیلد کد درس نمی تواند خالی باشد", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return true;
    }

    let needAlert = 0;
    let codeFound = false;
    courses.forEach((course) => {
      course.times.forEach((time) => {
        if (
          time.day === courseInputs.day.current.value &&
          time.startTime === courseInputs.time.current.value &&
          course.code === courseInputs.code.current.value
        ) {
          if (
            time.timeType === "static" ||
            courseInputs.classType.current.value === "static"
          ) {
            needAlert = -1;
          } else if (time.timeType === courseInputs.classType.current.value) {
            needAlert = -1;
          }
        } else if (
          time.day === courseInputs.day.current.value &&
          time.startTime === courseInputs.time.current.value
        ) {
          if (
            time.timeType === "static" ||
            courseInputs.classType.current.value === "static"
          ) {
            needAlert = 1;
          } else if (time.timeType === courseInputs.classType.current.value) {
            needAlert = 1;
          }
        }
      });

      if (course.code === courseInputs.code.current.value) {
        codeFound = true;
      }
    });

    if (needAlert === 1) {
      if (siteTheme === "light") {
        toast.error("درس وارد شده با یکی از دروس انتخاب شده قبل تداخل دارد", {
          theme: "light",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("درس وارد شده با یکی از دروس انتخاب شده قبل تداخل دارد", {
          theme: "dark",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return true;
    } else if (needAlert === -1) {
      toast.error("در این روز و ساعت درس مذکور قبلا وارد شده است", {
        theme: "dark",
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return true;
    }

    if (!codeFound) {
      if (
        courseInputs.name.current.value === "" ||
        courseInputs.professor.current.value === "" ||
        courseInputs.unit.current.value === "" ||
        courseInputs.day.current.value === "" ||
        courseInputs.time.current.value === "" ||
        courseInputs.classType.current.value === ""
      ) {
        toast.error(
          "اطلاعات لازم برای درس به طور کامل وارد نشده اند. لطفا اطلاعات را کامل کرده و دوباره امتحان کنید",
          {
            theme: "dark",
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return true;
      }
    } else {
      if (
        courseInputs.day.current.value === "" ||
        courseInputs.time.current.value === "" ||
        courseInputs.classType.current.value === ""
      ) {
        toast.error(
          "برای اضافه کردن زمان کلاس به درسی نیاز است که تمام ورودی های روزهای هفته، بازه زمانی و نوع برگزاری کلاس وارد شوند",
          {
            theme: "dark",
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return true;
      }
    }

    return false;
  }
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-3">
        {modal === 'open' && (
  <div class="modal show" style={{ display: 'block' }} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">تایید بازنشانی</h5>
          <button
            type="button"
            class="close"
            onClick={() => setModal('close')}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>از بازنشانی مطمئن هستید؟ این عمل قابل بازگشت نیست</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              setModal('close'); // مدال را می‌بندیم
              resetLS()
            }}
          >
            بله
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => setModal('close')}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  </div>
)}

          <input
            className={`form-control mb-2 ${
              siteTheme === "light"
                ? "bg-white text-dark"
                : "bg-dark text-light"
            }`}
            type="text"
            placeholder="*کد درس"
            ref={courseInputs.code}
          />
        </div>
        <div className="col-md-3">
          <input
            className={`form-control mb-2 ${
              siteTheme === "light" ? "bg-white" : "bg-dark text-light"
            }`}
            type="text"
            placeholder="*نام درس"
            ref={courseInputs.name}
          />
        </div>
        <div className="col-md-3">
          <input
            className={`form-control mb-2 ${
              siteTheme === "light" ? "bg-white" : "bg-dark text-light"
            }`}
            type="text"
            placeholder="*نام استاد"
            ref={courseInputs.professor}
          />
        </div>
        <div className="col-md-3">
          <select
            className={`form-control mb-2 ${
              siteTheme === "light" ? "bg-white" : "bg-dark text-light"
            }`}
            ref={courseInputs.unit}
          >
            <option value="">*واحد درسی</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className={`form-control mb-2 ${
              siteTheme === "light" ? "bg-white" : "bg-dark text-light"
            }`}
            ref={courseInputs.day}
          >
            <option value="">*روز های هفته</option>
            <option value="5">شنبه</option>
            <option value="4">یکشنبه</option>
            <option value="3">دوشنبه</option>
            <option value="2">سه شنبه</option>
            <option value="1">چهارشنبه</option>
            <option value="0">پنج شنبه</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className={`form-control mb-2 ${
              siteTheme === "light" ? "bg-white" : "bg-dark text-light"
            }`}
            ref={courseInputs.time}
          >
            <option value="">*بازه زمانی</option>
            <option value="8">8 - 10</option>
            <option value="10">10 - 12</option>
            <option value="12">12 - 14</option>
            <option value="14">14 - 16</option>
            <option value="16">16 - 18</option>
            <option value="18">18 - 20</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className={`form-control mb-2 ${
              siteTheme === "light" ? "bg-white" : "bg-dark text-light"
            }`}
            ref={courseInputs.classType}
          >
            <option value="">*نوع برگزاری کلاس</option>
            <option value="static">ثابت</option>
            <option value="odd">هفته فرد</option>
            <option value="even">هفته زوج</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            className={`form-control mb-2 ${
              siteTheme === "light" ? "bg-white" : "bg-dark text-light"
            }`}
            type="text"
            placeholder="تاریخ امتحان"
            ref={courseInputs.examDate}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <input
            className={`form-control mb-2 ${
              siteTheme === "light" ? "bg-white" : "bg-dark text-light"
            }`}
            type="text"
            placeholder="ساعت امتحان"
            ref={courseInputs.examTime}
          />
        </div>
      </div>

      <div className="buttons-container d-flex align-items-center gap-4 mb-4">
        <button
          className={`btn btn-danger d-flex ${
            siteTheme === "light" ? "" : "btn-outline-light"
          }`}
          onClick={()=>{setModal('open')}}
        >
          <span>ریست</span>
        </button>
        <button
          className={`btn btn-primary ${
            siteTheme === "light" ? "" : "btn-outline-light"
          }`}
          onClick={editCourse}
        >
          ویرایش
        </button>
        <button
          className={`btn btn-success ${
            siteTheme === "light" ? "" : "btn-outline-light"
          }`}
          onClick={submit}
        >
          ثبت
        </button>
      <button className={`btn mb-2 ${siteTheme==='dark'?'btn-outline-warning':'btn-outline-primary'}`} onClick={()=>{setmapw(!mapw)}} title="مشاهده برنامه هفتگی">
        {mapw?(<i class="bi bi-eye-fill"></i>):(<i class="bi bi-eye-slash-fill"></i>)}
      </button>
      </div>
      {mapw?<TimeTable courses={courses} siteTheme={siteTheme} />:<></>}
      <CourseTable
        deleteCourse={deleteCourse}
        courses={courses}
        siteTheme={siteTheme}
      />
    </>
  );
}

export default MainContent;
