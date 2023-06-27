import Button from "./Button";
import PropTypes from "prop-types";
import { differentTime } from "../utils/differentTime";

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

const Card = ({ item }) => {
  const timeFormated = timeFormat(item.posted_on);
  return (
    <div
      className="flex flex-row mb-8 rounded-xl px-10 items-center h-[150px] justify-between shadow-xl bg-white"
      style={{
        borderLeft:
          differentTime(item.posted_on) <= 6 ? "10px solid green" : "",
      }}
    >
      <div className="flex flex-row">
        <img
          className="rounded-full object-cover"
          src={item.company_logo}
          alt="company logo"
          style={{
            width: "100px",
            height: "100px",
          }}
        />

        <div className="flex flex-col justify-center items-start ml-5">
          <div className="flex justify-center items-center">
            <div className="font-poppins font-semibold text-blue-600 text-[18px]">
              {item.company}
            </div>
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
            <p className="font-poppins text-gray-600 flex ">
              {timeFormated} <span className="mx-4">-</span> {item.timing}{" "}
              <span className="mx-4">-</span> {item.location}
            </p>
          </div>
        </div>
      </div>
      <div className="">
        {item.keywords.map((keyword, index) => {
          return (
            <Button
              key={index}
              styles="bg-green-100 rounded-[10px] text-green-900 px-4 mx-2 hover:text-white hover:bg-green-900"
              text={keyword}
            />
          );
        })}
      </div>
    </div>
  );
};

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
