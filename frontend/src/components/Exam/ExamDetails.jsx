import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import GridFunctions from "../Common/Grid/GridFunctions";
import Swal from "sweetalert2";
import printJS from "print-js";
import SiteLoading from "../Common/siteloading/SiteLoading";

import { GetApiCaller, PostApiCaller } from "../../services/ApiCaller";

import "react-datepicker/dist/react-datepicker.css";

const ExamDetails = () => {
  const [isLoad, setLoad] = useState(false);
  const [strFormState, setFormState] = useState("Add");
  const objTimeConfig = {
    dtmMinTime: new Date(
      new Date(new Date().setHours(8)).setMinutes(0)
    ).setSeconds(0),
    dtmMaxTime: new Date(
      new Date(new Date().setHours(17)).setMinutes(0)
    ).setSeconds(0),
  };
  const [dtmExamDate, setExamDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [objExamTime, setExamTime] = useState({
    dtmStartTime: objTimeConfig.dtmMinTime,
    dtmEndTime: objTimeConfig.dtmMaxTime,
  });
  const [arrStudent, setStudent] = useState([]);
  const [objExam, setExamObj] = useState({
    strExamCode: "",
    strExamDesc: "",
    strExamSubject: "",
    strExamRemark: "",
    arrStudents: [],
  });
  const [arrExamDetails, setExamDetails] = useState([]);

  const columns = [
    {
      name: "Exam Code",
      grow: 1,
      selector: "strExamCode",
    },
    {
      name: "Exam Subject",
      grow: 1,
      selector: "strExamSubject",
    },
    {
      name: "Exam Description",
      grow: 3,
      selector: "strExamDesc",
    },
    {
      name: "Exam Date",
      grow: 1,
      cell: (row) => (
        <span>{new Date(row.dtmExamDate).toLocaleDateString()}</span>
      ),
    },
    {
      name: "Action",
      grow: 0.5,
      cell: (row) => (
        <>
          <button
            className="btn btn-sm btn-info m-0 p-2"
            onClick={() => fnSelectExam(row)}
          >
            <i className="fas fa-edit" />
          </button>
          {row.booMarked && (
            <button
              className="btn btn-sm btn-success m-0 p-2 ms-2"
              onClick={() => fnPrint(row.strExamCode)}
            >
              <i className="fas fa-file-pdf" />
            </button>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchStudentData();
    fetchExamData();
  }, []);

  const fetchStudentData = async () => {
    setLoad(true);
    const resStudent = await GetApiCaller("exam/GetStudents");
    setLoad(false);
    if (resStudent.booStatus) {
      setStudent(
        resStudent.objResponse.map((objStudent) => {
          return {
            label: objStudent.strStudentCode + "-" + objStudent.strStudentName,
            value: objStudent.strStudentCode,
          };
        })
      );
    } else {
      showValidationError(false, resStudent.objResponse);
    }
  };

  const fetchExamData = async () => {
    setLoad(true);
    const resExam = await GetApiCaller("exam/GetExams");
    setLoad(false);
    if (resExam.booStatus) {
      setExamDetails(resExam.objResponse);
    } else {
      showValidationError(false, resExam.objResponse);
    }
  };

  const fnSelectExam = (objRow) => {
    setExamDate(new Date(objRow.dtmExamDate));
    setExamTime({
      dtmStartTime: new Date(objRow.dtmStartTime),
      dtmEndTime: new Date(objRow.dtmEndTime),
    });
    setExamObj({
      strExamCode: objRow.strExamCode,
      strExamDesc: objRow.strExamDesc,
      strExamSubject: objRow.strExamSubject,
      strExamRemark: objRow.strExamRemark,
      arrStudents: objRow.arrStudents.map((objStudent) => {
        return {
          label: objStudent.strStudentCode + "-" + objStudent.strStudentName,
          value: objStudent.strStudentCode,
        };
      }),
    });
    setFormState("Inq");
  };

  const fnPrint = async (strExamCode) => {
    setLoad(true);
    const resPrint = await PostApiCaller("exam/ExamReport", {
      strExamCode: strExamCode,
    });
    setLoad(false);
    if (resPrint.booStatus) {
      printJS({ printable: resPrint.objResponse, type: "pdf", base64: true });
    } else {
      showValidationError(false, resPrint.objResponse);
    }
  };

  const fnSave = async () => {
    if (objExam.strExamDesc === "") {
      showValidationError(false, "Please enter exam description!");
    } else if (objExam.strExamSubject === "") {
      showValidationError(false, "Please enter exam subject!");
    } else if (objExam.strExamRemark === "") {
      showValidationError(false, "Please enter exam remark!");
    } else if (objExam.arrStudents.length <= 0) {
      showValidationError(false, "Please enter students for exam!");
    } else {
      const saveObj = {
        ...objExam,
        strExamCode: strFormState === "Add" ? Date.now() : objExam.strExamCode,
        arrStudents: objExam.arrStudents.map((objStudent) => {
          return {
            strStudentCode: objStudent.value,
            strStudentName: objStudent.label.split("-")[1],
          };
        }),
        dtmExamDate: dtmExamDate,
        dtmStartTime: objExamTime.dtmStartTime,
        dtmEndTime: objExamTime.dtmEndTime,
      };

      setLoad(true);
      const resSave = await PostApiCaller(
        strFormState === "Add" ? "exam/SaveExam" : "exam/UpdateExam",
        saveObj
      );
      setLoad(false);
      if (resSave.booStatus) {
        showValidationError(true, resSave.objResponse);
        fnClear();
        fetchExamData();
      } else {
        showValidationError(false, resSave.objResponse);
      }
    }
  };

  const fnDelete = async () => {
    setLoad(true);
    const resDelete = await PostApiCaller("exam/DeleteExam", {
      strExamCode: objExam.strExamCode,
    });
    setLoad(false);
    if (resDelete.booStatus) {
      showValidationError(true, resDelete.objResponse);
      fnClear();
      fetchExamData();
    } else {
      showValidationError(false, resDelete.objResponse);
    }
  };

  const fnSetExamTime = (strType, dtmTime) => {
    if (strType === "S") {
      setExamTime((objExamTime) => ({
        ...objExamTime,
        dtmStartTime: dtmTime,
      }));
    } else if (strType === "E") {
      setExamTime((objExamTime) => ({
        ...objExamTime,
        dtmEndTime: dtmTime,
      }));
    }
  };

  const fnSelectStudent = (value) => {
    setExamObj((objExam) => ({
      ...objExam,
      arrStudents: value,
    }));
  };

  const fnHandleOnChange = (e) => {
    e.persist();
    setExamObj((objExam) => ({
      ...objExam,
      [e.target.name]: e.target.value,
    }));
  };

  const showValidationError = (booSucess, msg) => {
    return Swal.fire({
      icon: booSucess ? "success" : "error",
      title: booSucess ? msg : "Something wrong in exam form!",
      text: !booSucess ? msg : "",
    });
  };

  const fnClear = () => {
    setExamDate(new Date().setDate(new Date().getDate() + 1));
    setExamTime({
      dtmStartTime: objTimeConfig.dtmMinTime,
      dtmEndTime: objTimeConfig.dtmMaxTime,
    });
    setExamObj({
      strExamCode: "",
      strExamDesc: "",
      strExamSubject: "",
      strExamRemark: "",
      arrStudents: [],
    });
    setFormState("Add");
  };

  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container-fluid">
        <fieldset className="form-group mt-2 me-4">
          <div className="row m-0 p-0">
            <div className="col-md-4 m-0 p-2">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="strExamCode"
                  name="strExamCode"
                  value={objExam.strExamCode}
                  disabled
                />
                <label htmlFor="strExamCode">Exam Code</label>
              </div>
            </div>
            <div className="col-md-8 m-0 p-2">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="strExamDesc"
                  name="strExamDesc"
                  value={objExam.strExamDesc}
                  onChange={(e) => fnHandleOnChange(e)}
                  autoComplete="off"
                />
                <label htmlFor="strExamDesc">Exam Description</label>
              </div>
            </div>
          </div>
          <div className="row m-0 p-0">
            <div className="col-md-4 m-0 p-2">
              <label htmlFor="dtmExamDate">Exam Date</label>
              <div className="form-floating">
                <DatePicker
                  minDate={new Date().setDate(new Date().getDate() + 1)}
                  className="form-control"
                  selected={dtmExamDate}
                  onChange={(date) => setExamDate(date)}
                />
              </div>
            </div>
            <div className="col-md-4 m-0 p-2">
              <label htmlFor="dtmExamDate">Exam Start Time</label>
              <div className="form-floating">
                <DatePicker
                  className="form-control"
                  selected={objExamTime.dtmStartTime}
                  onChange={(date) => fnSetExamTime("S", date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Start Time"
                  dateFormat="h:mm aa"
                  minTime={objTimeConfig.dtmMinTime}
                  maxTime={objTimeConfig.dtmMaxTime}
                />
              </div>
            </div>
            <div className="col-md-4 m-0 p-2">
              <label htmlFor="dtmExamDate">Exam End Time</label>
              <div className="form-floating">
                <DatePicker
                  className="form-control"
                  selected={objExamTime.dtmEndTime}
                  onChange={(date) => fnSetExamTime("E", date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="End Time"
                  dateFormat="h:mm aa"
                  minTime={objTimeConfig.dtmMinTime}
                  maxTime={objTimeConfig.dtmMaxTime}
                />
              </div>
            </div>
          </div>
          <div className="row m-0 p-0">
            <div className="col-md-4 m-0 p-2">
              <div className="form-floating">
                <select
                  class="form-select"
                  id="strExamSubject"
                  name="strExamSubject"
                  value={objExam.strExamSubject}
                  onChange={(e) => fnHandleOnChange(e)}
                >
                  <option selected>Select Exam Subject</option>
                  <option value="SDP">Software Design Process (SDP)</option>
                  <option value="AF">Application Framework (AF)</option>
                  <option value="DBMS">
                    Database Maganement Systems (DBMS)
                  </option>
                </select>
                <label for="strExamSubject">Select Exam Subject</label>
              </div>
            </div>
            <div className="col-md-8 m-0 p-2">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="strExamRemark"
                  name="strExamRemark"
                  value={objExam.strExamRemark}
                  onChange={(e) => fnHandleOnChange(e)}
                  autoComplete="off"
                />
                <label htmlFor="strExamRemark">Exam Remark</label>
              </div>
            </div>
          </div>
          <div className="row m-0 p-0">
            <label>Select Students For Exam</label>
            <div className="col-md-12 m-0 p-2">
              <Select
                isMulti
                value={objExam.arrStudents}
                name="colors"
                options={arrStudent}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select Students . . ."
                onChange={(value) => fnSelectStudent(value)}
              />
            </div>
          </div>
          <div className="row m-0 p-0 mt-1 ms-2">
            <div className="col-md-2 m-0 p-0 d-grid">
              <button
                className="btn btn-success fw-bold"
                onClick={() => fnSave()}
              >
                {strFormState === "Add" ? "Save Exam" : "Update Exam"}
              </button>
            </div>
            {strFormState === "Inq" && (
              <div
                className="col-md-2 m-0 p-0 d-grid ms-2"
                onClick={() => fnDelete()}
              >
                <button className="btn btn-danger fw-bold">Delete Exam</button>
              </div>
            )}
            <div className="col-md-2 m-0 p-0 d-grid ms-2">
              <button
                className="btn btn-secondary fw-bold"
                onClick={() => fnClear()}
              >
                Clear Exam
              </button>
            </div>
          </div>
          <div className="row m-0 p-0 col-md-12">
            <div className="col-md-12 m-0">
              <GridFunctions
                title="Exam Details"
                columns={columns}
                dataSet={arrExamDetails}
                strHeight={"24vh"}
              />
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default ExamDetails;
