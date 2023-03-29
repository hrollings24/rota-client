import {Link, To} from 'react-router-dom';

export interface headerComponentData
{
    heading: String,
    paragraph: String,
    linkUrl: To,
    linkName: String
}

export default function Header(props: headerComponentData){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src="https://firebasestorage.googleapis.com/v0/b/modeflick-rota.appspot.com/o/pencil-drawing-circles.png?alt=media&token=d5b81770-9855-4b06-92d8-497a8e101024"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {props.heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {props.paragraph} {' '}
            <Link to={props.linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {props.linkName}
            </Link>
            </p>
        </div>
    )
}