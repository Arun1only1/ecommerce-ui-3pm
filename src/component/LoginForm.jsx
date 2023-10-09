import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { $axios } from "../lib/axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openErrorSnackbar } from "../store/slice/snackbarSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => await $axios.post("/user/login", values),
    onSuccess: (res) => {
      localStorage.setItem("accesstoken", res?.data?.token);
      localStorage.setItem("firstName", res?.data?.user?.firstName);
      localStorage.setItem("userRole", res?.data?.user?.role);
      localStorage.setItem("lastName", res?.data?.user?.lastName);
      navigate("/product");
    },
    onError: (error) => {
      console.log(error.response);
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required")
            .trim(),

          password: Yup.string().required("Password is required"),
        })}
        onSubmit={async (values) => {
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <TextField label="Email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                {...formik.getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isLoading}
            >
              Sign in
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
