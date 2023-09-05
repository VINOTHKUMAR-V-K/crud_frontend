import React from "react";
const serverConfig = "http://localhost:5000";
const isDeployment=process.env.NODE_ENV === 'developmet';
const baseUrl = isDeployment?serverConfig : ""