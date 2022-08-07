import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { userInfo } from "../../utils/auth";
import { getAllProjects, getAllReports } from "../../api/auth";
import { Link } from "react-router-dom";
import { API } from "../../utils/config";
import { useForm } from "react-hook-form";

const Dashboard = () => {
    const { register, handleSubmit } = useForm();
  const { name, nslId, role } = userInfo();
  const [project, setProject] = useState([]);
  const [search, setSearch] = useState({
    projectLead: "",
    startDate: "",
    endDate:""
  });
  const [click, setClick] = useState(false);
  const {projectLead, startDate, endDate} = search;
  useEffect(() => {
    getAllProjects(userInfo().token, {...search})
      .then((data) => {
        const result = data.data.data;
        setProject(() => [...result]);
      })
      .catch((err) => {
        setProject([])
        console.log(err);
      });
  }, [click]);

  const handleChange = (e) => {
    // if(endDate && endDate < startDate){
    //   alert("Provide valid range");
    // }else{
      
      setSearch({
        ...search,
        [e.target.name]: e.target.value
      }
      )
    // }
  } 
  console.log(search);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    const res = await fetch("http://localhost:3001/api/reports/upload", {
        method: "POST",
        body: formData,
        
    },).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
};

  return (
    <div className="container-fluid">
      
      
      <div className="row p-2">
        <div className="col-md-4">
          <input type="text" name={'projectLead'} placeholder="type project lead name" onChange={(e)=>handleChange(e)} value={projectLead} />
        </div>
        <div className="col-md-3">
          <label>Start date</label>
          <input type={'date'} value={startDate} onChange={handleChange} name={'startDate'} />
        </div>
        {startDate && (<div className="col-md-3">
          <label className="">End Date</label>
          <input type={'date'} value={endDate} onChange={handleChange} name={'endDate'} />
        </div>)}
        <div className="col-md-2">
          <button className="btn btn-info" onClick={()=> setClick(!click)}>Search</button>
        </div>
      </div>
      <div className="row">
        {! project.length ? (<div>No data found</div>): (<>
          <div className="row">
      <div className="col-12 ">
      <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Project Name</th>
      <th scope="col">Project Lead</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>

    </tr>
  </thead>
  <tbody>
    {project.map((proj, ind)=> {
      return( <tr key={ind}>
        <td><Link to={`/projects/${proj._id}`}>{proj.title}</Link></td>
        <td>{proj.projectLead}</td>
        <td>{new Date(proj.startDate).toLocaleDateString()}</td>
        <td>{new Date(proj.endDate).toLocaleDateString()}</td>

      </tr>)
    })}    
  </tbody>
</table>
      </div>
      </div>
        </>)}
      </div>
      {/* <div className="row">
      <div className="col-12 ">
      <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Project Name</th>
      <th scope="col">Project Lead</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>

    </tr>
  </thead>
  <tbody>
    {project.map((proj, ind)=> {
      return( <tr key={ind}>
        <td><Link to={`/projects/${proj._id}`}>{proj.title}</Link></td>
        <td>{proj.projectLead}</td>
        <td>{new Date(proj.startDate).toLocaleDateString()}</td>
        <td>{new Date(proj.endDate).toLocaleDateString()}</td>

      </tr>)
    })}    
  </tbody>
</table>
      </div>
      </div> */}

    </div>
  );
};

export default Dashboard;
