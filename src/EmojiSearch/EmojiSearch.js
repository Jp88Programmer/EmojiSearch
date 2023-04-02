import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import emojiList from "../Json/data.json";
import NanoCard from "./NanoCard";
console.log(emojiList.length);
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
  .not-found {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 100px 0px;
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

const fillterSearch = (searchValue) => {
  const newArr = [];
  const searchArr = searchValue?.split(" ");
  let searchlength = searchArr.length;
  emojiList.forEach((element, index) => {
    let responseLength = 0;
    let removeDuplicates = [...new Set(element.keywords.trim().split(" "))];
    searchArr.forEach((searchvalue) => {
      removeDuplicates.forEach((keyword) => {
        if (keyword.indexOf(searchvalue) >= 0) {
          responseLength++;
        }
      });
    });

    if (searchlength <= responseLength) {
      newArr.push(element);
    }
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

  const onChangeMethod2 = useCallback(
    (val) => {
      setSearchVal(val);
      setFilterArr(fillterSearch(val.toLowerCase()));
    },
    [setFilterArr, setSearchVal]
  );

  const onChange = debounce((e) => {
    onChangeMethod2(e.target.value);
  }, delay);

  return (
    <Emojisearch>
      <div className="input-container">
        <input className="input" onChange={onChange} />
      </div>
      {searchVal === "" ? (
        <div className="not-found">
          <h2>Type keyword</h2>
        </div>
      ) : (
        <EmojiShow>
          {fillterArr?.map((e, i) => {
            return <NanoCard emojiSign={e.symbol} />;
          })}
        </EmojiShow>
      )}
      {fillterArr.length === 0 && searchVal !== "" && (
        <div className="not-found">
          <h2>No Emoji Found</h2>
        </div>
      )}
    </Emojisearch>
  );
};

export default EmojiSearch;
