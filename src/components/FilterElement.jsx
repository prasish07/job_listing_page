import { useDispatch, useSelector } from "react-redux";
import { togglePopup } from "../State";
import Button from "./Button";
import { setSelectedKeywords } from "../State";
import PropTypes from "prop-types";

const FilterElement = ({ keywords }) => {
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.popup.isOpen);
  const selectedKeywords = useSelector((state) => state.popup.selectedKeywords);
  return (
    <>
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
                    dispatch(setSelectedKeywords([...selectedKeywords, item]));
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
    </>
  );
};

FilterElement.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string),
};

export default FilterElement;
