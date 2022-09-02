import * as React from "react";
import Box from "@mui/material/Box";
import Button from "../../Btn";
import Typography from "@mui/material/Typography";
import CardContent from '@mui/material/CardContent';
import Modal from "@mui/material/Modal";
import { PreLoaderSmall } from '../../PreLoader';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getRequestAsync } from "../../../redux/requests/requestSlice";
import { Alert } from "@mui/material";
import { useEffect } from "react";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '60%',
  bgcolor: 'background.paper',
  border: '4px solid #046CC6',
  borderRadius: 2,
  boxShadow: 24,
};

export default function Details({ open, setOpen, getData }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { data } = useSelector((state) => state.selectedRequest);
  const token = useSelector(state => state.auth.token);
  const [requester, setRequester] = React.useState("")
  const [alert, setAlert] = React.useState({
    message: "",
    status: null,
  });

  const getUser = () => {
    axios.get(`${process.env.API_URL}/user/${data.requesterId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      const { data } = res.data
      setRequester(`${data.firstName} ${data.lastName}`)
    })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    if (data) {
      getUser()
    }
  })

  const rejectRequest = async () => {
    setLoading(true)
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      };

      let reqOptions = {
        url: `${process.env.API_URL}/user/trip/reject/${data.id}`,
        method: "PUT",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);

      setLoading(false)
      setAlert({
        message: "Trip Request Reject successfully",
        status: response.status,
      });
      setTimeout(() => {
        setAlert({ message: "" });
      }, 1500);
      setTimeout(() => {
        handleClose(), getData()
      }, 2200);

    } catch (err) {
      console.log(err);
    }
  };


  const handleClose = () => setOpen(false);

  return (
    <div style={{ position: "relative" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="popupContainer"
      >
        <Box sx={style} className="ItemsContainer">
          <CardContent sx={{ background: '#046CC6', padding: '10px 20px' }}>
            <Typography id="modal-modal-title" sx={{ color: '#fff', fontSize: '1rem' }} variant="h5" >
              Trip Request Details
            </Typography>
          </CardContent>
          <CardContent sx={{ padding: '20px', maxHeight: '350px', overflowY: 'scroll' }}>
            <div className="content">
              <div className="row">
                <div className="title" data-testid="requester">
                  Requester:
                </div>
                <div className="data">{requester}</div>
              </div>
              <div className="row">
                <div className="title" data-testid="requester-address">
                  Requester Address:
                </div>
                <div className="data">{data.leavingFrom}</div>
              </div>
              <div className="row">
                <div className="title">Travel Reason:</div>
                <div className="data">{data.travelReason}</div>
              </div>
              <div className="row">
                <div className="title">Travel Type:</div>
                <div className="data">{data.tripType}</div>
              </div>
              <div className="row">
                <div className="title">Travel Date:</div>
                <div className="data">{data.travelDate}</div>
              </div>
              {data.tripType === "Round trip" ? (
                <div className="row">
                  <div className="title">Return Date:</div>
                  <div className="data">{data.returnDate}</div>
                </div>
              ) : (
                ""
              )}
              <div className="row">
                <div className="title">Accommodation:</div>
                <div className="data">{data.accomodation?.name}</div>
              </div>
              <div className="row">
                <div className="title">Status:</div>
                <div className="data">{data.status}</div>
              </div>
              {alert.message && (
                <div style={{ paddingTop: 20 }}>
                  <Alert
                    variant="filled"
                    severity={
                      alert.status === 200 || alert.status === 201
                        ? "success"
                        : "error"
                    }
                    sx={{ width: "40%", marginLeft: "auto" }}
                  >
                    {alert.message}
                  </Alert>
                </div>
              )}
              <div className="buttons">
                <Button
                  data-testid="btn1"
                  disabled={data.status != "pending" ? true : false}
                  className={data.status == "pending" ? "button primary" : "disabled"}
                >
                  Approve
                </Button>
                <Button
                  data-testid="btn1"
                  disabled={data.status != "pending" ? true : false}
                  onClick={() => rejectRequest()}
                  className={data.status == "pending" ? "button primary" : "disabled"}
                >
                  {loading ? <PreLoaderSmall /> : 'Reject'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Box>
      </Modal>
    </div>
  );
}