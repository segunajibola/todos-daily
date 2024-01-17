import React from "react";
import { FaRegHeart } from "react-icons/fa6";

const Footer: () => React.JSX.Element = () => {
  return (
    <div className="py-4 bg-gray-800 text-white p-5">
      <span className="text-xl py-10">Quick links</span>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <a href="">Contribute</a>
          <a href="">Fix a bug</a>
          <a href="">Suggest a feature</a>
        </div>
      </div>
      <p className="text-center my-3">
        Made with <FaRegHeart size={20} className="inline-block text-red-500" />{" "}
        by
        <a href="https://segunajibola.com"> Segun Ajibola</a>
      </p>
    </div>
  );
};

export default Footer;
