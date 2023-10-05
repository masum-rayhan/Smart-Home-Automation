import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteDeviceMutation } from "../apis/deviceApi";

const DeviceBox = ({ device, index }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Initialize state for the device's on/off status
  const [isDeviceOn, setIsDeviceOn] = useState(false);
  const [deviceType, setDeviceType] = useState("outline");

  const [isHovered, setIsHovered] = useState(false);

  const [deleteDeviceMutation] = useDeleteDeviceMutation();

  // Toggle the device's status when the button is clicked
  const handleToggle = () => {
    setIsDeviceOn((prevIsDeviceOn) => !prevIsDeviceOn);
    setDeviceType((prevDeviceType) =>
      prevDeviceType === "outline" ? "filled" : "outline"
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = async () => {
    try {
      // Call the delete mutation with the device ID
      await deleteDeviceMutation(device.id);

      // Dispatch an action to remove the deleted device from the Redux store
      dispatch(/* Your delete action here */);
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  return (
    <>
      <Grid
        key={`${device}-${index}`}
        container
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        p="3px"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        {/* <Grid item xs={2}> */}
          {isHovered && (
            <IconButton
              color="error"
              onClick={handleDelete} // onClick={() => onDelete(device.id)}
              style={{ visibility: isHovered ? "visible" : "hidden" }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        {/* </Grid> */}
        <Grid item xs={2} sm={1} style={{ marginLeft: isHovered ? "10px" : "0" }}>
          <Box color={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
            {deviceType === "outline" ? (
              <EmojiObjectsOutlinedIcon style={{ fontSize: "45px" }} />
            ) : (
              <EmojiObjectsIcon style={{ fontSize: "45px" }} />
            )}
          </Box>
        </Grid>

        <Grid item xs={4} style={{ textAlign: "center" }}>
          {/* <Box> */}
            {/* Render device information here */}
            <Typography color={colors.grey[100]}>{device.name}</Typography>
          {/* </Box> */}
        </Grid>

        <Grid item>
          <Box
            color={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
            onClick={handleToggle}
          >
            {isDeviceOn ? (
              <ToggleOnIcon color="primary" style={{ fontSize: "45px" }} />
            ) : (
              <ToggleOffIcon color="disabled" style={{ fontSize: "45px" }} />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DeviceBox;
