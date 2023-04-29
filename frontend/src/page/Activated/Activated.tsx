import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Activated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.success("Email berhasil diverifikasi, silahkan login");
    navigate("/login");
  }, []);
  return <></>;
};

export default Activated;
