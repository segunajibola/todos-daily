import React from "react";
import { FaRegHeart, FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer: () => React.JSX.Element = () => {
  return (
    <div className="py-4 bg-gray-800 text-white p-5">
      <p className="text-2xl pb-5">Quick links</p>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <a href="https://github.com/segunajibola/todos-daily/pulls">Contribute</a>
          <a href="https://github.com/segunajibola/todos-daily/issues">Fix a bug</a>
          <a href="https://github.com/segunajibola/todos-daily/issues/">
            Suggest a feature
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="my-3">
          Made with{" "}
          <FaRegHeart size={20} className="inline-block text-red-500" /> {""}
          by {""}
          <a href="https://segunajibola.com">Segun Ajibola</a>
        </p>
        <div className="flex gap-x-3">
          <a href=""><FaLinkedin /></a>
          <a href=""><FaXTwitter /></a>
          <a href=""><FaGithub /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
