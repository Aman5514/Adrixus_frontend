import React from "react";
import Styled from "styled-components";
const Pagination = ({
  listDataPerPage,
  listData,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listData / listDataPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <PaginationWrapper>
      {pageNumbers.map((data, index) => (
        <PaginationKeys
          key={index}
          style={{
            background: currentPage === data && "teal",
            color: currentPage === data && "white",
          }}
          onClick={() => {
            setCurrentPage(data);
          }}
        >
          {data}
        </PaginationKeys>
      ))}
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = Styled("div")`
display:flex;
width:100%; 
justify-content:center;
align-items:center;
gap:5px;
position:fixed;
bottom:0px;
height:60px;
background: white;
`;

const PaginationKeys = Styled("span")`
padding: 5px 15px;
background: rgb(217,238,230);
border-radius:6px;
cursor: pointer;
`;
