import React from "react";
import "./Avatar.scss";
interface avatarParam {
  color: string;
  name?: string;
  bookingCard?: boolean;
}

const RoundedAvatar: React.FC<avatarParam> = (avatarParam) => {
  console.log(avatarParam.color);
  return (
    <div className={avatarParam.bookingCard? "booking-avatar" :"avatar"} style={{ backgroundColor: `${avatarParam.color}`}}>
      {avatarParam.name}
    </div>
  );
};

export default RoundedAvatar;
