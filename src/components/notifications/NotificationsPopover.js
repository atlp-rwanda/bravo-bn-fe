import PropTypes from "prop-types";
import { noCase } from "change-case";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  List,
  Badge,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuPopover from "./MenuPopover";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MarkAsReadIcon from "@mui/icons-material/DoneAll";
import { socket } from "../../config/sockets";

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  const jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];
  console.log(`token: ${jwtToken}`);

  let notificationsss

  socket.on('newNotification', (info) => {
    notificationsss = info;
  })
  console.log(notificationsss); 
  
  useEffect(() => {
    const renderNotifications = async () => {
      const res = await axios.get(
        `${process.env.API_URL}/user/notification/get`,
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      setNotifications(res.data.data.rows);
    };
    renderNotifications();
  }, []);

  const totalUnRead = notifications.filter(
    (item) => item.read === false
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = async () => {
    await axios.put(`${process.env.API_URL}/user/notification/read`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <NotificationsIcon style={{ fill: "black" }} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <MarkAsReadIcon style={{ fill: "gray" }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "line" }} />
        <List disablePadding>
          {notifications.slice(0, 2).map((notification) => (
            <div>
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
              <Divider sx={{ borderStyle: "line" }} />
            </div>
          ))}
        </List>

        <List disablePadding>
          {notifications.slice(2, 5).map((notification) => (
            <div>
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
              <Divider sx={{ borderStyle: "line" }} />
            </div>
          ))}
        </List>

        <Divider sx={{ borderStyle: "line" }} />
      </MenuPopover>
    </>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    read: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

function NotificationItem({ notification }) {
  const { title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
      }}
    >
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          ></Typography>
        }
      />
    </ListItemButton>
  );
}

function renderContent(notification) {
  const title = (
    <div>
      <Typography
        variant="subtitle1"
        sx={{ color: "#046CC6", fontWeight: 600 }}
      >
        {notification.title}
      </Typography>
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        {noCase(notification.description)}
      </Typography>
    </div>
  );

  return {
    avatar: notification.avatar ? (
      <img alt={notification.title} src={notification.avatar} />
    ) : null,
    title,
  };
}
