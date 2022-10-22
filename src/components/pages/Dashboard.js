import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import commentsList from "../common/Static";
import Pagination from "../common/Pagination";
import Header from "../common/Header";

const Dashboard = () => {
  const [listData, setListData] = useState(commentsList);
  const [currentPage, setCurrentPage] = useState(1);
  const [listDataPerPage, setListDataPerPage] = useState(5);
  const indexOfLastListData = currentPage * listDataPerPage;
  const indexOfFirstListData = indexOfLastListData - listDataPerPage;
  const [currentLists, setCurrentLists] = useState(
    listData.slice(indexOfFirstListData, indexOfLastListData)
  );

  useEffect(() => {
    setCurrentLists(listData.slice(indexOfFirstListData, indexOfLastListData));
  }, [listDataPerPage, currentPage]);

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
      <TableContainer>
        <TableHeader>
          <TableRow>
            <TableHeadRow>S.No</TableHeadRow>
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

const TableHeader = Styled("thead")``;
const TableRow = Styled("tr")``;
const TableHeadRow = Styled("th")`
    padding:20px 5px;
    background: rgba(20, 150, 100, 0.16);
    font-size: 20px;
    letter-spacing: 1px;`;
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
