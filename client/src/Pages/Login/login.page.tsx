import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../../Components/error-component";
import Header from "../../Components/header.component";
import Login from "../../Components/login.component";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebaseSetup";

export interface fieldLoginState{
    fieldId: string,
    value: string
}

export default function LoginPage(){
    const [loginState,setLoginState]=useState<fieldLoginState[]>(new Array<fieldLoginState>);
    const [error,setError]=useState<string>("");
    const navigate = useNavigate();

    const signIn = async () => {
        let jsonString = JSON.stringify(loginState);
        let json = JSON.parse(jsonString);

        try {
            await auth.signInWithEmailAndPassword(
                json["email-address"],
                json["password"]
            );
            navigate("/home")
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
                    heading="Login to your account"
                    paragraph="Don't have an account yet? "
                    linkName="Signup"
                    linkUrl="/signup"
                    />
                {handleError()}
                <Login handleSubmit={signIn} setLoginState={setLoginState} loginState={loginState}></Login>
            </div>
        </div>
    )
}