import Button from "./Button";
import PropTypes from "prop-types";
import { differentTime } from "../utils/differentTime";

// Function to format postedOn date
const timeFormat = (postedOn) => {
  const currentTime = new Date().getTime();
  const postedTime = new Date(postedOn).getTime();
  const difference = currentTime - postedTime;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (days === 0) {
    return "Today";
  } else if (days === 1) {
    return "1 day ago";
  } else {
    return `${days} days ago`;
  }
};

// Define Card component with item prop
const Card = ({ item }) => {
  // Format posted_on date
  const timeFormated = timeFormat(item.posted_on);
  return (
    <div
      className="flex sm:flex-row flex-col mb-8 rounded-xl md:px-10 sm:px-5 p-5 items-center md:h-[150px] sm:h-[200px] h-auto justify-between shadow-xl bg-white"
      style={{
        // Add green border if posted_on date is within the last 6 days
        borderLeft:
          differentTime(item.posted_on) <= 6 ? "10px solid green" : "",
      }}
    >
      <div className="flex sm:flex-row flex-col items-center">
        <img
          className="rounded-full object-cover sm:w-[100px] sm:h-[100px] w-[70px] h-[70px]"
          src={item.company_logo}
          alt="company logo"
          
        />

        <div className="flex flex-col justify-center sm:items-start items-center sm:ml-5 sm:mt-0 mt-5">
          <div className="flex justify-center items-center">
            <div className="font-poppins font-semibold text-blue-600 text-[18px]">
              {item.company}
            </div>
            {/* Show New and featured buttons if posted_on date is within the last 10 or 7 days */}
            {differentTime(item.posted_on) <= 10 ? (
              <div className="flex">
                <Button
                  styles="bg-blue-400 text-white rounded-full ml-5 px-3"
                  text="New"
                />
                {differentTime(item.posted_on) <= 7 ? (
                  <div>
                    <Button
                      styles="bg-black text-white rounded-full ml-5 px-3"
                      text="featured"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <h2 className="font-poppins font-semibold text-[20px] my-2">
            {item.position}
          </h2>
          <div className="flex flex-row">
            {/* Show formatted posted_on date, timing, and location */}
            <p className="font-poppins text-gray-600 flex sm:mb-0 mb-2 text-[14px]">
              {timeFormated} <span className="mx-2">-</span> {item.timing}{" "}
              <span className="mx-2">-</span> {item.location}
            </p>
          </div>
        </div>
      </div>
      {/* Show keyword buttons */}
      <div className="flex flex-wrap sm:justify-end md:justify-start justify-center">
        {item.keywords.map((keyword, index) => {
          return (
            <Button
              key={index}
              styles="bg-green-100 rounded-[10px] text-green-900 px-4 mx-2 hover:text-white hover:bg-green-900 sm:m-2 m-2"
              text={keyword}
            />
          );
        })}
      </div>
    </div>
  );
};

// Define propTypes for Card component
Card.propTypes = {
  item: PropTypes.shape({
    company_logo: PropTypes.string,
    company: PropTypes.string,
    posted_on: PropTypes.number,
    position: PropTypes.string,
    timing: PropTypes.string,
    location: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Card;
