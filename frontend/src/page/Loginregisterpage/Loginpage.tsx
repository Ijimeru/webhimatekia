import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { AuthContext } from "../../context/AuthContext";
export default function Loginpage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login, resendEmail, setResendEmail } = useContext(AuthContext);
  const resend = (emailRef: string | null): void => {
    if (emailRef == "") {
      (() => toast.info("Email sudah dikirimkan, silahkan cek email anda"))();
      return;
    }
    const response = new Promise((resolve, rejected) =>
      fetch("/api/resend-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setResendEmail("");
          resolve("Email verifikasi berhasil, silahkan cek email anda");
        } else {
          rejected("Email gagal dikirim...");
        }
      })
    );

    toast.promise(response, {
      pending: {
        render() {
          return "Sedang mengirim email....";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
        icon: "🟢",
      },
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen md:py-0">
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
              {resendEmail && (
                <a className="underline cursor-pointer block mb-2 text-sm font-medium text-gray-900 dark:text-white" onClick={() => resend(resendEmail)}>
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
