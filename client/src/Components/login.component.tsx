import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { loginFields } from '../Constants/FormFields';
import { auth } from '../firebaseSetup';
import { fieldLoginState } from '../Pages/Login/login.page';
import FormAction from './form-action.component';
import FormExtra from './form-extra.component';
import Input from './input.component';

const fields=loginFields;

export interface loginProps
{
    handleSubmit: () => void,
    loginState: fieldLoginState[]
    setLoginState: Dispatch<SetStateAction<fieldLoginState[]>>
}

export default function Login(props: loginProps){

    const handleChange=(value: string, fieldId: string)=>{
        props.setLoginState({...props.loginState,[fieldId]:value})
    }

    return(
        <form className="mt-8 space-y-6">
            <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            onChange={e => handleChange(e.target.value, field.id)}
                            value={""}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
            </div>
            <FormExtra/>
            <FormAction type="Button" handleSubmit={props.handleSubmit} text="Login"/>
        </form>
    )
}