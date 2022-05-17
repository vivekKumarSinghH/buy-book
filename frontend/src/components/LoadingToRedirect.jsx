import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="mt-10 text-2xl text-purple-600">
      <h5>You are not authorised to access this route....
      <br/>
      Redirecting you to login page in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;