import React, { useState , useEffect} from "react";
import Styled from "styled-components";
import commentsList from "../common/Static";
import { Input, Select } from "@chakra-ui/react";
import Pagination from "../common/Pagination";

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
  }, [listDataPerPage , currentPage]);

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <Title>Pagination</Title>
        <Input
          variant="outline"
          placeholder="Search"
          size="md"
          focusBorderColor="gray"
          onChange={(e) => {
            if (e.target.value === "") {
              setCurrentLists(
                listData.slice(indexOfFirstListData, indexOfLastListData)
              );
            } else {
              setCurrentLists(
                listData.filter((data) => data.email.includes(e.target.value))
              );
            }
          }}
        />
        <Select
          width="150px"
          onChange={(e) => {
            setListDataPerPage(e.target.value);
          }}
          focusBorderColor="gray"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </DashboardHeader>
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
padding:15px 30px;
align-items:center;
flex-direction:column;
gap:20px;
`;
const DashboardHeader = Styled("div")`
display:flex;
align-items:center;
width:100%;
gap:20px;
justify-content:space-between;
`;
const Title = Styled("h1")`
font-size:35px;
letter-spacing:2px;
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
