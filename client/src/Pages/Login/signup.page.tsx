import { useState } from "react";
import ErrorComponent from "../../Components/error-component";
import Header from "../../Components/header.component";
import Signup from "../../Components/signup.component";
import { auth } from "../../firebaseSetup";
import { fieldLoginState } from "./login.page";
import { UserCredential } from "firebase/auth";
import { gql, useMutation } from "@apollo/client";

interface CreateAccountRequestInput {
  username: string;
  firstname: string;
  surname: string;
}

export interface CreateAccountResponse {
  createAccount: {
    id: string;
    username: string;
  };
}

const CREATE_ACCOUNT = gql`
  mutation createAccount($request: CreateAccountRequestInput!) {
    createAccount(request: $request) {
      id
      username
    }
  }
`;

export const SignupPage: React.FC = () => {
  const [errorMessage, setError] = useState<string>("");
  const [signupState, setSignupState] = useState<fieldLoginState[]>(new Array<fieldLoginState>());

  const [callCreateAccount, { called, data, loading, error }] = useMutation<
    CreateAccountResponse,
    { request: CreateAccountRequestInput }
  >(CREATE_ACCOUNT, {
    onCompleted: (data) => accountCreated(data),
  });

  const accountCreated = (workspaceParam: CreateAccountResponse) => {
    //setWorkspace(workspaceParam.workspaces[0])
    //setLoading(false)
    console.log(workspaceParam);
  };

  const createAccount = async () => {
    let jsonString = JSON.stringify(signupState);
    let json = JSON.parse(jsonString);

    var result;

    try {
      result = await auth.createUserWithEmailAndPassword(json["email-address"], json["password"]);
    } catch (error) {
      var obj = JSON.stringify(error);
      var json2 = JSON.parse(obj);
      setError(json2["code"]);
    }

    if (result?.user?.uid != null) {
      const accountRequest: CreateAccountRequestInput = {
        username: "test4",
        firstname: "testy",
        surname: "testy",
      };

      callCreateAccount({ variables: { request: accountRequest } });
    } else {
      setError("An error has occurred, please try again.");
    }
  };

  const removeError = () => {
    setError("");
  };

  const handleError = () => {
    if (errorMessage !== "") {
      return (
        <div>
          <ErrorComponent title="Error!" message={errorMessage} onClick={removeError}></ErrorComponent>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header heading="Create an account" paragraph="Already have an account? " linkName="Login" linkUrl="/login" />
        {handleError()}
        <Signup handleSubmit={createAccount} loginState={signupState} setLoginState={setSignupState} />
      </div>
    </div>
  );
};

export default SignupPage;