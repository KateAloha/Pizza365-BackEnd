import { Modal, Box, Typography, Grid, FormLabel, TextField, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";

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

export default function ModalConfirmedOrder({ openConfirmProp, closeConfirmProp, orderCodeProp, refreshPageProp, setRefreshPageProp }) {
     const [orderCodeInput, setOrderCodeInput] = useState("");

     const cancelButtonClick = () => {
          closeConfirmProp();
     }

     useEffect(() => {
          setOrderCodeInput(orderCodeProp);
          setRefreshPageProp(refreshPageProp + 1);
     }, [openConfirmProp, orderCodeProp])

     return (
          <Container>
               <Modal
                    open={openConfirmProp}
               >
                    <Box sx={style}>
                         <Typography variant="h5" component="h2">
                              <b>Cảm ơn bạn đã đặt hàng tại Pizza 365.</b>
                              <p>Mã đơn hàng của bạn là:</p>
                         </Typography>
                         <Grid container mt={4}>
                              <Grid item xs={4} sm={4} md={4} lg={4} pt={1}>
                                   <FormLabel>Mã đơn hàng:</FormLabel>
                              </Grid>
                              <Grid item xs={8} sm={8} md={8} lg={8}>
                                   <TextField fullWidth variant="outlined" label="Mã đơn hàng" value={orderCodeInput} disabled></TextField>
                              </Grid>
                         </Grid>
                         <Grid container mt={4}>
                              <Grid item xs={12} textAlign="end">
                                   <Button color="error" variant="contained" onClick={cancelButtonClick}>Quay Về Danh Sách</Button>
                              </Grid>
                         </Grid>
                    </Box>
               </Modal>
          </Container>
     )
}