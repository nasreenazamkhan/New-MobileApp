import React, { useEffect, useState } from "react";
import Icon from "../Icon";
import "./Star.scss";

interface StarProps {
  starValue: (number) => void;
}
const Star: React.FC<StarProps> = ({ starValue }) => {
  var arr = [];
  for (var n = 0; n < 5; n++) {
    arr[n] = { fill: false };
  }

  const [starFill, setstarFill] = useState(arr);

  function onStarClick(index, item) {
    console.log(index);
    starValue(index + 1);
    for (var i = 0; i < starFill.length; i++) {
      starFill[i].fill = false;
    }
    for (var i = 0; i <= index; i++) {
      starFill[i].fill = true;
      setstarFill(starFill);
    }
    setstarFill([...starFill]);
  }

  var borderStartIconProps = {
    name: "star-border",
    slot: "",
    class: "zoom18",
    style: { stroke: "#168FE4" },
  };
  var startIconProps = {
    name: "star",
    slot: "",
    class: "zoom18",
    style: { stroke: "#168FE4" },
  };
  return (
    <div className="starContainer">
      {starFill.map((item, index) => (
        <div
          key={index}
          className="eachStar"
          onClick={() => onStarClick(index, item)}
        >
          {!item.fill ? (
            <Icon iconProps={borderStartIconProps} />
          ) : (
            <Icon iconProps={startIconProps} />
          )}
        </div>
      ))}
    </div>
  );
};
export default Star;
