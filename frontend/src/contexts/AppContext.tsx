import React, { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';
import Toast from "../components/Toast";
type ToastMessage ={
    message:string;
    type:"SUCCESS"|"ERROR";
}
type AppContext={
    showToast:(toastMessage:ToastMessage)=>void;
    isLoggedIn:boolean;

}
const AppContext=React.createContext<AppContext|undefined>(undefined);
export const AppContextProvider=(
    {children}:
    {children:React.ReactNode})=>{
        //to define the state of an object
        const [toast,setToast]=useState<ToastMessage|undefined>(undefined);
        
        const {isError} = useQuery("validateToken",apiClient.validateToken,{
            retry:false,
        })
        return (
            <AppContext.Provider 
            value={{
                showToast:(toastMessage)=>{
                    setToast(toastMessage);
                },
                isLoggedIn:!isError
            }}
            >
                {toast &&(
                    <Toast 
                    message={toast.message} 
                    type={toast.type}
                onClose={()=>setToast(undefined)}
                />
                )}
                {children}
            </AppContext.Provider>
        );

};
export const useAppContext=()=>{
    const context=React.useContext(AppContext);
    return context as AppContext;
};