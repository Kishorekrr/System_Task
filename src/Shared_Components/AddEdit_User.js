import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { CreateUser, reset, EditUser } from "../Actions/UserAction";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const AddEdit_User = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { post_created, user_data, isEdited } = useSelector(
    (state) => state.user
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {

    if (post_created || isEdited) {
      setOpenSnackbar(true);     
    }

    const timeout = setTimeout(() => {
      dispatch(reset());
    }, 3000);
  }, [post_created, isEdited]);

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    });
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    });
  };

  const hanldeBackNavigation = () => {
    navigate("/users");
  };

  const { id } = useParams();

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) {      
      const numericId = Number(id);
      const existingUser = user_data.find((user) => user.id === numericId);
      if (existingUser) {
        setFormData({
          firstName: existingUser.first_name,
          lastName: existingUser.last_name,
          email: existingUser.email,
          avatar: existingUser.avatar,
        });
      }
    }
  }, [id]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateURL = (url) => /^(ftp|http|https):\/\/[^ "]+$/.test(url);

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    };

    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
      hasError = true;
    } else if (formData.firstName.length < 6) {
      newErrors.firstName = "First name must be at least 6 characters.";
      hasError = true;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
      hasError = true;
    } else if (formData.lastName.length < 4) {
      newErrors.lastName = "Last name must be at least 5 characters.";
      hasError = true;
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      hasError = true;
    }

    if (!formData.avatar) {
      newErrors.avatar = "Profile image link is required.";
      hasError = true;
    } else if (!validateURL(formData.avatar)) {
      newErrors.avatar = "Enter a valid URL.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      if (isEditMode) {
        dispatch(EditUser(formData, id));
      } else {
        dispatch(CreateUser(formData, token));
      }
      handleClear();
    }
  };
  return (
    <Box
      sx={{
        width: 600,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
        >
          {isEdited
            ? "Form edited successfully!"
            : post_created
            ? "Form submitted successfully!"
            : null}
        </Alert>
      </Snackbar>

      <Box sx={{ flex: 1, overflowY: "auto", padding: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight={600}>
            {isEditMode ? "Edit User" : "Create New User"}
          </Typography>
          <IconButton>
            <CloseIcon onClick={() => hanldeBackNavigation()} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box display="flex" flexDirection="column" gap={3}>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              <span style={{ color: "red" }}>*</span> First Name
            </Typography>
            <TextField
              name="firstName"
              placeholder="Please enter first name"
              fullWidth
              variant="outlined"
              size="small"
              value={formData.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500}>
              <span style={{ color: "red" }}>*</span> Last Name
            </Typography>
            <TextField
              name="lastName"
              placeholder="Please enter last name"
              fullWidth
              variant="outlined"
              size="small"
              value={formData.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500}>
              <span style={{ color: "red" }}>*</span> Email
            </Typography>
            <TextField
              name="email"
              placeholder="Please enter email"
              fullWidth
              variant="outlined"
              size="small"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500}>
              <span style={{ color: "red" }}>*</span> Profile Image Link
            </Typography>
            <TextField
              name="avatar"
              placeholder="Please enter profile image link"
              fullWidth
              variant="outlined"
              size="small"
              value={formData.avatar}
              onChange={handleChange}
              error={Boolean(errors.avatar)}
              helperText={errors.avatar}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          padding: 2,
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          backgroundColor: "#fff",
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "none" }}
          onClick={() => handleClear()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddEdit_User;
