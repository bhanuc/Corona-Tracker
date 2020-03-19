import React from "react";
import AlgoliaPlaces from "algolia-places-react";

const header = ({ handleChange, heading, search }) => {
  const checkResp = async result => {
    if (!result.coords || !result.coords.latitude) {
      return;
    }
    await handleChange({
      lat: result.coords.latitude,
      lng: result.coords.longitude
    });
  };
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(checkResp);
  };
  return (
    <nav id="header" className="fixed w-full">
      <div className="relative w-full z-10 fixed top-0 bg-gray-200 border-b border-grey-light">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
          <div className="pl-4 flex items-center">
            <svg
              className="h-5 pr-3 fill-current text-teal-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M17.94 11H13V9h4.94A8 8 0 0 0 11 2.06V7H9V2.06A8 8 0 0 0 2.06 9H7v2H2.06A8 8 0 0 0 9 17.94V13h2v4.94A8 8 0 0 0 17.94 11zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
            </svg>
            <a
              className="text-teal-700 text-base no-underline hover:no-underline font-extrabold text-xl"
              href="#"
            >
              {heading}
            </a>
            <div id="search-toggle" className="search-icon cursor-pointer pl-6">
              <a onClick={getCurrentLocation}>
                <svg
                  className="fill-current pointer-events-none text-grey-darkest w-4 h-4 inline"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div
            className="w-full flex-grow lg:flex lg:flex-1 lg:content-center lg:justify-end lg:w-auto hidden lg:block mt-2 lg:mt-0 z-20"
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end items-center">
              {/* <li className="mr-3 py-2 lg:py-0">
                <a
                  className="inline-block py-2 px-4 text-black font-bold no-underline"
                  href="#"
                >
                  Other Links
                </a>
              </li> */}
              <li className="mr-3 py-2 lg:py-0">
                <a
                  className="inline-block text-grey-dark no-underline hover:text-black hover:underline py-2 px-4"
                  href="https://bhanu.io/about-me-26eaa3ac8186"
                >
                  About me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="relative w-full hidden bg-white shadow-xl"
        id="search-content"
      >
        <div className="container mx-auto py-4 text-black"></div>
      </div>
      <div className="relative w-full bg-white shadow-xl" id="search-content">
        <div className="container mx-auto py-4 text-black">
          {search && (
            <AlgoliaPlaces
              placeholder="Ex: Bengaluru, India"
              options={{
                appId: "pl4TYUU3GUWL",
                apiKey: "8ec16612f23ce07954c5f3b8625a7493"
              }}
              onChange={async ({ suggestion }) => {
                const { latlng } = suggestion;
                await handleChange(latlng);
              }}
              onLimit={({ message }) =>
                window.alert("Algolia speed limit reached.")
              }
              onError={({ message }) =>
                window.alert("Issue with Algolia translations.")
              }
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default header;
