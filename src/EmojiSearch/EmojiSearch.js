import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import emojiList from "../Json/data.json";
import NanoCard from "./NanoCard";

const Emojisearch = styled("div")`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  width: 100%;
  .input-container {
    display: flex;
    gap: 30px;
    width: 100%;
    justify-content: center;
  }
  .input {
    width: 70%;
    height: 30px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
  }
  .emoji-class {
    padding: 200px;
    background-color: red;
    border-radius: 50px;
    overflow: scroll;
  }
`;
const EmojiShow = styled("div")`
  /* display: flex;
  flex-direction: column;
  gap: 10px; */
  display: grid;
  grid-template-columns: repeat(10, 100px);
  grid-gap: 10px;
`;
const Input = styled("input")``;

// console.log(emojiList)
const fillterSearch = (searchValue) => {
  const newArr = [];
  emojiList.filter((element, index) => {
    element?.keywords?.split(" ")?.forEach((str) => {
      if (str.startsWith(searchValue)) newArr.push(element);
    });
  });
  console.log(newArr);
  return newArr;
};

const delay = 400;
const EmojiSearch = (props) => {

   const [searchVal, setSearchVal] = useState("");
   const [emoji, setEmoji] = useState("");
   const [fillterArr, setFilterArr] = useState([]);


  const debounce = (func, interval) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, interval);
    };
  };
  
  const onChangeMethod2 = useCallback((val)=>{
    setSearchVal(val);
    setFilterArr(fillterSearch(val.toLowerCase()));
  },[setFilterArr,setSearchVal])

  const onChange = debounce((e) => {
    onChangeMethod2(e.target.value);
  }, delay);

  console.log("render the componets");
 
  useEffect(()=>{
    setFilterArr(emojiList)
  },[])
  return (
    <Emojisearch>
      <div className="input-container">
        <input className="input" onChange={onChange} />
      </div>
      <EmojiShow>
        {fillterArr?.map((e, i) => {
          return <NanoCard emojiSign={e.symbol} />;
        })}
      </EmojiShow>
    </Emojisearch>
  );
};

export default EmojiSearch;
