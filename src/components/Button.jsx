import PropTypes from "prop-types";

const Button = ({ styles, text }) => {
  return (
    <button
      type={`button`}
      className={`px-2 py-1 font-poppins font-medium text-[16px] outline-none ${styles}`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  styles: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
