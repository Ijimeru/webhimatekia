import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckPassword } from "../../utils/CheckPassword";

export default function Registerpage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [passwordErrorList, setPasswordErrorList] = useState<string[] | boolean>([]);
  const [passwordConfError, setPasswordConfError] = useState(false);
  const [response, setResponse] = useState("");
  let navigate = useNavigate();
  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (CheckPassword(password!)) {
      setPasswordErrorList(CheckPassword(password!));
      return;
    }
    if (passwordConfError) {
      return;
    }
    const response = await fetch("/api/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    console.log(response);
    if (response.status == 406) setResponse("Maaf, email sudah digunakan");
    else {
      setResponse("Akun telah dibuat");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  const handleConfPass = () => {
    const password = passwordRef.current?.value;
    const passwordConf = passwordConfirmationRef.current?.value;
    if (passwordConf !== password) {
      setPasswordConfError(true);
    } else {
      setPasswordConfError(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="/static/img/logo-itera.png" alt="logo" />
          ITERA
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Registrasi akun</h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Masukkan email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Masukkan username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  ref={usernameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ijimeru"
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Masukkan password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  onChange={() => passwordConfirmationRef.current?.value !== null && "" && handleConfPass()}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
                {passwordErrorList && <ul>{Array.isArray(passwordErrorList) && passwordErrorList.map((list) => <li key={list}>{list}</li>)}</ul>}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  ref={passwordConfirmationRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={() => handleConfPass()}
                />
                <p className={`text-red-800 ${passwordConfError ? "block" : "hidden"}`}> Password tidak sesuai</p>
              </div>
              {response && <p className="text-center w-full">{response}</p>}
              <button
                type="submit"
                disabled={passwordConfError}
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                ${passwordConfError && "cursor-not-allowed"}
                `}
              >
                Buat Akun
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Sudah punya akun?
                <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Login disini
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
