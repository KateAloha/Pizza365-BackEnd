import { Grid, Modal, Box, Typography, FormLabel, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Container } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 900,
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 24,
     p: 4,
};

export default function ModalEdit({ openProp, closeProp, rowDataProp, refreshPageProp, setRefreshPageProp }) {
     const [id, setID] = useState("");
     const [orderCode, setOrderCode] = useState("");
     const [kichCo, setKichCo] = useState("");
     const [loaiPizza, setLoaiPizza] = useState("");
     const [doUong, setDoUong] = useState("");
     const [thanhTien, setThanhTien] = useState("");
     const [hoTen, setHoTen] = useState("");
     const [soDienThoai, setSoDienThoai] = useState("");
     const [trangThai, setTrangThai] = useState("");

     const [alert, setAlert] = useState(false);
     const [textAlert, setTextAlert] = useState('');
     const [alertColor, setAlertColor] = useState('');

     useEffect(() => {
          setID(rowDataProp.id);
          setOrderCode(rowDataProp.orderCode);
          setKichCo(rowDataProp.kichCo);
          setLoaiPizza(rowDataProp.loaiPizza);
          setDoUong(rowDataProp.idLoaiNuocUong);
          setThanhTien(rowDataProp.thanhTien);
          setHoTen(rowDataProp.hoTen);
          setSoDienThoai(rowDataProp.soDienThoai);
          setTrangThai(rowDataProp.trangThai);
     }, [openProp])

     const statusChange = (e) => {
          setTrangThai(e.target.value);
     }

     const handleCloseAlert = () => setAlert(false);

     const onBtnCancelClick = () => closeProp();

     const fetchAPIEditOrder = async (url, body) => {
          const res = await fetch(url, body);
          const data = await res.json();
          return data;
     }

     const onBtnEditOrderClick = () => {
          var updatedOrder = {
               trangThai: trangThai
          }
          const body = {
               method: 'PUT',
               body: JSON.stringify({
                    trangThai: updatedOrder.trangThai
               }),
               headers: {
                    'Content-type': 'application/json; charset=UTF-8'
               }
          }
          fetchAPIEditOrder("http://203.171.20.210:8080/devcamp-pizza365/orders/" + id, body)
               .then((data) => {
                    console.log(data);
                    setAlert(true);
                    setAlertColor("success");
                    setTextAlert("Cập nhật thông tin đơn hàng có ID " + id + " thành công!");
                    closeProp();
                    setRefreshPageProp(refreshPageProp + 1);
               })
               .catch((error) => {
                    console.error(error.message);
                    setAlert(true);
                    setTextAlert("Cập nhật đơn hàng có ID " + id + " thất bại!");
                    setAlertColor("error");
                    closeProp();
               })
     }

     return (
          <Container>
               <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                         <Modal
                              open={openProp}
                         >
                              <Box sx={style}>
                                   <Typography variant="h5" component="h2" textAlign={'center'}>
                                        <b>Sửa Đơn Hàng</b>
                                   </Typography>
                                   <Grid container mt={2}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>Order Code</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Order Code" value={orderCode} disabled></TextField>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} textAlign="center" pt={1}>
                                             <FormLabel>Kích Cỡ</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Kích Cỡ" value={kichCo} disabled></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>Loại Pizza</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Loại Pizza" value={loaiPizza} disabled></TextField>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} textAlign="center" pt={1}>
                                             <FormLabel>Đồ Uống</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Đồ Uống" value={doUong} disabled></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>Thành Tiền</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Thành Tiền" value={thanhTien} disabled></TextField>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} textAlign="center" pt={1}>
                                             <FormLabel>Họ Tên</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Họ Tên" value={hoTen} disabled></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>Số Điện Thoại</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Số Điện Thoại" value={soDienThoai} disabled></TextField>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} textAlign="center" pt={1}>
                                             <FormLabel>Trạng Thái</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <FormControl fullWidth>
                                                  <InputLabel>Trạng Thái</InputLabel>
                                                  <Select
                                                       value={trangThai}
                                                       label="Trạng Thái"
                                                       onChange={statusChange}
                                                  >
                                                       <MenuItem value={'open'}>Open</MenuItem>
                                                       <MenuItem value={'cancel'}>Cancel</MenuItem>
                                                       <MenuItem value={'confirmed'}>Confirmed</MenuItem>
                                                  </Select>
                                             </FormControl>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={2}>
                                        <Grid item xs={12} textAlign="end">
                                             <Button color="success" variant="contained" className="me-1" onClick={onBtnEditOrderClick}>Cập Nhật Đơn Hàng</Button>
                                             <Button color="error" variant="contained" onClick={onBtnCancelClick}>Huỷ</Button>
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
                    </Grid>
               </Grid>
          </Container>
     )
}