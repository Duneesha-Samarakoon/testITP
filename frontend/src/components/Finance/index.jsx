import React, { useState } from "react";
import "./Financial.css";
import feesImg from "./img/fees.png";
import eventsImg from "./img/events.png";
import expencesImg from "./img/expences.png";
import reportImg from "./img/report.png";
import { useHistory } from "react-router-dom";
import printJS from "print-js";
import { PostApiCaller } from "../../services/ApiCaller";
import Swal from "sweetalert2";
import SiteLoading from "../Common/siteloading/SiteLoading";

const Financial = () => {
  const history = useHistory();
  const [isLoad, setLoad] = useState(false);

  const fnOnClickFees = () => {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Under constructions",
    });
  };
  const fnOnClickEvents = () => {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Under constructions",
    });
  };
  const fnOnClickExpences = () => {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Under constructions",
    });
  };
  const fnOnClickReports = async () => {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Under constructions",
    });
  };
  return (
    <>
      {isLoad && <SiteLoading />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div
              className="jumbotron jumbotron-fluid mt-4 p-4"
              style={{ backgroundColor: "#d1d1d196" }}
            >
              <div className="container">
                <h1 className="display-4">Financial Management</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 ">
            <fieldset className="form-group">
              <div className="row mt-4 mb-4">
                <div className="col-md-3 d-flex justify-content-center">
                  <div
                    className="card text-center card-finance"
                    style={{ width: "20rem" }}
                  >
                    <img
                      src={feesImg}
                      alt="Fees"
                      className="card-img-top rounded mx-auto d-block"
                      style={{ width: "35vh" }}
                    />
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn_financial w-100"
                        onClick={fnOnClickFees}
                      >
                        Facilitating Fees
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center">
                  <div
                    className="card text-center card-finance"
                    style={{ width: "20rem" }}
                  >
                    <img
                      src={eventsImg}
                      alt="Fees"
                      className="card-img-top rounded mx-auto d-block"
                      style={{ width: "29vh" }}
                    />
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn_financial w-100"
                        onClick={fnOnClickEvents}
                      >
                        Events
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center">
                  <div
                    className="card text-center card-finance"
                    style={{ width: "20rem" }}
                  >
                    <img
                      src={expencesImg}
                      alt="Fees"
                      className="card-img-top rounded mx-auto d-block"
                      style={{ width: "32vh" }}
                    />
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn_financial w-100"
                        onClick={fnOnClickExpences}
                      >
                        Expences
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex justify-content-center">
                  <div
                    className="card text-center card-finance"
                    style={{ width: "20rem" }}
                  >
                    <img
                      src={reportImg}
                      alt="Fees"
                      className="card-img-top rounded mx-auto d-block"
                      style={{ width: "32vh" }}
                    />
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn_financial w-100"
                        onClick={fnOnClickReports}
                      >
                        Finance Reports
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

export default Financial;
