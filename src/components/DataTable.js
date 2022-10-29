import { Container, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPIOrders, paginationAction } from "../actions/DataTableAction";
import CreateOrderModal from "./ModalCreate";
import DeleteOrderModal from "./ModalDelete";
import EditOrderModal from "./ModalEdit";

export default function DataTable() {
     const dispatch = useDispatch();

     const { orders, totalPage, currentPage } = useSelector((reduxData) => reduxData.DataTableReducers);

     const [createModal, setCreateModal] = useState(false);
     const [editModal, setEditModal] = useState(false);
     const [deleteModal, setDeleteModal] = useState(false);

     const [refreshPage, setRefreshPage] = useState(0);

     const [rowData, setRowData] = useState([]);
     const [IDDelete, setIDDelete] = useState("");

     useEffect(() => {
          dispatch(fetchAPIOrders());
     }, [currentPage, refreshPage])

     const handlePageChange = (event, value) => {
          dispatch(paginationAction(value));
     }

     const createOrderButtonClick = () => {
          setCreateModal(true);
     }

     const closeCreateModal = () => {
          setCreateModal(false);
     }

     const onBtnEditClick = (order) => {
          setEditModal(true);
          setRowData(order);
     }

     const closeEditModal = () => setEditModal(false);

     const onBtnDeleteClick = (order) => {
          setDeleteModal(true);
          setIDDelete(order.id);
     }

     const closeDeleteModal = () => setDeleteModal(false);

     return (
          <Container maxWidth>
               <Grid container mt={4}>
                    <Grid item xs={12} sm={12} md={12} lg={12} textAlign='center'>
                         <h3><b>Danh Sách Đơn Hàng</b></h3>
                    </Grid>
               </Grid>
               <Grid container mt={4}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                         <Button color="success" variant="contained" onClick={createOrderButtonClick}>Tạo Đơn Hàng</Button>
                    </Grid>
               </Grid>
               <Grid container mt={4}>
                    <TableContainer component={Paper}>
                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                   <TableRow>
                                        <TableCell align="center"><b>ID</b></TableCell>
                                        <TableCell align="center"><b>Order Code</b></TableCell>
                                        <TableCell align="center"><b>Kích Cỡ</b></TableCell>
                                        <TableCell align="center"><b>Loại Pizza</b></TableCell>
                                        <TableCell align="center"><b>Nước Uống</b></TableCell>
                                        <TableCell align="center"><b>Thành Tiền</b></TableCell>
                                        <TableCell align="center"><b>Họ Và Tên</b></TableCell>
                                        <TableCell align="center"><b>Số Điện Thoại</b></TableCell>
                                        <TableCell align="center"><b>Trạng Thái</b></TableCell>
                                        <TableCell align="center"><b>Hành Động</b></TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {orders.map((order, index) => (
                                        <TableRow
                                             key={index}
                                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                             <TableCell component="th" scope="row">
                                                  {order.id}
                                             </TableCell>
                                             <TableCell align="center">{order.orderCode}</TableCell>
                                             <TableCell align="center">{order.kichCo}</TableCell>
                                             <TableCell align="center">{order.loaiPizza}</TableCell>
                                             <TableCell align="center">{order.idLoaiNuocUong}</TableCell>
                                             <TableCell align="center">{order.thanhTien}</TableCell>
                                             <TableCell align="center">{order.hoTen}</TableCell>
                                             <TableCell align="center">{order.soDienThoai}</TableCell>
                                             <TableCell align="center">{order.trangThai}</TableCell>
                                             <TableCell align="center">
                                                  <Button variant="contained" style={{ marginRight: "2px" }} onClick={() => onBtnEditClick(order)}>Sửa Đơn Hàng</Button>
                                                  <Button variant="contained" style={{ marginLeft: "2px", background: "red" }} onClick={() => onBtnDeleteClick(order)}>Hủy Đơn Hàng</Button>
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>
                    </TableContainer>
               </Grid>
               <Grid container justifyContent='end' className="mt-3 mb-4">
                    <Pagination count={totalPage} defaultPage={currentPage} onChange={handlePageChange} />
               </Grid>
               <CreateOrderModal
                    openProp={createModal}
                    closeProp={closeCreateModal}
                    refreshPageProp={refreshPage}
                    setRefreshPageProp={setRefreshPage} />

               <EditOrderModal
                    openProp={editModal}
                    closeProp={closeEditModal}
                    rowDataProp={rowData}
                    refreshPageProp={refreshPage}
                    setRefreshPageProp={setRefreshPage} />

               <DeleteOrderModal
                    openProp={deleteModal}
                    closeProp={closeDeleteModal}
                    IDDeleteProp={IDDelete}
                    refreshPageProp={refreshPage}
                    setRefreshPageProp={setRefreshPage} />
          </Container>
     )
}