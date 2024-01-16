import React from "react";
import { Oval } from "react-loader-spinner";

const Loading: () => React.JSX.Element = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <p className="my-10">Loading... please wait.</p>
      <div>
        <Oval
          visible={true}
          height="100"
          width="100"
          color="gray"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass="text-white h-[100px] w-[100px]"
        />
      </div>
    </div>
  );
};

export default Loading;
