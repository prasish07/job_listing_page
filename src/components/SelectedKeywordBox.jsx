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
    <div className="flex items-center md:w-[85%] sm:w-[80%] w-[65%] sm:ml-[100px] absolute sm:right-[130px] right-[110px] bg-white sm:h-[60px] h-auto sm:px-10 px-3 sm:py-5 py-3 rounded-xl shadow-2xl">
      <div className="w-full flex flex-wrap flex-row">
        {/* Show selected keywords with remove button */}
        {selectedKeywords.map((keyword, index) => (
          <a className={`flex mx-3 sm:mb-0 ${selectedKeywords.length===1?'mb-0':'mb-2'}`} key={index}>
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
