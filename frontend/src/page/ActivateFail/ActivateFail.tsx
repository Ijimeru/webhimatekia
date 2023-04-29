import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ActivateFail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error("Terjadi kesalahan.");
    navigate("/login");
  }, []);
  return <></>;
};

export default ActivateFail;
