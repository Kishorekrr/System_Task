import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Actions/AuthAction";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const [formvalue, setFormvalues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(true);
  const { token, error, loading } = useSelector((state) => state.auth);

  console.log(token, error, loading);
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/users');
    }
    else if(error){
      console.log('error',error)
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error, 
      }));
    }
  }, [token, navigate,error]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormvalues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

 const handleLogin = (event) => {
  event.preventDefault();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;
  const newErrors = { email: '', password: '' };

  if (!formvalue.email) {
    newErrors.email = 'Email is required';
    valid = false;
  } else if (!emailRegex.test(formvalue.email)) {
    newErrors.email = 'Enter a valid email';
    valid = false;
  }

  if (!formvalue.password) {
    newErrors.password = 'Password is required';
    valid = false;
  } else if (formvalue.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
    valid = false;
  }
  else if(formvalue.password!=="cityslicka"){                 //handling password validation on the frontend because the API does not perform this validation
    newErrors.password = 'Invalid password credentials';
    valid = false;
  }

  setErrors(newErrors);

  if (valid) {
    Dispatch(loginUser(formvalue));
  }
};

  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#e0e0e0" }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "30%", borderRadius: 2 }}>
        <TextField
          name="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={formvalue.email}
          placeholder="Enter you Email..."
          onChange={(event) => handleChange(event)}
          error={Boolean(errors.email)} 
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formvalue.password}
          placeholder="Enter you Password..."
          error={Boolean(errors.password)} 
          helperText={errors.password} 
          onChange={(event) => handleChange(event)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlineIcon></LockOutlineIcon>
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" justifyContent="flex-start" mt={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{ color: "#2196f3" }}
              />
            }
            label="Remember me"
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#2196f3" }}
          onClick={(event) => handleLogin(event)}
        >
          Log in
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginForm;
