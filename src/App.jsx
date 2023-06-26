import styles from "./style";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import { differentTime } from "./components/Card";
import Button from "./components/Button";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup } from "./State";
import close from "./assets/close.svg";

const App = () => {
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.popup.isOpen);
  const url =
    "https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json";
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get(url);
    if (response.data) {
      const sortedItems = response.data.sort((a, b) => {
        const timeA = differentTime(a.posted_on);
        const timeB = differentTime(b.posted_on);
        return timeA - timeB;
      });
      // Filter items based on selectedKeywords
      const filteredItems = sortedItems.filter((item) =>
        selectedKeywords.every((keyword) => item.keywords.includes(keyword))
      );
      setItems(filteredItems);

      const uniqueKeywords = Array.from(
        new Set(sortedItems.flatMap((item) => item.keywords))
      );
      setKeywords(uniqueKeywords);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchItems();
  }, [selectedKeywords]);

  console.log("filterd Item", items);
  const handleRemoveKeyword = (keyword) => {
    setSelectedKeywords(selectedKeywords.filter((item) => item !== keyword));
  };

  const handleClearKeyword = () => {
    setSelectedKeywords([]);
  };

  if (isLoading) {
    console.log("loading");
    return (
      <div className="flex w-[100%] h-[100vh] justify-center items-center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full overflow-hidden bg-blue-50 ">
      <div className="w-full h-[100px] bg-blue-gradient" />
      <div className="flex flex-1 justify-end items-center relative">
        {selectedKeywords == false ? (
          ""
        ) : (
          <div className="flex items-center w-[85%] ml-[100px] absolute right-[130px] bg-white h-[60px] px-10 py-5 rounded-xl shadow-2xl ">
            <div className="w-full flex flex-wrap flex-row">
              {selectedKeywords.map((keyword, index) => {
                return (
                  <a className="flex mx-3" key={index}>
                    <Button
                      styles="bg-green-100 text-green-950 px-4"
                      text={keyword}
                    />
                    <div
                      className="flex justify-center bg-green-200 w-[40px] cursor-pointer hover:bg-green-900"
                      onClick={() => {
                        handleRemoveKeyword(keyword);
                      }}
                    >
                      <img src={close} alt="" className="w-[17px]" />
                    </div>
                  </a>
                );
              })}
            </div>
            <div
              className="flex justify-center  w-[40px] cursor-pointer"
              onClick={() => {
                handleClearKeyword();
              }}
            >
              <span className="text-red-700 font-poppins font-semibold text-[18px] hover:text-black">
                Clear
              </span>
            </div>
          </div>
        )}
        <a
          onClick={() => dispatch(togglePopup())}
          className="mt-2 mr-2 absolute "
        >
          <Button
            styles="bg-black text-white rounded-full px-5 text-[20px] mt-[-10px] hover:bg-gray-700"
            text="Filter"
          />
        </a>

        <div
          className={`${
            popup ? "flex" : "hidden"
          } p-6 bg-white absolute top-10 right-0 mx-4 my-2 max-w-[500px] rounded-xl sidebar shadow-2xl`}
        >
          <ul className="list-none flex flex-wrap justify-center items-center flex-1">
            {keywords.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    if (!selectedKeywords.includes(item)) {
                      setSelectedKeywords([...selectedKeywords, item]);
                    }
                  }}
                >
                  <Button
                    styles="bg-black rounded-[10px] text-white px-4 m-2"
                    text={item}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={`${styles.paddingX} items-center min-h-[100vh] mt-[80px]`}
      >
        <div className={`mt-[50px]`}>
          {items.map((item, index) => {
            return <Card key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
