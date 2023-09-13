import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { $axios } from "../lib/axios";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: (values) => {
      return $axios.post("/user/register", values);
    },
    onSuccess: (res) => {
      navigate("/login");
    },
  });

  return (
    <>
      {isLoading && <Typography>Registering...</Typography>}
      {isError && (
        <Typography sx={{ color: "red" }}>
          {error.response.data.message}
        </Typography>
      )}
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          gender: "",
          location: "",
          role: "",
          confirmPassword: "",
        }}
        firstName
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required")
            .trim(),
          firstName: Yup.string()
            .max(55, "Must be 55 characters or less")
            .min(2, "Must be 2 characters or more")
            .required("First name is required")
            .trim(),
          lastName: Yup.string()
            .max(55, "Must be 55 characters or less")
            .min(2, "Must be 2 characters or more")
            .required("Last name is required")
            .trim(),
          password: Yup.string().required("Password is required"), //TODO:"pattern"
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),

          gender: Yup.string()
            .required("Gender is  required")
            .oneOf(["male", "female", "preferNotToSay"]),
          location: Yup.string()
            .min(2, "Must be 2 characters or more")
            .max(55, "Must be 55 characters or less")
            .required("Location is required"),

          role: Yup.string()
            .required("Role is required")
            .oneOf(["buyer", "seller"]),
        })}
        onSubmit={(values) => {
          delete values.confirmPassword;
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

            <TextField
              label="First name"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error-message">{formik.errors.firstName}</div>
            ) : null}

            <TextField
              label="Last name"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error-message">{formik.errors.lastName}</div>
            ) : null}

            <TextField label="Password" {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}

            <TextField
              label="Confirm password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-message">
                {formik.errors.confirmPassword}
              </div>
            ) : null}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                {...formik.getFieldProps("gender")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="error-message">{formik.errors.gender}</div>
            ) : null}

            <TextField label="Location" {...formik.getFieldProps("location")} />
            {formik.touched.location && formik.errors.location ? (
              <div className="error-message">{formik.errors.location}</div>
            ) : null}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role"
                {...formik.getFieldProps("role")}
              >
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.role && formik.errors.role ? (
              <div className="error-message">{formik.errors.role}</div>
            ) : null}

            <Button type="submit" variant="contained" color="success">
              Sign up
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
