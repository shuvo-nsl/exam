import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { changePasswod, updateUser } from "../../api/auth";
import { Form, FormGroup, Label ,Input, Button } from "reactstrap";
import { userInfo } from "../../utils/auth";
import {showError} from "../../utils/messages"

const ChangePassword = () => {
    const navigate = useNavigate();
    const {nslId} = userInfo()
  const [user, setUser] = useState({
    nslId: "",
    password: "",
  });
  const [response, setResponse] = useState({
    success:"",
    err: false,
});
const {success, err} = response;
  const { password} =user
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setResponse({
      err: false,
      success: ""
    })
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if(password.length < 5){
      setResponse({
        ...response,
        err: true
      })
    }else{
      changePasswod({ nslId, password }, userInfo().token)
        .then((data) => {
            // console.log(data);
          navigate("/home");
        })
        .catch((err) => {
          setResponse({
            ...response,
            err: true
          })
          console.log(err);
        });
    }
  };
  return (
    <div className="w-50 m-auto">
<div>{showError(err, "Provide valid password")}</div>

    <Form onSubmit={handlesubmit}>
      
      <FormGroup>
        <Label for="">Nsl ID</Label>
        <Input
          id=""
          name="text"
          placeholder=""
          type="text"
          required
          onChange={handleChange}
          value={userInfo().nslId}
          readOnly
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">New Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="password placeholder"
          type="password"
          required
          value={password}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
    </div>
  );
};

export default ChangePassword;
