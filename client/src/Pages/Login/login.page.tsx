import { useState } from "react";
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

    const signIn = async () => {
        let jsonString = JSON.stringify(loginState);
        let json = JSON.parse(jsonString);

        try {
            await auth.signInWithEmailAndPassword(
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
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            {handleError()}
            <Login handleSubmit={signIn} setLoginState={setLoginState} loginState={loginState}></Login>
        </>
    )
}