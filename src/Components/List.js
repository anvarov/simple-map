import React from "react";
import PLACES from "./Places";

export default props => {
  const { selected, renderSelect } = props;
  const selectedPlaces = PLACES.map(
    (place, index) =>
      (selected === "all" && (
        <ul key={index}>
          <button className="list-item" index={index}>{place.name}</button>
        </ul>
      )) ||
      (place.type === selected && (
        <ul key={index}>
          <button className="list-item" index={index}>{place.name}</button>
        </ul>
      ))
  );
  return (
    <li className="list" onClick={e => renderSelect(e)}>
      {selectedPlaces}
    </li>
  );
};
