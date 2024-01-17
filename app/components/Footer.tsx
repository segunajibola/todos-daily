import React from "react";
import { FaRegHeart } from "react-icons/fa6";

const Footer: () => React.JSX.Element = () => {
  return (
    <div className="my-4 text-center bg-gray-800 text-white p-5">
      <p>
        Made with <FaRegHeart size={20} className="inline-block text-red-500" /> by
        <a href="https://segunajibola.com"> Segun Ajibola</a>
      </p>
    </div>
  );
};

export default Footer;
