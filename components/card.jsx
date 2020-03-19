import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections } from "@fortawesome/free-solid-svg-icons";

const distance = (point1, point2, unit = "K") => {
  if (point1.lat == point2.lat && point1.lng == point2.lng) {
    return 0;
  }
  var radlat1 = (Math.PI * point1.lat) / 180;
  var radlat2 = (Math.PI * point2.lat) / 180;
  var theta = point1.lng - point2.lng;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist.toFixed(2);
};

function navigate({ lat, lng }) {
  // If it's an iPhone..
  if (
    navigator.platform.indexOf("iPhone") !== -1 ||
    navigator.platform.indexOf("iPod") !== -1
  ) {
    function iOSversion() {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later
        var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [
          parseInt(v[1], 10),
          parseInt(v[2], 10),
          parseInt(v[3] || 0, 10)
        ];
      }
    }
    var ver = iOSversion() || [0];

    var protocol = "http://";
    if (ver[0] >= 6) {
      protocol = "maps://";
    }
    window.location =
      protocol + "maps.apple.com/maps?daddr=" + lat + "," + lng + "&amp;ll=";
  } else {
    window.open("http://maps.google.com?daddr=" + lat + "," + lng + "&amp;ll=");
  }
}

const card = ({ center, location }) => {
  const phoneLink = `tel:${center.phone}`;
  return (
    <div className="flex-1 bg-gray-500 h-64">
      <div className="w-64 cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-white h-64">
        <div className="text-md font-bold flex flex-col text-gray-900">
          <span className="uppercase pb-6">{center.name}</span>{" "}
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
