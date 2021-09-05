import { useState } from "react";

import examImg from "./img/exam.png";
import marksImg from "./img/marks.png";
import { useHistory } from "react-router-dom";

const Exam = () => {
  const history = useHistory();

  const fnOnClickExam = () => {
    history.push("/exam/examdetails");
  };

  const fnOnClickMarks = () => {
    history.push("/exam/markdetails");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div
              className="jumbotron jumbotron-fluid mt-4 p-4"
              style={{ backgroundColor: "#d1d1d196" }}
            >
              <div className="container">
                <h1 className="display-4">Exam Management</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-12 d-flex justify-content-center">
            <fieldset className="form-group">
              <div className="row mt-4 mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                  <div
                    className="card text-center card-finance"
                    style={{ width: "20rem" }}
                  >
                    <img
                      src={examImg}
                      alt="Fees"
                      className="card-img-top rounded mx-auto d-block"
                      style={{ width: "29vh" }}
                    />
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn_financial w-100"
                        onClick={fnOnClickExam}
                      >
                        Exam Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                  <div
                    className="card text-center card-finance"
                    style={{ width: "20rem" }}
                  >
                    <img
                      src={marksImg}
                      alt="Fees"
                      className="card-img-top rounded mx-auto d-block"
                      style={{ width: "32vh" }}
                    />
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn_financial w-100"
                        onClick={fnOnClickMarks}
                      >
                        Mark Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exam;
