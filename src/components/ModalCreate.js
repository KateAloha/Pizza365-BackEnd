import { Grid, Modal, Box, Typography, FormLabel, TextField, Select, MenuItem, FormControl, Button, InputLabel, Snackbar, Alert } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { comboSize, pizzaType, voucherId, fullName, emailOrder, phone, address, message } from "../actions/CreateModalActions";
import { fetchAPIDrinks, selectDrink } from "../actions/DrinksAction";
import ConfirmCreateOrderModal from "./ModalConfirmedOrder";

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

export default function ModalCreate({ openProp, closeProp, refreshPageProp, setRefreshPageProp }) {
     const dispatch = useDispatch();

     const { drinks, drinkSelected } = useSelector((data) => data.DrinksReducer);


     const { kichCo, loaiPizza, voucher, hoTen, email, soDienThoai, diaChi, loiNhan } = useSelector((data) => data.CreateModalReducers);

     const [alert, setAlert] = useState(false);
     const [textAlert, setTextAlert] = useState("");
     const [alertColor, setAlertColor] = useState("");

     const [duongKinh, setDuongKinh] = useState("");
     const [suon, setSuon] = useState("");
     const [salad, setSalad] = useState("");
     const [soLuongNuoc, setSoLuongNuoc] = useState("");
     const [thanhTien, setThanhTien] = useState("");



     const [confirmCreateOrderModal, setConfirmCreateOrderModal] = useState(false);
     const [orderCode, setOrderCode] = useState("");

     useEffect(() => {
          dispatch(fetchAPIDrinks());
     }, [])

     const drinkChange = (e) => {
          dispatch(selectDrink(e.target.value));
     }

     const sizeSelectChange = (e) => {
          dispatch(comboSize(e.target.value));
          if (e.target.value === "S") {
               setDuongKinh(20);
               setSuon(2);
               setSalad(200);
               setSoLuongNuoc(2);
               setThanhTien(150000);
          }
          if (e.target.value === "M") {
               setDuongKinh(25);
               setSuon(4);
               setSalad(300);
               setSoLuongNuoc(3);
               setThanhTien(200000);
          }
          if (e.target.value === "L") {
               setDuongKinh(30);
               setSuon(8);
               setSalad(400);
               setSoLuongNuoc(4);
               setThanhTien(250000);
          }
     }

     const pizzaTypeSelectChange = (e) => {
          dispatch(pizzaType(e.target.value))
     }

     const inputVoucherChange = (e) => {
          dispatch(voucherId(e.target.value))
          var addOrder = {
               kichCo: kichCo,
               duongKinh: duongKinh,
               suon: suon,
               salad: salad,
               loaiPizza: loaiPizza,
               idVourcher: voucher,
               idLoaiNuocUong: drinkSelected,
               soLuongNuoc: soLuongNuoc,
               hoTen: hoTen,
               thanhTien: thanhTien,
               email: email,
               soDienThoai: soDienThoai,
               diaChi: diaChi,
               loiNhan: loiNhan,
               phanTramGiamGia: 0,
          }
          if (addOrder.idVourcher === "12332" || addOrder.idVourcher === "81433" || addOrder.idVourcher === "95531") {
               fetchAPIVoucher("http://203.171.20.210:8080/devcamp-pizza365/vouchers/" + addOrder.idVourcher)
                    .then((data) => {
                         console.log(data)
                         addOrder.phanTramGiamGia = data.discount
                         addOrder.thanhTien = addOrder.thanhTien * (1 - addOrder.phanTramGiamGia / 100)
                         console.log(addOrder.thanhTien)
                         setThanhTien(addOrder.thanhTien)
                         setAlert(true);
                         setTextAlert("Voucher H???p L???!");
                         setAlertColor("success");
                    })
                    .catch((error) => {
                         setAlert(true);
                         setTextAlert("Voucher Kh??ng H???p L???!");
                         setAlertColor("error");
                    })
          }
          else {
               addOrder.phanTramGiamGia = 0;
               addOrder.thanhTien = addOrder.thanhTien * (1 - addOrder.phanTramGiamGia / 100);
               setThanhTien(addOrder.thanhTien)
               setAlert(true);
               setTextAlert("Voucher Kh??ng H???p L???!");
               setAlertColor("error");
          };
     }

     const inputNameChange = (e) => {
          dispatch(fullName(e.target.value))
     }

     const inputEmailChange = (e) => {
          dispatch(emailOrder(e.target.value))
     }

     const inputPhoneChange = (e) => {
          dispatch(phone(e.target.value))
     }

     const inputAddressChange = (e) => {
          dispatch(address(e.target.value))
     }

     const inputMessageChange = (e) => {
          dispatch(message(e.target.value))
     }

     const handleCloseAlert = () => {
          setAlert(false);
     }

     const onBtnCancelClick = () => {
          closeProp();
     }

     const fetchAPICreateOrder = async (url, body) => {
          const res = await fetch(url, body);
          const data = await res.json();
          return data;
     }

     const fetchAPIVoucher = async (url, body) => {
          const res = await fetch(url, body);
          const data = await res.json();
          return data;
     }

     const onBtnCreateOrderClick = () => {
          var addOrder = {
               kichCo: kichCo,
               duongKinh: duongKinh,
               suon: suon,
               salad: salad,
               loaiPizza: loaiPizza,
               idVourcher: voucher,
               idLoaiNuocUong: drinkSelected,
               soLuongNuoc: soLuongNuoc,
               hoTen: hoTen,
               thanhTien: thanhTien,
               email: email,
               soDienThoai: soDienThoai,
               diaChi: diaChi,
               loiNhan: loiNhan,
               phanTramGiamGia: 0,
          }
          var validateData = validateNewOrderData(addOrder);
          if (validateData) {
               const body = {
                    method: 'POST',
                    body: JSON.stringify({
                         kichCo: addOrder.kichCo,
                         duongKinh: addOrder.duongKinh,
                         suon: addOrder.suon,
                         salad: addOrder.salad,
                         loaiPizza: addOrder.loaiPizza,
                         idVourcher: addOrder.idVourcher,
                         idLoaiNuocUong: addOrder.idLoaiNuocUong,
                         soLuongNuoc: addOrder.soLuongNuoc,
                         hoTen: addOrder.hoTen,
                         thanhTien: addOrder.thanhTien,
                         email: addOrder.email,
                         soDienThoai: addOrder.soDienThoai,
                         diaChi: addOrder.diaChi,
                         loiNhan: addOrder.loiNhan,
                    }),
                    headers: {
                         'Content-type': 'application/json; charset=UTF-8'
                    }
               }
               fetchAPICreateOrder("http://203.171.20.210:8080/devcamp-pizza365/orders", body)
                    .then((data) => {
                         console.log(data)
                         closeProp();
                         setConfirmCreateOrderModal(true);
                         setAlert(true);
                         setTextAlert("T???o m???i ????n h??ng th??nh c??ng!");
                         setAlertColor("success");
                         setOrderCode(data.orderCode);
                    })
                    .catch((err) => {
                         setAlert(true);
                         setTextAlert("T???o m???i ????n h??ng th???t b???i!");
                         setAlertColor("error");
                    })
          }
     }

     const validateNewOrderData = (addOrder) => {
          if (addOrder.kichCo === "") {
               setAlert(true);
               setTextAlert("Vui l??ng ch???n combo !");
               setAlertColor("error");
               return false;
          }

          if (addOrder.loaiPizza === "") {
               setAlert(true);
               setTextAlert("Vui l??ng ch???n lo???i Pizza !");
               setAlertColor("error");
               return false;
          }

          if (addOrder.idLoaiNuocUong === "") {
               setAlert(true);
               setTextAlert("Vui l??ng ch???n ????? u???ng !");
               setAlertColor("error");
               return false;
          }

          if (addOrder.hoTen === "") {
               setAlert(true);
               setTextAlert("Vui l??ng ??i???n h??? v?? t??n !");
               setAlertColor("error");
               return false;
          }

          if (addOrder.email === "") {
               setAlert(true);
               setTextAlert("Vui l??ng ??i???n email !");
               setAlertColor("error");
               return false;
          }

          var vRegexStr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!vRegexStr.test(addOrder.email)) {
               setAlert(true);
               setTextAlert("Email b???n v???a nh???p ch??a h???p l??? !");
               setAlertColor("error");
               return false;
          }

          if (addOrder.soDienThoai === "") {
               setAlert(true);
               setTextAlert("Vui l??ng ??i???n S??T !");
               setAlertColor("error");
               return false;
          }

          if (addOrder.diaChi === "") {
               setAlert(true);
               setTextAlert("Vui l??ng ??i???n ?????a ch??? !");
               setAlertColor("error");
               return false;
          }
          return true;

     }

     const closeConfirmCreateOrderModal = () => {
          setConfirmCreateOrderModal(false);
     }

     return (
          <Container>
               <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                         <Modal open={openProp}>
                              <Box sx={style}>
                                   <Typography variant="h5" component="h2" textAlign={'center'}>
                                        <b>T???o ????n H??ng M???i</b>
                                   </Typography>
                                   <Grid container mt={2}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>K??ch C???</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <FormControl fullWidth>
                                                  <InputLabel>-- Ch???n Lo???i Combo --</InputLabel>
                                                  <Select
                                                       value={kichCo}
                                                       label="K??ch C???"
                                                       onChange={sizeSelectChange}
                                                  >
                                                       <MenuItem value={'S'}>Small</MenuItem>
                                                       <MenuItem value={'M'}>Medium</MenuItem>
                                                       <MenuItem value={'L'}>Large</MenuItem>
                                                  </Select>
                                             </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1} pl={2}>
                                             <FormLabel>???????ng K??nh</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="???????ng K??nh" value={duongKinh} onChange={sizeSelectChange} disabled></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>S?????n N?????ng</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="S?????n N?????ng" value={suon} onChange={sizeSelectChange} disabled></TextField>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pl={2} pt={1}>
                                             <FormLabel>Salad</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Salad" value={salad} onChange={sizeSelectChange} disabled></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>S??? L?????ng N?????c</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="S??? L?????ng N?????c" value={soLuongNuoc} onChange={sizeSelectChange} disabled></TextField>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pl={2} pt={1}>
                                             <FormLabel>Th??nh Ti???n</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Th??nh Ti???n" value={thanhTien} onChange={sizeSelectChange} disabled></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>Lo???i Pizza</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <FormControl fullWidth>
                                                  <InputLabel> -- Ch???n Lo???i Pizza --</InputLabel>
                                                  <Select
                                                       value={loaiPizza}
                                                       label="Lo???i Pizza"
                                                       onChange={pizzaTypeSelectChange}
                                                  >
                                                       <MenuItem value={'Seafood'}>H???i S???n</MenuItem>
                                                       <MenuItem value={'Hawaii'}>Hawaii</MenuItem>
                                                       <MenuItem value={'Bacon'}>Th???t Hun Kh??i</MenuItem>
                                                  </Select>
                                             </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pl={2} pt={1}>
                                             <FormLabel>Voucher</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Voucher" onChange={inputVoucherChange} value={voucher}></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>Lo???i N?????c U???ng</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <FormControl fullWidth>
                                                  <InputLabel>-- Ch???n Lo???i N?????c U???ng --</InputLabel>
                                                  <Select
                                                       value={drinkSelected}
                                                       label="Lo???i N?????c"
                                                       onChange={drinkChange}
                                                  >
                                                       {drinks.map((drink, index) => {
                                                            return <MenuItem key={index} value={drink.maNuocUong}>{drink.tenNuocUong}</MenuItem>
                                                       })}
                                                  </Select>
                                             </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pl={2} pt={1}>
                                             <FormLabel>H??? T??n</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="H??? T??n" onChange={inputNameChange} value={hoTen}></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>Email</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="Email" onChange={inputEmailChange} value={email}></TextField>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pl={2} pt={1}>
                                             <FormLabel>S??? ??i???n Tho???i</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="S??? ??i???n Tho???i" onChange={inputPhoneChange} value={soDienThoai}></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={1}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pt={1}>
                                             <FormLabel>?????a Ch???</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField fullWidth variant="outlined" label="?????a Ch???" onChange={inputAddressChange} value={diaChi}></TextField>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2} pl={2} pt={1}>
                                             <FormLabel>L???i Nh???n</FormLabel>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                             <TextField
                                                  fullWidth variant="outlined"
                                                  label="L???i Nh???n"
                                                  onChange={inputMessageChange}
                                                  value={loiNhan}></TextField>
                                        </Grid>
                                   </Grid>
                                   <Grid container mt={2}>
                                        <Grid item xs={12} textAlign="end">
                                             <Button color="success" variant="contained" className="me-1" onClick={onBtnCreateOrderClick}>T???o ????n H??ng</Button>
                                             <Button color="error" variant="contained" onClick={onBtnCancelClick}>H???y</Button>
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
                    <ConfirmCreateOrderModal
                         openConfirmProp={confirmCreateOrderModal}
                         closeConfirmProp={closeConfirmCreateOrderModal}
                         orderCodeProp={orderCode}
                         refreshPageProp={refreshPageProp}
                         setRefreshPageProp={setRefreshPageProp} />
               </Grid>
          </Container>

     )
}