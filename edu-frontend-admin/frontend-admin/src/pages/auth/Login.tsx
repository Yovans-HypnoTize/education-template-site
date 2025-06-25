import { useEffect, useState } from "react";
import { OutlinedInput, FormControl, InputAdornment, IconButton, Checkbox } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import { loginSchema } from "../../utils/validationSchemas";
import { useNavigate } from "react-router-dom";
import EdumaatLogo from "../../assets/Edumaat-Logo.png";
import CustomButton from "../../components/CustomButton";
import { useAppDispatch } from "../../app/hooks";
import { LoginAction, startLoading, stopLoading } from "./features/authSlice";
import { notifyError, notifySuccess } from "../../utils/toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const forgotPasswordClickHandler = () => {
    navigate("/forgot-password");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const handleLogin = (values: any) => {
    dispatch(startLoading());
    dispatch(LoginAction(values))
      .then((res: any) => {
        if (res.type.includes("fulfilled")) {
          notifySuccess("Login successful");
          navigate("/");
        } else {
          console.log("Login failed", res);
          notifyError(res?.payload?.message || "Login failed");
        }
      })
      .finally(() => dispatch(stopLoading()));
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-lg ">
          <div className="flex justify-center">
            <img src={EdumaatLogo} alt="random logo" className="w-20 h-20 mb-4" />
          </div>
          <div className=" p-4">
            <Formik
              initialValues={{ email: "", password: "", rememberMe: true }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  {/* email */}
                  <div className="mb-4">
                    <FormControl fullWidth>
                      <OutlinedInput
                        id="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                      />
                    </FormControl>
                    {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Password */}
                  <div className="mb-2">
                    <FormControl fullWidth>
                      <OutlinedInput
                        id="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {touched.password && errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div className="flex justify-end mb-7">
                    {/* <div className="flex items-center">
                      <Checkbox
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                      />{" "}
                      <span>Remember me</span>
                    </div> */}
                    {/* <button
                      type="button"
                      className="  text-[#5580FF] rounded transition cursor-pointer "
                      onClick={forgotPasswordClickHandler}
                    >
                      Forgot Password?
                    </button> */}
                  </div>
                  <div className="mb-4">
                    <CustomButton title="LOGIN" key="login" type="submit" />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
