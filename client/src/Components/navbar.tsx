import { Cog6ToothIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebaseSetup";
import { WorkspaceResponse } from "../Types/Workspace";
import AvatarComponent from "./avatar-component";
import { Account } from "../Types/Account";
import { AccountContext } from "../AccountContext";

export default function Navbar({ workspace }: { workspace: WorkspaceResponse | null }) {
  const name = auth.currentUser?.email;
  const location = useLocation();
  const navigate = useNavigate();
  const { accountData, setAccountData } = useContext(AccountContext);

  const getName = () => {
    if (workspace == null) {
      return toTitleCase(location.pathname.split('/').pop()!);
    } else {
      return toTitleCase("Test Workspace"/*workspace.name*/);
    }
  };

  const goToAccount = () => {
    navigate('/account');
  };

  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const getNotificationCount = () => {

    if (accountData?.account?.notifications == null) {
      return null;
    } else {
      if (accountData?.account?.notifications?.length > 0) {
        return accountData?.account.notifications.length;
      } else {
        return null;
      }
    }
  };

  const getInitials = () => {
    if (accountData?.account?.firstName == null || accountData?.account?.surname == null) {
      return null;
    } else {
      return accountData?.account?.firstName.charAt(0) + accountData?.account?.surname.charAt(0);
    }
  }

  return (
    <div>
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start" style={{ backgroundColor: '#ADEFD1FF' }} data-te-navbar-ref>
        <div className="flex w-full flex-wrap items-center justify-between px-6">
          <button className="block border-0 bg-transparent px-2.5 py-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden" type="button" data-te-collapse-init data-te-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
            <span className="[&>svg]:w-7">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
          <div className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" id="navbarSupportedContent1" data-te-collapse-item>
            <a className="mr-2 mt-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mt-0" href="#">
              <img src="https://firebasestorage.googleapis.com/v0/b/modeflick-rota.appspot.com/o/pencil-drawing-circles.png?alt=media&token=d5b81770-9855-4b06-92d8-497a8e101024" style={{ height: 15 }} alt="" loading="lazy" />
            </a>
            <ul className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row" data-te-navbar-nav-ref>
              <h2 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{getName()}</h2>
            </ul>
          </div>

          <div className="relative flex items-center">
            <a className="mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400" href="#">
              <span className="[&>svg]:w-5">
                <Cog8ToothIcon className="text-gray-600" />
              </span>
            </a>

            <div className="relative" data-te-dropdown-ref>
              <a onClick={() => navigate('/notifications')} className="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400" href="#" id="dropdownMenuButton1" role="button" data-te-dropdown-toggle-ref aria-expanded="false">
                <span className="[&>svg]:w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {getNotificationCount() !== null && (
                  <span className="absolute -mt-2.5 ml-2 rounded-full bg-red-700 px-1.5 py-0 text-xs text-white">{getNotificationCount()}</span>
                )}
              </a>
              <ul className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block" aria-labelledby="dropdownMenuButton1" data-te-dropdown-menu-ref>
                <li>
                  <a className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30" href="#" data-te-dropdown-item-ref>
                    Action
                  </a>
                </li>
                <li>
                  <a className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30" href="#" data-te-dropdown-item-ref>
                    Another action
                  </a>
                </li>
                <li>
                  <a className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30" href="#" data-te-dropdown-item-ref>
                    Something else here
                  </a>
                </li>
              </ul>
            </div>

            <div className="relative" data-te-dropdown-ref>
              <div className="relative" data-te-dropdown-ref>
                <button
                  className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                  id="dropdownMenuButton2"
                  onClick={() => goToAccount()}
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                >
                  <AvatarComponent url={""} initials={getInitials()} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}