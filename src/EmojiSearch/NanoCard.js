import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";

const NanoCardContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  font-size: 39px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  background-color: #f4f4f4;
`;
const NanoCard = (props) => {
  return <NanoCardContainer>{parse(props.emojiSign)}</NanoCardContainer>;
};

export default NanoCard;
