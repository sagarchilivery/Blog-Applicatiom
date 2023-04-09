import Baselayout from "@/components/baselayout";
import { Context } from "@/utils/context";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function Auth() {
  const { state, dispatch } = useContext(Context);
  const [logInFlag, setLogInFlag] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const sendToBackend = async (e: any) => {
    e.preventDefault();
    try {
      let response;
      if (logInFlag) {
        response = await axios.post("http://localhost:4000/api/user/login", {
          email,
          password,
        });
        if (response.status === 200) {
          dispatch({ type: "USER", payload: response.data });
          router.push("/blogs");
        }
        if (response.status !== 200) {
          alert("User is not registered!");
        }
      } else {
        response = await axios.post("http://localhost:4000/api/user/signin", {
          email,
          password,
          name,
        });
        alert("Registered succesfully");
        setTimeout(() => {
          setLogInFlag(true);
        }, 1500);
      }
      // console.log(response.data);

      setEmail(""), setPassword(""), setName("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Baselayout>
      <div className="w-[500px] h-fit flex py-16 flex-col justify-start items-center bg-[#272727] shadow-2xl my-16 rounded-md">
        <div className="text-2xl">{logInFlag ? "LOGIN" : "SIGNIN"}</div>

        <form className="py-10 flex flex-col gap-8" onSubmit={sendToBackend}>
          <input
            type="text"
            name=""
            id=""
            value={logInFlag ? email : name}
            onChange={(e: any) => {
              logInFlag ? setEmail(e.target.value) : setName(e.target.value);
            }}
            className="p-2 rounded-sm w-[250px] text-black"
            placeholder={logInFlag ? "Email" : "Name"}
          />
          <input
            type="text"
            name=""
            id=""
            value={logInFlag ? password : email}
            onChange={(e: any) => {
              logInFlag
                ? setPassword(e.target.value)
                : setEmail(e.target.value);
            }}
            className="p-2 rounded-sm text-black"
            placeholder={logInFlag ? "Password" : "Email"}
          />
          {!logInFlag && (
            <input
              type="text"
              name=""
              id=""
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              className="p-2 rounded-sm text-black"
              placeholder="Password"
            />
          )}
          <input
            type="submit"
            value={logInFlag ? "Login" : "Register"}
            name=""
            id=""
            className="p-2 cursor-pointer rounded-sm text-xl flex items-center justify-center hover:text-black bg-[#29e02c9c] hover:bg-[#29e02cd3]"
          />
        </form>
        <p className="text-lg">
          {logInFlag ? (
            <>
              <span>New here? Click here to</span>
              <span
                onClick={() => {
                  setLogInFlag(!logInFlag),
                    setEmail(""),
                    setPassword(""),
                    setName("");
                }}
                className="text-green-500 hover:text-green-300 cursor-pointer px-1"
              >
                Register
              </span>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <span
                onClick={() => {
                  setLogInFlag(!logInFlag),
                    setEmail(""),
                    setPassword(""),
                    setName("");
                }}
                className="text-green-500 hover:text-green-300 cursor-pointer px-1"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </Baselayout>
  );
}
