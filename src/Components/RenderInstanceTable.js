import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import PowerOutlinedIcon from "@material-ui/icons/PowerOutlined";
import { FiberManualRecord } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faPlug,
  faPowerOff,
  faStopCircle,
  faTag,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { add3Dots, convertToDateTime } from "../utils/helper";

const RenderInstanceTable = ({ instanceData }) => {
  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Instance</th>
            <th>Instance ID</th>
            <th>Tags</th>
            <th>Type</th>
            <th>Zone</th>
            <th>Total Snapshots</th>
            <th>PowerManagement Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instanceData?.map((instance, index) => (
            <tr key={index}>
              <td className="tooltipHover">
                <div className="tooltip tooltip-bottom">
                  {instance.state === "running" ? (
                    <Tooltip title="Instance is running" placement="top">
                      <IconButton aria-label="start">
                        <FiberManualRecord style={{ color: "green" }} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Instance is stopped" placement="top">
                      <IconButton aria-label="stop">
                        <FiberManualRecord style={{ color: "red" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {instance?.guest ? (
                    <Tooltip title="Windows" placement="top">
                      <IconButton aria-label="windows">
                        <FontAwesomeIcon icon={faWindows} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Linux" placement="top">
                      <IconButton aria-label="linux">
                        <FontAwesomeIcon icon={faLinux} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {instance?.name}
                </div>
              </td>
              <td className="col-sm-6 tooltipHover">
                <div className="tooltip tooltip-bottom">
                  <span className="tooltip-text">
                    {add3Dots(instance?.instanceId, 20)}
                  </span>
                  {instance?.instanceId}
                </div>
              </td>

              <td className="col-sm-6 tooltipHover">
                <Tooltip title={typeof instance?.tags === "object" && instance?.tags !== null ? Object.values(instance?.tags).join(", ") : null} placement="top">
                    <div className="tooltip-icon">
                      <FontAwesomeIcon icon={faTag} style={{ color: "#337ab7" }} />
                    </div>
                  </Tooltip>
                  <div className="tooltip tooltip-bottom">
                  {add3Dots(
                      typeof instance?.tags === "object" && instance?.tags !== null ? Object.values(instance?.tags).join(", ") : null,
                      20
                    )}     
                    </div>          
              </td>
              <td className="col-sm-6 tooltipHover">
                <div className="tooltip tooltip-bottom">
                  <span className="tooltip-text">
                    {add3Dots(instance?.type, 20)}
                  </span>
                  {instance?.type}
                </div>
              </td>
              <td className="col-sm-6 tooltipHover">
                <div className="tooltip tooltip-bottom">
                  <span className="tooltip-text">
                    {add3Dots(instance?.zone, 20)}
                  </span>
                  {instance?.zone}
                </div>
              </td>
              <td className="col-sm-6 tooltipHover">
                <div className="tooltip tooltip-bottom">
                  {instance.totalSnapshots}
                </div>
                {instance.totalSnapshots > 0 && (
                  <Tooltip
                    title={`Latest SnapShot Time: ${convertToDateTime(
                      instance.latestSnapshot
                    )}`}
                    placement="top"
                  >
                    <IconButton aria-label="info">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </td>
              <td className="col-sm-6 tooltipHover">
                <div className="tooltip tooltip-bottom">
                  {instance.powerScheduled ? (
                    <Tooltip
                      title="Instance is Power Scheduled"
                      placement="top"
                    >
                      <PowerOutlinedIcon
                        className="active-icon"
                        style={{ color: "green" }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Instance is not Power Scheduled"
                      placement="top"
                    >
                      <div style={{marginTop: "15px"}}>
                        <FontAwesomeIcon
                          icon={faPlug}
                          className="inactive-icon"
                          style={{
                            color: "#e64759",
                            transform: "rotate(45deg)",
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="inactive-icon"
                          style={{
                            color: "#e64759",
                            position: "absolute",
                            bottom: "10px",
                            left: "18px",
                          }}
                        />
                      </div>
                    </Tooltip>
                  )}
                </div>
              </td>
              <td className="col-sm-6 tooltipHover">
                <div className="tooltip tooltip-bottom">
                  {instance.state === "running" ? (
                    <Tooltip title="Stop Instance" placement="top">
                      <FontAwesomeIcon
                        icon={faStopCircle}
                        className="text-danger"
                        style={{ color: "#a94442" }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Start Instance" placement="top">
                      <FontAwesomeIcon
                        icon={faPowerOff}
                        className="text-success"
                        style={{ color: "green" }}
                      />
                    </Tooltip>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RenderInstanceTable;