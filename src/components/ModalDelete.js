import { Modal, Box, Typography, Grid, Snackbar, Alert, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 500,
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 24,
     p: 4,
};

export default function ModalDelete({ openProp, closeProp, IDDeleteProp, refreshPageProp, setRefreshPageProp }) {
     const [alert, setAlert] = useState(false);
     const [textAlert, setTextAlert] = useState('');
     const [alertColor, setAlertColor] = useState('');

     const cancelButtonClick = () => closeProp();

     const handleCloseAlert = () => setAlert(false);

     const onBtnConfirmDeleteClick = () => {
          fetch("http://203.171.20.210:8080/devcamp-pizza365/orders/" + IDDeleteProp, { method: 'DELETE' })
               .then(async res => {
                    const isJson = res.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await res.json();
                    // Check for response error
                    if (!res.ok) {
                         // get error message from body or default to response status
                         const error = (data && data.message) || res.status;
                         return Promise.reject(error);
                    }
                    setAlert(true);
                    setTextAlert("Xoá đơn hàng có ID " + IDDeleteProp + " thành công!");
                    setAlertColor("success");
                    closeProp();
                    setRefreshPageProp(refreshPageProp + 1);
               })
               .catch((err) => {
                    console.error(err.message);
                    setAlert(true);
                    setTextAlert("Xoá đơn hàng có ID " + IDDeleteProp + " thất bại!");
                    setAlertColor("error");
                    closeProp();
               })
     }

     return (
          <Container>
               <Modal
                    open={openProp}
               >
                    <Box sx={style}>
                         <Typography variant="h5" component="h2">
                              <b>Xoá Đơn Hàng</b>
                         </Typography>
                         <Grid container mt={4}>
                              <p>Bạn có chắc chắn muốn xoá đơn hàng có ID <b>{IDDeleteProp}</b> không?</p>
                         </Grid>
                         <Grid container mt={4}>
                              <Grid item xs={12} textAlign="end">
                                   <Button color="error" variant="contained" className="me-1" onClick={onBtnConfirmDeleteClick}>Xác Nhận</Button>
                                   <Button color="info" variant="contained" onClick={cancelButtonClick}>Quay Lại</Button>
                              </Grid>
                         </Grid>
                    </Box>
               </Modal>
               <Snackbar
                    open={alert}
                    autoHideDuration={5000}
                    onClose={handleCloseAlert}
               >
                    <Alert onClose={handleCloseAlert} severity={alertColor}>{textAlert}</Alert>
               </Snackbar>
          </Container>
     )
}