import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import axios from "axios";

import "./style.scss";

const index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  // interface for users
  interface userInterface {
    username: string;
    password: string;
  }

  const formSubmit = async (e: any) => {
    e.preventDefault();

    const userData: userInterface = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    try {
      const res = await axios.post(
        "http://45.138.158.252:3000/auth/login",
        userData
      );
      //  console.log(res);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="refister-wrapp w-full h-[100vh] flex items-center justify-center ">
      <div className=" max-w-[700px] w-full border rounded-3xl bg-transparent py-7 px-5 flex flex-col items-center justify-center">
        <h1 className="text-[24px] text-white mb-3">Foorm Login</h1>
        <form
          onSubmit={formSubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="text"
            placeholder="Username"
            className=" w-[90%] mb-5 py-2 px-4 bg-transparent border  outline-none text-white text-[20px] placeholder:text-white rounded-lg focus:border-yellow-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-[90%] mb-5 py-2 px-4 bg-transparent border  outline-none text-white text-[20px] placeholder:text-white rounded-lg focus:border-yellow-700"
            required
          />
          <button className="w-[90%] bg-white rounded-lg py-2 px-3 text-[18px] text-cyan-600 hover:bg-slate-300 active:bg-white hover:text-white duration-300 active:text-cyan-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default index;
