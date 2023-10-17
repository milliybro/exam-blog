import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import "./style.scss";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import { useFormik } from "formik";
import registerSchema from "../../schemas/register";
import request from "../../server";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../../const";
import { toast } from "react-toastify";

import "./style.scss";
const AccountEdit = () => {
  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      confirm: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        if (values.password === values.confirm) {
          const {
            data: { token, role },
          } = await request.post(`/auth/register`, values);
          if (role === "user") {
            navigate("/my-posts");
          } else {
            navigate("/dashboard");
          }
          Cookies.set(TOKEN, token);
          localStorage.setItem(ROLE, role);
          toast.success("You are registrated !");
          navigate("/login");
        } else {
          toast.error("Please confirm your password");
        }
      } catch (err) {
        toast.error(err.response.data);
      }
    },
  });
  return (
    <div className=" container editAccount">
      <Tabs>
        <TabList className="tablist">
          <Tab>Data Edit</Tab>
          <Tab>Password Edit</Tab>
        </TabList>

        <TabPanel>
          <div className="editUser">
            <form
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              className=""
            >
              <div className="edit-inputs">
              <div className="imgedit">
                <img className="editUserImg" src={file} />
                <input
                  className="editUserInput"
                  type="file"
                  onChange={handleChange}
                />
              </div>
              <div className="edit-acc-inputs">
                <div>
                  <label htmlFor="">First Name</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    className="login-input"
                  />
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <p className="error-message">{formik.errors.first_name}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="">Last Name</label>

                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    className="login-input"
                  />
                  {formik.touched.last_name && formik.errors.last_name ? (
                    <p className="error-message">{formik.errors.last_name}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="">Username</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    required
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="login-input"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <p className="error-message">{formik.errors.username}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="">Info</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.info}
                    required
                    name="info"
                    type="text"
                    placeholder="Information"
                    className="login-input"
                  />
                  {formik.touched.info && formik.errors.info ? (
                    <p className="error-message">{formik.errors.info}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="">Phone Number</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    required
                    name="info"
                    type="text"
                    placeholder="Phone Number"
                    className="login-input"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <p className="error-message">{formik.errors.phoneNumber}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="">Birthday</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthday}
                    required
                    name="birthday"
                    type="text"
                    placeholder="Birthday"
                    className="login-input"
                  />
                  {formik.touched.birthday && formik.errors.birthday ? (
                    <p className="error-message">{formik.errors.birthday}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="">Address</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    required
                    name="address"
                    type="text"
                    placeholder="Address"
                    className="login-input"
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <p className="error-message">{formik.errors.address}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="">Email</label>

                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="login-input"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="error-message">{formik.errors.email}</p>
                  ) : null}
                </div>
              </div>
              </div>

              <input
                className="login-btn"
                type="submit"
                value="Save"
                onClick={() => {}}
              />
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AccountEdit;
