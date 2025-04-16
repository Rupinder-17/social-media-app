import { apiclient } from "../../api/apiClients"

export const authServices = {
    async login(){
        try{
            const response = await apiclient.request("users/register", {
                method : "POST",
                body: JSON.stringify()
            })
            console.log(response);
            
            if(response.data?.accessToken){
                localStorage.setItem("accessToken", response.data.accessToken)
            }
            return response.data
        }
        catch(error){
            console.log(error);
            
        }
    }
}