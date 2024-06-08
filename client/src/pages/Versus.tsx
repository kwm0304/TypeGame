import { useAuth } from "@/context/AuthContext";
import useSignalRConnection from "@/services/signalRService";
import React, { useEffect, useState } from "react";

const Versus: React.FC = () => {
  const connection = useSignalRConnection("http://localhost:5214/versus");
  const [username, setUsername] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    if (user !== null) {
      setUsername(user?.userName);
      } else {
        console.log("No user found");
      }
  }, [user]);
  return <div>Versus</div>;
};

export default Versus;
