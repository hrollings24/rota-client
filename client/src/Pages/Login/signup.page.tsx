import { useState } from "react";
import ErrorComponent from "../../Components/error-component";
import Header from "../../Components/header.component";
import Login from "../../Components/login.component";
import Signup from "../../Components/signup.component";
import { auth } from "../../firebaseSetup";
import { fieldLoginState } from "./login.page";


export default function SignupPage(){
    const [error,setError]=useState<string>("");
    const [signupState,setSignupState]=useState<fieldLoginState[]>(new Array<fieldLoginState>);

    const createAccount = async () => {
        let jsonString = JSON.stringify(signupState);
        let json = JSON.parse(jsonString);

        try {
            await auth.createUserWithEmailAndPassword(
                json["email-address"],
                json["password"]
            );
        } catch (error) {
            var obj = JSON.stringify(error);
            var json2 = JSON.parse(obj)
            setError(json2["code"]);
        }
    };

    const removeError = () => {
        setError("")
    }

    const handleError=() =>
    {
        if (error !="")
        {
            return (
                <div>
                    <ErrorComponent title="Error!" message={error} onClick={removeError}></ErrorComponent>
                </div>
            )
        }
        return <div></div>
    }
    
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                heading="Create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/login"
                />
                {handleError()}
                <Signup handleSubmit={createAccount} loginState={signupState} setLoginState={setSignupState} />
            </div>
        </div>
    )
}