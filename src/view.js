import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { client, groupBy } from "./client";
import { state } from "./state";

const DataComponent = () => {
  const [loading, setLoading] = useState(false);
  const mystyle = {
    color: "black",
    // backgroundColor: "DodgerBlue"
    padding: "10px",
    fontFamily: "Arial",
    display: "flex",
    flexDirection: "column",

    width: "80vw",
    justifyContent: "center",
  };
  const mystyle1 = {
    display: "flex",
    flexDirection: "column",
    width: "65%",
  };

  const snap = useSnapshot(state);
  console.log("snap ===>", snap);
  const fetchAll = (e) => {
    e.preventDefault();
    client
      .query({
        query: gql`
          query allTransactions {
            allTransactions {
              id
              type
              status
              createdAt
              img
              name
            }
          }
        `,
        variables: {},
      })
      .then((result) => {
        const { loading } = result;
        setLoading(loading);
        state.todos = groupBy(result?.data?.allTransactions, "createdAt");
        return state?.todos;
      });
  };
  const filterByStatus = (e) => {
    setLoading(!loading);
    let filte = e.targer.value;
    client
      .query({
        query: gql`
          query allTransactions($status: String) {
            allTransactions(filter: { status: $status }) {
              id
              type
              status
              createdAt
              img
              name
            }
          }
        `,
        variables: { status: filte },
      })
      .then((result) => {
        const { loading } = result;
        setLoading(loading);
        state.todos = groupBy(result?.data?.allTransactions, "createdAt");

        return state?.todos;
      });
  };
  const filterByType = (e) => {
    setLoading(!loading);

    let filte = e.target.value;
    client
      .query({
        query: gql`
          query allTransactions($type: String) {
            allTransactions(filter: { type: $type }) {
              id
              type
              status
              createdAt
              img
              name
            }
          }
        `,
        variables: { type: filte },
      })
      .then((result) => {
        const { loading } = result;
        setLoading(loading);
        console.log(result);
        state.todos = groupBy(result?.data?.allTransactions, "createdAt");

        return state?.todos;
      });
  };
  const filterBySender = (e) => {
    setLoading(!loading);

    let filte = e.target.value;
    client
      .query({
        query: gql`
          query allTransactions($q: String) {
            allTransactions(filter: { q: $q }) {
              id
              type
              status
              createdAt
              img
              name
            }
          }
        `,
        variables: { q: filte },
      })
      .then((result) => {
        const { loading } = result;
        setLoading(loading);
        console.log(result);
        state.todos = groupBy(result?.data?.allTransactions, "createdAt");

        return state?.todos;
      });
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section style={{ width: "75vw" }}>
        <form onSubmit={console.log}>
          <label>
            <input
              type="text"
              onChange={(e) => filterBySender(e)}
              style={{
                width: "75vw",
                height: "2.5rem",
                borderRadius: "0.5rem",
                padding: "0 2rem",
              }}
              placeholder={"Search Transaction By Sender"}
            />
          </label>

          <section
            className="filter"
            style={{ width: "75vw", padding: "1rem" }}
          >
            <select
              style={{
                width: "17vw",
                height: "2.5rem",
                borderRadius: "0.5rem",
                padding: "0 0.3rem",
              }}
              onChange={(e) => {
                filterByStatus(e);
              }}
              className="custom-select"
              aria-label="filter by status"
            >
              <option value="" disabled>
                Select from options
              </option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
            <span className="focus"></span>

            <select
              style={{
                width: "17vw",
                height: "2.5rem",
                borderRadius: "0.5rem",
                padding: "0 0.3rem",
                margin: "0 0.5rem",
              }}
              onChange={(e) => filterByType(e)}
              className="custom-select"
              aria-label="filter by type"
            >
              <option value="" disabled>
                Select from Options
              </option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <span className="focus"></span>

            <button
              style={{
                width: "17vw",
                height: "2.5rem",
                borderRadius: "0.5rem",
                padding: "0 2rem",
                margin: "0 0.5rem",
                cursor: "pointer",
                outline: "none",
                border: "none",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
              onClick={fetchAll}
            >
              {" "}
              fetch All
            </button>
          </section>
        </form>
      </section>
      {loading && <h4>loading....</h4>}
      {!loading && (
        <section style={mystyle}>
          <section style={{}}>
            {Object.keys(snap?.todos).map((key) => {
              return (
                <div key={key} style={{ padding: "2rem" }}>
                  {/* {console.log(snap[key])} */}
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <span
                      style={{
                        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                        padding: "1rem",
                        borderRadius: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      {key}
                    </span>
                  </div>
                  {snap?.todos[key].map((sk) => {
                    return (
                      <section
                        style={{
                          display: "flex",
                          width: "75vw",
                          margin: "1rem 0",
                          cursor: "pointer",
                        }}
                        key={sk?.id}
                      >
                        <section>
                          <img
                            style={{ width: "250px", height: "150px" }}
                            src={sk?.img}
                            alt=""
                          />
                        </section>
                        <section
                          style={{
                            border: "1px dashed black",
                            width: "85vw",
                            height: "150px",
                            marginLeft: "1rem",
                            borderRadius: " 0.5rem",
                            textAlign: "left",
                            paddingLeft: "1rem",
                            paddingBottom: "0.3rem",
                          }}
                        >
                          <h5>
                            {"Transaction Sender:"} {sk?.name}
                          </h5>
                          <h5>
                            {"Transaction Status:"} {sk?.status.toUpperCase()}
                          </h5>
                          <h5>
                            {"Transaction Type:"} {sk?.type.toUpperCase()}
                          </h5>
                          <h5>
                            {"Transaction Date:"} {sk?.createdAt.toUpperCase()}
                          </h5>
                        </section>
                      </section>
                    );
                  })}
                </div>
              );
            })}
          </section>
        </section>
      )}
    </div>
  );
};
const View = () => {
  return (
    <div>
      <h2>View</h2>

      <DataComponent />
    </div>
  );
};

export default View;
