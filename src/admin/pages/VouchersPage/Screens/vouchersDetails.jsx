import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./table.module.css";
import { Image } from "react-bootstrap";

import SearchIcon from "@mui/icons-material/Search";
import Form from "react-bootstrap/Form";

function VouchersDetails() {
  const [voucher, setVoucher] = useState([]);
  let { id, productId } = useParams();
  const [products, setProducts] = useState([]);
  const [userQuery, setUserQuery] = useState("");

  useEffect(() => {
    if (userQuery === "") {
      loadProducts();
      // setProducts(voucher.products);
    } else {
      searchProduct();
    }
  }, [userQuery]);

  const handleChangeUserQuery = (e) => {
    setUserQuery(e.target.value);
  };

  const searchProduct = () => {
    axios
      .get(`https://dialuxury.onrender.com/product/search?query=${userQuery}`)
      .then((response) => {
        // console.log(
        //   `https://dialuxury.onrender.com/product/search?query=${userQuery}`
        // );
        setProducts(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProducts = async () => {
    axios
      .get(`https://dialuxury.onrender.com/vouchers/${id}`)
      .then((response) => {
        setVoucher(response.data);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const calculateTotal = (price, amount) => {
    return price * amount;
  };

  let navigate = useNavigate();

  const deleteProduct = (productId) => {
    axios
      .delete(
        `https://dialuxury.onrender.com/vouchers/${id}/product/${productId}`
      )
      .then((response) => {
        //Load lại các sản phẩm:
        loadProducts();
        console.log("Sản phẩm đã được xóa thành công");
      })
      .catch((error) => {
        // Xử lý lỗi từ API
        console.error("Lỗi khi xóa sản phẩm:", error);
      });
  };
  return (
    <Container fluid>
      <div className={"border-l-3 py-4"}>
        <h3 style={{ color: "#646161" }}>Chi tiết phiếu mua hàng</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: "20px",
            marginTop: "20px",
          }}
        >
          {" "}
          <Form className={"d-flex text-center"}>
            <Form.Control
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className={"me-2 " + styles.formcontrol}
              aria-label="Search"
              value={userQuery}
              onChange={handleChangeUserQuery}
            />

            <Button
              variant="primary"
              disabled="True"
              // className={styles.button}
              // onClick={() => {
              //   navigate(`/admin/productsPage?query=${userQuery}`);
              // }}
            >
              <SearchIcon />
            </Button>
          </Form>
          <Button
            variant="primary"
            onClick={() => {
              return navigate(`/admin/vouchersPage/${id}/add`);
              // { handleEditClick }
            }}
          >
            Thêm mới
          </Button>{" "}
        </div>
        <br></br>
        <TableContainer component={Paper} className={styles.table}>
          <Table sx={{ minWidth: 1200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  STT
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Mã Sản phẩm
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Tên Sản phẩm
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Ảnh Sản phẩm
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Loại sản phẩm
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Số lượng
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Đơn vị tính
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Giá Sản Phẩm
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Thành tiền
                </TableCell>
                <TableCell
                  className={styles.tableCell + " text-center"}
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  Hoạt động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product, index) => (
                <TableRow key={product.index}>
                  <TableCell className={styles.tableCell + " text-center"}>
                    {index + 1}
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    {product.productid}
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    {product.name}
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    <Image
                      src={product.image}
                      roundedCircle="true"
                      style={{ width: "50px", height: "50px" }}
                    ></Image>
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    {product.category}
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    {product.amount}
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    {product.Unit}
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    {product.price}
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    {calculateTotal(product.price, product.amount)}
                  </TableCell>
                  <TableCell className={styles.tableCell + " text-center"}>
                    <div className="d-flex">
                      <Button
                        variant="warning"
                        className="me-1"
                        onClick={() => {
                          return navigate(
                            `/admin/vouchersPage/${id}/edit/${product._id}`
                          );
                          // { handleEditClick }
                        }}
                      >
                        Sửa
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Xóa
                      </Button>{" "}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default VouchersDetails;
