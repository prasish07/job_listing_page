import Button from "./Button";
import close from "../assets/close.svg";
import PropTypes from "prop-types";

// Define SelectedKeywordsBox component with selectedKeywords, handleRemoveKeyword, and handleClearKeyword props
const SelectedKeywordsBox = ({
  selectedKeywords,
  handleRemoveKeyword,
  handleClearKeyword,
}) => {
  return (
    <div className="flex items-center w-[85%] ml-[100px] absolute right-[130px] bg-white h-[60px] px-10 py-5 rounded-xl shadow-2xl">
      <div className="w-full flex flex-wrap flex-row">
        {/* Show selected keywords with remove button */}
        {selectedKeywords.map((keyword, index) => (
          <a className="flex mx-3" key={index}>
            <Button styles="bg-green-100 text-green-950 px-4" text={keyword} />
            <div
              className="flex justify-center bg-green-200 w-[40px] cursor-pointer hover:bg-green-900"
              onClick={() => handleRemoveKeyword(keyword)}
            >
              <img src={close} alt="" className="w-[17px]" />
            </div>
          </a>
        ))}
      </div>
      {/* Show Clear button */}
      <div
        className="flex justify-center  w-[40px] cursor-pointer"
        onClick={handleClearKeyword}
      >
        <span className="text-red-700 font-poppins font-semibold text-[18px] hover:text-black">
          Clear
        </span>
      </div>
    </div>
  );
};

// Define propTypes for SelectedKeywordsBox component
SelectedKeywordsBox.propTypes = {
  selectedKeywords: PropTypes.array,
  handleRemoveKeyword: PropTypes.func,
  handleClearKeyword: PropTypes.func,
};

export default SelectedKeywordsBox;
