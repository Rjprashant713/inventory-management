import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import StopIcon from "@material-ui/icons/Stop";
import PowerOffIcon from "@material-ui/icons/PowerOff";
import PowerOutlinedIcon from "@material-ui/icons/PowerOutlined";
import { FiberManualRecord } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
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
                <td className="col-sm-6 tooltipHover">
                  <div className="tooltip tooltip-bottom">
                    {instance.state === "running" ? (
                      <Tooltip title="Instance is running" placement="bottom">
                        <IconButton aria-label="start">
                          <FiberManualRecord style={{ color: "green" }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Instance is stopped" placement="bottom">
                        <IconButton aria-label="stop">
                          <FiberManualRecord style={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                    {instance?.guest ? (
                      <Tooltip title="Windows" placement="bottom">
                        <IconButton aria-label="windows">
                          <FontAwesomeIcon icon={faWindows} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Linux" placement="bottom">
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
                  <div className="tooltip tooltip-bottom">
                    <FontAwesomeIcon icon={faTag} style={{ color: "blue" }}/>
                    <span className="tooltip-text">
                      {typeof instance?.tags === "object" &&
                      instance?.tags !== null
                        ? Object.values(instance?.tags).join(", ")
                        : null}
                    </span>
                    {add3Dots(
                      typeof instance?.tags === "object" &&
                        instance?.tags !== null
                        ? Object.values(instance?.tags).join(", ")
                        : null,
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
                        placement="bottom"
                      >
                        <PowerOutlinedIcon
                          className="active-icon"
                          style={{ color: "green" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Instance is not Power Scheduled"
                        placement="bottom"
                      >
                        <PowerOffIcon
                          className="inactive-icon"
                          style={{ color: "red" }}
                        />
                      </Tooltip>
                    )}
                  </div>
                </td>
                <td className="col-sm-6 tooltipHover">
                  <div className="tooltip tooltip-bottom">
                    {instance.state === "running" ? (
                      <Tooltip title="Stop Instance" placement="bottom">
                        <IconButton aria-label="stop">
                          <StopIcon style={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Start Instance" placement="bottom">
                        <IconButton aria-label="start">
                          <PowerOffIcon style={{ color: "green" }} />
                        </IconButton>
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