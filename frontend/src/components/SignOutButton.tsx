import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";


const SignOutButton = () => {
    const queryClient = useQueryClient();
   const { showToast } = useAppContext();


   
   const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
        showToast({ message: "Sign out successful", type: "SUCCESS" });
        await queryClient.invalidateQueries("validateToken");
        //navigate("/");
    },
    onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
    },
});


const handleClick = () => {
    mutation.mutate();
}
    return (
    <button
    onClick={handleClick}
        className="bg-white text-blue-600 px-3 py-1 font-bold hover:bg-gray-100 hover:text-green-500"
        >
        Sign Out
        </button>
    );
    };
    export default SignOutButton;