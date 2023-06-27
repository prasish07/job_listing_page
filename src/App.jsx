import styles from "./style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "./components/Card";
import { differentTime } from "./utils/differentTime";
import FilterElement from "./components/FilterElement";
import { setSelectedKeywords } from "./State";
import SelectedKeywordsBox from "./components/SelectedKeywordBox";
import Loading from "./components/Loading";
import { useCallback } from "react";

const App = () => {
  const dispatch = useDispatch();
  const url =
    "https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json";
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [keywords, setKeywords] = useState([]);
  // Get selected keywords from Redux store
  const selectedKeywords = useSelector((state) => state.popup.selectedKeywords);

  // Function to fetch data from API
  const fetchItems = useCallback(async () => {
    const response = await axios.get(url);
    if (response.data) {
      // Sort items by posted date
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

      // Get unique keywords from all items
      const uniqueKeywords = Array.from(
        new Set(sortedItems.flatMap((item) => item.keywords))
      );
      setKeywords(uniqueKeywords);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [selectedKeywords]);
  // Fetch data on component mount and when selectedKeywords change
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Function to remove a keyword from selectedKeywords
  const handleRemoveKeyword = (keyword) => {
    dispatch(
      setSelectedKeywords(selectedKeywords.filter((item) => item !== keyword))
    );
  };

  // Function to clear all selectedKeywords
  const handleClearKeyword = () => {
    dispatch(setSelectedKeywords([]));
  };

  // Show loading component while data is being fetched
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full overflow-hidden bg-blue-50 ">
      <div className="w-full h-[100px] bg-blue-gradient" />
      <div className="flex flex-1 justify-end items-center relative">
        {/* For filter box where different selected keyword is shown */}
        {selectedKeywords == false ? (
          ""
        ) : (
          <SelectedKeywordsBox
            selectedKeywords={selectedKeywords}
            handleRemoveKeyword={handleRemoveKeyword}
            handleClearKeyword={handleClearKeyword}
          />
        )}
        {/* for filter button and its values */}
        <FilterElement keywords={keywords} />
      </div>

      {/* For the job listing cart layout */}
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
