import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NumberFormat from 'react-number-format';
import GridFunctions from "../Common/Grid/GridFunctions";
import SiteLoading from "../Common/siteloading/SiteLoading";

import { GetApiCaller, PostApiCaller } from "../../services/ApiCaller";

const MarkDetails = () => {
    const [isLoad, setLoad] = useState(false);
    const [arrExamDetails, setExamDetails] = useState([]);
    const [arrMarkDetails, setMarkDetails] = useState([]);
    const [strSelectExamCode, setSelectExamCode] = useState("");
    const [objSelectExam, setObjExam] = useState({
        strExamCode: '',
        strExamDesc: '',
        strExamSubject: '',
        strExamRemark: '',
        arrStudents: []
    });
    const [intStudentIndex, setStudentIndex] = useState(0);
    const [intMarks, setMarks] = useState(0);

    const columns = [
        {
            name: "Exam Code",
            selector: "strExamCode",
            sortable: true,
        },
        {
            name: "Exam Subject",
            selector: "strExamSubject",
        },
        {
            name: "Student Code",
            selector: "strStudentCode",
        },
        {
            name: "Student Name",
            selector: "strStudentName",
        },
        {
            name: "Marks",
            selector: "intMarks",
        }
    ];

    useEffect(() => {
        fetchExamData();
    }, []);

    const fetchExamData = async () => {
        setLoad(true);
        const resExam = await GetApiCaller("exam/GetExamsForMarks");
        setLoad(false);
        if(resExam.booStatus) {
            setExamDetails(resExam.objResponse);
        }
        else {
            showValidationError(false, resExam.objResponse);
        }
    }

    const showValidationError = (booSucess, msg) => {
        return Swal.fire({
            icon: booSucess ? "success" : "error",
            title: booSucess ? msg : "Something wrong in exam form!",
            text: !booSucess ? msg : "",
        });
    };

    const fnEnterMarks = () => {
        if(isNaN(intMarks)) {
            showValidationError(false, "Marks should be number!");
        }
        else if(intMarks === 0) {
            showValidationError(false, "Marks cannot be zero!");
        } else {
            objSelectExam.arrStudents[intStudentIndex].intMarks = intMarks;
            arrMarkDetails.push({ 
                strExamCode: objSelectExam.strExamCode, 
                strExamSubject: objSelectExam.strExamSubject,
                strStudentCode: objSelectExam.arrStudents[intStudentIndex].strStudentCode,
                strStudentName: objSelectExam.arrStudents[intStudentIndex].strStudentName,
                intMarks: intMarks
            });
            setMarks(0);
            if(objSelectExam.arrStudents.length -1 !== intStudentIndex) {
                setStudentIndex(intStudentIndex + 1);
            }
        }
    }

    const fnSave = async () => {
        if(strSelectExamCode === "") {
            showValidationError(false, "Please select exam!");
        }
        else if(objSelectExam.arrStudents.filter((obj) => obj.intMarks === 0).length > 0) {
            showValidationError(false, "Please enter marks for all students!");
        } else {
            const saveObj = {
                strExamCode: strSelectExamCode,
                arrMarkDetails: arrMarkDetails
            }

            setLoad(true);
            const resSave = await PostApiCaller('exam/MarksUpdate', saveObj);
            setLoad(false);
            if(resSave.booStatus) {
                showValidationError(true, resSave.objResponse);
                fnClear();
            }
            else {
                showValidationError(false, resSave.objResponse);
            }
        }
    }

    const fnSelectExam = (e) => {
        setSelectExamCode(e.target.value);
        setObjExam(arrExamDetails.filter((obj) => obj.strExamCode === e.target.value)[0]);
    }

    const fnClear = () => {
        setObjExam({
            strExamCode: '',
            strExamDesc: '',
            strExamSubject: '',
            strExamRemark: '',
            arrStudents: []
        });
        setMarkDetails([]);
        setSelectExamCode("");
        setStudentIndex(0);
        setMarks(0);
        fetchExamData();
    }

    return (
        <fieldset className="form-group mt-3 me-4">
            {isLoad && <SiteLoading />}
            <div className="row m-0 p-0">
                <div className="col-md-6 m-0 p-2">
                    <div className="form-floating">
                        <select class="form-select" id="strSelectExam" name="strSelectExam" value={strSelectExamCode} onChange={(e) => fnSelectExam(e)} disabled={strSelectExamCode ? true : false}>
                            <option selected>Select Exam</option>
                            {
                                arrExamDetails.map((objExam) => {
                                    return <option value={objExam.strExamCode}>{ objExam.strExamCode + " - " + objExam.strExamDesc }</option>
                                })
                            }
                        </select>
                        <label for="strExam">Select Exam For Enter Marks</label>
                    </div>
                </div>
            </div>
            <div className="row m-0 p-0">
                <div className="col-md-4 m-0 p-2">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="strExamSubject" name="strExamSubject" disabled value={objSelectExam.strExamSubject}/>
                        <label htmlFor="strExamSubject">Exam Subject</label>
                    </div>
                </div>
                <div className="col-md-8 m-0 p-2">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="strExamRemark" name="strExamRemark" disabled value={objSelectExam.strExamDesc}/>
                        <label htmlFor="strExamRemark">Exam Remark</label>
                    </div>
                </div>
            </div>
            {
                ( strSelectExamCode && (objSelectExam.arrStudents.filter((obj) => obj.intMarks !== 0).length !== objSelectExam.arrStudents.length)) &&
                <div className="row m-0 p-0 justify-content-center">
                    <div className="col-md-5 m-0 p-2">
                        <div className="card bg-light">
                            <div className="card-body d-grid">
                                <div className="row m-0 p-0">
                                    <div className="col-md-8 m-0 p-0">
                                        <h5 className="card-title">{ objSelectExam.arrStudents[intStudentIndex].strStudentName }</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{ objSelectExam.arrStudents[intStudentIndex].strStudentCode }</h6>
                                    </div>
                                    <div className="col-md-4 m-0 p-0">
                                        <h6 className="card-subtitle mt-1 mb-2 text-muted float-end">
                                            { objSelectExam.arrStudents.filter((obj) => obj.intMarks !== 0).length  + "/" + objSelectExam.arrStudents.length + " Completed" }
                                        </h6>
                                    </div>
                                </div>
                                <div className="row m-0 p-0">
                                    <div className="col-md-12 m-0 p-0">
                                        <h5 className="card-subtitle mb-2 text-muted text-center">Enter Marks</h5>
                                    </div>
                                </div>
                                <div className="row m-0 p-0 justify-content-center">
                                    <div className="col-md-4 m-0 p-0">
                                        <NumberFormat
                                            autoFocus
                                            onFocus={(e) => e.target.select()}
                                            value={intMarks}
                                            className="form-control text-center"
                                            allowEmptyFormatting={false}
                                            decimalScale={0}
                                            allowLeadingZeros={false}
                                            allowNegative={false}
                                            maxLength={3}
                                            onValueChange={(values) => {
                                                const { value } = values;
                                                if(parseInt(value) > 100) setMarks(100);
                                                else setMarks(parseInt(value));
                                            }}
                                            onKeyPress={(e) => {
                                                if(e.key === 'Enter') fnEnterMarks()
                                            }}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary fw-bold p-2 mt-3" onClick={() => fnEnterMarks()}>
                                    Add Mark & Continue
                                    <i className="fas fa-chevron-circle-right ps-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="row m-0 p-0 mt-1 ms-2">
                <div className="col-md-2 m-0 p-0 d-grid">
                    <button className="btn btn-success fw-bold" onClick={() => fnSave()}>Save Exam</button>
                </div>
                <div className="col-md-2 m-0 p-0 d-grid ms-2">
                    <button className="btn btn-secondary fw-bold" onClick={() => fnClear()}>Clear Exam</button>
                </div>
            </div>
            <div className="row m-0 p-0 col-md-12">
                <div className="col-md-12 m-0 p-2">
                    <GridFunctions title="Mark Details" columns={columns} dataSet={arrMarkDetails} strHeight={"172px"}/>
                </div>
            </div>
        </fieldset>
    )
}

export default MarkDetails