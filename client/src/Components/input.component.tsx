const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

export interface InputComponentProps
{
    onChange : (value: any) => void;
    value: string,
    labelText: string,
    labelFor: string,
    id: string,
    name: string,
    type: string,
    isRequired: boolean,
    placeholder: any,
    //customClass: any
}

export default function Input(props: InputComponentProps){
    return(
        <div className="my-5">
            <label htmlFor={props.labelFor} className="sr-only">
              {props.labelText}
            </label>
            <input
              onChange={e => props.onChange(e)}
              defaultValue={props.value}
              id={props.id}
              name={props.name}
              type={props.type}
              required={props.isRequired}
              className={fixedInputClass/*+props.customClass*/}
              placeholder={props.placeholder}
            />
          </div>
    )
}