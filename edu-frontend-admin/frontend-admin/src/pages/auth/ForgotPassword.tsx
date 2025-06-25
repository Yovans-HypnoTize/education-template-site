import { OutlinedInput, FormControl } from "@mui/material";
import { Formik } from "formik";
import { loginSchema } from "../../utils/validationSchemas";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EdumaatLogo from "../../assets/Edumaat-Logo.png";
import CustomButton from "../../components/CustomButton";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const backToLoginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full flex items-center justify-center ">
        <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img
              src={EdumaatLogo}
              alt="random logo"
              className="w-20 h-20 mb-4"
            />
          </div>
          <h3 className="text-2xl font-bold mb-1 text-[#5580FF] text-center">
            Forgot your password?
          </h3>
          <div className=" p-4 mt-5">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                localStorage.setItem("token", "access");
                navigate("/");
                console.log("submit values", values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-10">
                    <FormControl fullWidth>
                      <OutlinedInput
                        id="email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                      />
                    </FormControl>
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <CustomButton title="SUBMIT" type="submit" />
                  <button
                    type="button"
                    className="w-full  text-[#5580FF] py-3 rounded  transition cursor-pointer mt-3"
                    onClick={backToLoginHandler}
                  >
                    <KeyboardBackspaceIcon /> Back to Login
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
