import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed")
    .min(2, "Name must be between 2 and 16 characters")
    .max(16, "Name must be between 2 and 16 characters"),
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address."),
  status: Yup.string().max(64, "Status must be less than 64 characters."),
  password: Yup.string().required("Password is required."),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address."),
  password: Yup.string().required("Password is required."),
});
