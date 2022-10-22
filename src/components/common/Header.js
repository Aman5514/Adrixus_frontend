import React from "react";
import { Input, Select } from "@chakra-ui/react";
import Styled from "styled-components";

const Header = ({
  setCurrentLists,
  setCurrentPage,
  setListDataPerPage,
  indexOfFirstListData,
  indexOfLastListData,
  listData,
}) => {
  return (
    <DashboardHeader>
      <Title>Pagination</Title>
      <HeaderTools>
        <Input
          variant="outline"
          placeholder="Search email"
          size="md"
          focusBorderColor="gray"
          onChange={(e) => {
            if (e.target.value === "") {
              setCurrentLists(
                listData.slice(indexOfFirstListData, indexOfLastListData)
              );
            } else {
              setCurrentLists(
                listData.filter((data) =>
                  data.email
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }
          }}
        />
        <Select
          width="150px"
          onChange={(e) => {
            setListDataPerPage(e.target.value);
            setCurrentPage(1);
          }}
          focusBorderColor="gray"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
        <Select
          width="360px"
          placeholder="Filter by domain"
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
          focusBorderColor="gray"
        >
          <option value={".com"}>.Com</option>
          <option value={".biz"}>.Biz</option>
          <option value={".org"}>.Org</option>
          <option value={".us"}>.Us</option>
          <option value={".tv"}>.Tv</option>
        </Select>
      </HeaderTools>
    </DashboardHeader>
  );
};

export default Header;

const DashboardHeader = Styled("div")`
display:flex;
align-items:center;
width:100%;
gap:20px;
justify-content:space-between;
position: sticky;
top: 0px;
padding: 15px 0px 15px;
background: white;
`;

const Title = Styled("h1")`
font-size:35px;
letter-spacing:2px;
color:rgba(20, 150, 100, 0.4);
font-weight:bold;
`;

const HeaderTools = Styled("div")`
    display:flex;
    align-items:center;
    gap:10px;
`;
