import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections } from "@fortawesome/free-solid-svg-icons";

import { navigate, distance } from "../utils";

const card = ({ center, location }) => {
  // const phoneLink = `tel:${center.phone}`;
  return (
    <div className="flex-1 bg-gray-500 h-64">
      <div className="w-64 cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-white h-64">
        <div className="text-md font-bold flex flex-col text-gray-900">
          <span className="uppercase pb-6">{center.name}</span>
          <span className="font-normal text-gray-700 text-sm">
            {center.city}- {center.state}
          </span>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex items-center text-gray-700 pt-8">
            <a onClick={navigate.bind(null, center._geoloc)}>
              <FontAwesomeIcon icon={faDirections} />
            </a>
          </div>
          <div className="flex items-center text-gray-700 pt-8">
            <a onClick={navigate.bind(null, center._geoloc)}>
              {distance(location, center._geoloc)} km
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default card;
