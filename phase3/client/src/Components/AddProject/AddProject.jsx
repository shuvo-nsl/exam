import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { createProject } from "../../api/auth";
import { addProject } from "../../api/auth";
import { userInfo } from "../../utils/auth";
import {showError} from"../../utils/messages"


const AddProject = () => {
  const [response, setResponse] = useState({
    success:"",
    err: false,
    loading: false,
});
const {err, success} = response

  const navigate = useNavigate();
  const[mem, setMember] = useState([]);
  const[tl, setTl] = useState([]);
  const [p, setp] = useState({
    title: "",
    projectLead: "",
    startDate: "",
    endDate: '',
    description: ""

  })
const handleChange = (e) => {
  setResponse({...response, err:false});

  setp({
    ...p,
    [e.target.name] : e.target.value,
  })
}


const handlesubmit = (e)=>{
  e.preventDefault();
  console.log(p);
  createProject({...p}, userInfo().token).then(data=> {
    setResponse({...response, loading: true, err: ""})
    navigate("/home")
  }).catch(err=> {
    setResponse({...response, err:true});
    console.log(err);
  })
}
const {title, startDate, endDate, description} = p
  return (
    <div className="col-md-6 p-1 m-auto">
                  <div>{showError(err, "Project creation Failed, try different title")}</div>

      <Form className="mb-1" onSubmit={handlesubmit} >
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            name="title"
            placeholder="Title of project"
            type="text"
            required
            value={title}
            onChange={handleChange}
          />
          <Label for="description">Description</Label>
          <Input
            name="description"
            placeholder="description of project"
            type="text"
            required
            value={description}
            onChange={handleChange}
          />
          <Label for="">Start Date</Label>
          <Input
name="startDate"
            placeholder="start time"
            type="date"
            required
            value={startDate}
            onChange={handleChange}
          />
          <Label for="">End Date</Label>
          <Input
name="endDate"
            placeholder="endtime"
            type="date"
            required
            value={endDate}
            onChange={handleChange}
          />
          <Label for="">Project Lead</Label>
          <Input name="projectLead" onChange={handleChange} />
         
    
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      <Button type="button" onClick={() => {
        navigate(-1)
      }} >GO Back</Button>
    </div>
  )
};

export default AddProject;
