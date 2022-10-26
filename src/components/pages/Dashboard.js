import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Pagination from "../common/Pagination";
import Header from "../common/Header";
import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@chakra-ui/react";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      email
      body
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listDataPerPage, setListDataPerPage] = useState(10);
  const indexOfLastListData = currentPage * listDataPerPage;
  const indexOfFirstListData = indexOfLastListData - listDataPerPage;
  const [currentLists, setCurrentLists] = useState(
    listData.slice(indexOfFirstListData, indexOfLastListData)
  );

  // console.log(
  //   "check",
  //   listData.sort((a, b) => (a.id > b.id ? 1 : -1))
  // );

  useEffect(() => {
    setCurrentLists(listData.slice(indexOfFirstListData, indexOfLastListData));
  }, [listDataPerPage, currentPage, listData]);

  useEffect(() => {
    if (data) {
      setListData(data?.users);
    }
  }, [data]);

  return (
    <DashboardWrapper>
      <Header
        setCurrentLists={setCurrentLists}
        setCurrentPage={setCurrentPage}
        setListDataPerPage={setListDataPerPage}
        indexOfFirstListData={indexOfFirstListData}
        indexOfLastListData={indexOfLastListData}
        listData={listData}
      />
      {loading ? (
        <LoadingContainer>
          <CircularProgress isIndeterminate color="green.300" />
        </LoadingContainer>
      ) : (
        <>
          <TableContainer>
            <TableHeader>
              <TableRow>
                <TableHeadRow
                  onClick={() => {
                    listData.sort((a, b) => (a.id < b.id ? 1 : -1));
                  }}
                >
                  ID
                </TableHeadRow>
                <TableHeadRow>Name</TableHeadRow>
                <TableHeadRow>Email</TableHeadRow>
                <TableHeadRow>Body</TableHeadRow>
              </TableRow>
            </TableHeader>
            {currentLists.map((data, index) => (
              <TableBody key={index}>
                <TableRow>
                  <TableBodyRow style={{ textAlign: "center" }}>
                    {data.id}.
                  </TableBodyRow>
                  <TableBodyRow>{data.name}</TableBodyRow>
                  <TableBodyRow>{data.email}</TableBodyRow>
                  <TableBodyRow>{data.body}</TableBodyRow>
                </TableRow>
              </TableBody>
            ))}
          </TableContainer>
          <Pagination
            listDataPerPage={listDataPerPage}
            listData={listData.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = Styled("div")`
display:flex;
padding:0px 30px 15px;
align-items:center;
flex-direction:column;
`;

const TableContainer = Styled("table")`
 width:100%;
 border-bottom: 1px solid lightgray;
 margin-bottom:60px;
`;

const TableHeader = Styled("thead")`    
position: sticky;
top: 82px;
`;
const TableRow = Styled("tr")``;
const TableHeadRow = Styled("th")`
    padding:20px 5px;
    background: rgb(217,238,230);
    font-size: 20px;
    letter-spacing: 1px;

    `;
const TableBody = Styled("tbody")`
`;
const TableBodyRow = Styled("td")`
   font-size:14px;
    font-weight: 400;
    padding: 10px 5px;
    text-transform: capitalize;
    color:rgb(98, 120, 146);
    border-right: 1px solid lightgray;
`;
const LoadingContainer = Styled("div")`
height:70vh;
display:flex;
align-items:center;
`;
