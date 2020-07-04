import React from 'react';

//default state as object for better auto-completion
const authContext=React.createContext({ status:false , login:()=>{} });
export default authContext