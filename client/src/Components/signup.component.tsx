import { useState } from 'react';
import { loginFields } from '../Constants/FormFields';
import { auth } from '../firebaseSetup';
import { fieldLoginState } from '../Pages/Login/login.page';
import FormAction from './form-action.component';
import FormExtra from './form-extra.component';
import Input from './input.component';
import { loginProps } from './login.component';

const fields=loginFields;

export default function Signup(props: loginProps){

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
            <FormAction type="Button" handleSubmit={props.handleSubmit} text="Signup"/>
        </form>
    )
}