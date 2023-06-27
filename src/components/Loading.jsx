// To display loading animation
const Loading = () => {
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
};

export default Loading;
