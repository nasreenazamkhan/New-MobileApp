import { SocialSharing } from "@ionic-native/social-sharing";
import React from "react";
import Icon from "../../../components/Icon";
import "./ListDownload.scss";

interface ListDownloadProps {
  downloadableListItem?: any;
}
const ListDownload: React.FC<ListDownloadProps> = ({
  downloadableListItem,
}) => {
  console.log(downloadableListItem);
  const pdfIcon = {
    name: "pdfIcon",
    slot: "start",
    class: "slotStart",
    styleProps: { zoom: " 1.2" },
  };
  const pngIcon = {
    name: "png_icon",
    slot: "start",
    class: "slotStart",
    styleProps: { zoom: " 1.2" },
  };
  const podDownloadIcon = {
    name: "POD-down",
    slot: "start",
    class: "slotStart",
    styleProps: { zoom: " 1.2" },
  };

  return (
    <div className="list-container">
      {downloadableListItem.map((item, index) => (
        <div
          key={index}
          className="line-row"
          onClick={() => {
            console.log(item);
            SocialSharing.share(
              "Pfoof of Delivery",
              "POD" + item.fileName,
              "data:application/" +
                item.fileName.split(".")[1] +
                ";base64," +
                item.fileContent,
              null
            );
          }}
        >
          <div className="row-item1">
            {item.fileType === "pdf" ? (
              <Icon iconProps={pdfIcon} />
            ) : (
              <Icon iconProps={pngIcon} />
            )}
          </div>
          <div className="row-item2">{item.fileName}</div>
          <div className="row-item3">
            <Icon iconProps={podDownloadIcon} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListDownload;
