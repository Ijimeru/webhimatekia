import React, { useRef, useContext, useState, useEffect, DependencyList } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Loginpage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login, loginMessage } = useContext(AuthContext);
  const resend = async (emailRef: string | undefined) => {
    const response = await fetch("/api/resend-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef,
      }),
    });
    const data = await response.json();
    console.log(data);
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login Akun</h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                login(emailRef.current!.value, passwordRef.current!.value);
              }}
            >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Masukkan email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  
                  `}
                  disabled={loginMessage?.status === "belum terverifikasi" ? true : false}
                  placeholder="name@company.com"
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
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required={false}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                    Ingat saya?
                  </label>
                </div>
              </div>
              {loginMessage && <p>{loginMessage.message}</p>}
              {loginMessage?.status === "belum terverifikasi" && (
                <a className="underline cursor-pointer" onClick={() => resend(emailRef.current?.value)}>
                  Kirim ulang kode verifikasi
                </a>
              )}
              <button
                type="submit"
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
            `}
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Belum punya akun?
                <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Registrasi disini
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
