import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Pagination,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, userDelete } from "../Actions/UserAction";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { reset } from "../Actions/AuthAction";
import "../Styles/User.css";
import { toast } from 'react-toastify';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user_data, loading, isModified, isDeleted } = useSelector(
    (state) => state.user
  );

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [view, setView] = useState("table");

  const usersPerPage = 5;

  useEffect(() => {   
    if (!(isModified || isDeleted)) {
      dispatch(getUsers(token));
    }
  }, [token]);

  useEffect(() => {
    if (user_data?.length > 0) {
      const filtered = user_data.filter(
        (user) =>
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchText, user_data]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  function handleNavigation(user_id) {
    if (user_id) {
      navigate(`/AddEdit_user/${user_id}`);
    } else {
      navigate("/AddEdit_user");
    }
  }

  function handleLogout() {
    toast.info("Logged Out Sucessfully.");
    navigate("/");
    dispatch(reset());
  }
  function handleDelete(user_id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      dispatch(userDelete(user_id));
    }
  }

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "#011627", height: 64 }}>
        <Toolbar className="user-toolbar">
          <Typography variant="h6" color="white">
            Users
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginRight: "15px",
            }}
          >
            <Typography
              variant="subtitle1"
              color="white"
              className="user-name"
            >
              Elon Musk
            </Typography>
            <IconButton>
              <LogoutIcon
                className="logoutButton"
                onClick={() => handleLogout()}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

     
      <Box p={5} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Users
            </Typography>
            <Box display="flex" gap={2}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="input search text"
                value={searchText}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                }}
                onClick={() => handleNavigation()}
              >
                Create User
              </Button>
            </Box>
          </Box>

          <Box mb={2}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(e, newView) => newView && setView(newView)}
              size="small"
            >
              <ToggleButton value="table" sx={{ textTransform: "none" }}>
                <ViewModuleIcon sx={{ mr: 1 }} /> Table
              </ToggleButton>
              <ToggleButton value="card" sx={{ textTransform: "none" }}>
                <ViewListIcon sx={{ mr: 1 }} /> Card
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {view === "table" && (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ textAlign: "center", fontWeight: 600 }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>First Name</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      display: {
                        xs: "none",
                        sm: "table-cell",
                        md: "table-cell",
                      },
                    }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      display: { xs: "none", sm: "none", md: "table-cell" },
                    }}
                  >
                    Action{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box width={"30%"} sx={{ paddingLeft: "100px" }}>
                          <Avatar
                            src={user.avatar}
                            alt={user.first_name}
                            sx={{ width: 36, height: 36 }}
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{ color: "#1976d2", fontWeight: 500 }}
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.first_name}</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: {
                          xs: "none",
                          sm: "table-cell",
                          md: "table-cell",
                        },
                      }}
                    >
                      <Typography variant="body2">{user.last_name}</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", sm: "none", md: "table-cell" },
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1, textTransform: "none", borderRadius: 1 }}
                        onClick={() => handleNavigation(user.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ textTransform: "none", borderRadius: 1 }}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {view === "card" && (
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              }}
              gap={2}
            >
              {paginatedData.map((user) => (
                <Box
                  key={user.id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: "#fff",
                    transition: "0.3s",
                    position: "relative",
                    "&:hover .actions": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.first_name}
                      sx={{ width: 64, height: 64 }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body2" className="card-email">
                      {user.email}
                    </Typography>
                  </Box>

                  <Box className="actions">

                    <IconButton sx={{ bgcolor: "#fff" }}   onClick={() => handleNavigation(user.id)}>                
                       <ViewListIcon sx={{ color: "#1976d2" }} />
                    </IconButton>

                    <IconButton
                      sx={{ bgcolor: "#fff" }}
                      onClick={() => handleDelete(user.id)}
                    >
                      <Avatar
                        sx={{ bgcolor: "#f44336", width: 28, height: 28 }}
                      >
                        🗑️
                      </Avatar>
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Pagination */}
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Pagination
              className="custom-pagination .MuiPaginationItem-root"      
              count={Math.ceil(filteredData.length / usersPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}                     
            />
          </Box>
        </Paper>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress color="inherit" />
          <Typography variant="body1">Loading...</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}

export default User;
