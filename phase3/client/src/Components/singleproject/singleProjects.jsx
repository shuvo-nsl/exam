import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllMember,
  getsingleProjects,
  updateSingleProject,
  deleteAproject
} from "../../api/auth";
import { userInfo } from "../../utils/auth";

const SingleProjects = () => {
  const { name, nslId, token } = userInfo();
  const params = useParams();
  const [project, setProject] = useState({});
  const [err, setErr] = useState(false)
  const [p, setp] = useState({
    title: "",
    projectLead: "",
    startDate: "",
    endDate: '',
    description: ""

  })
const navigate = useNavigate();
  useEffect(() => {
    getsingleProjects(userInfo().token, params.id)
      .then((data) => {
        setProject(data.data.data);
        console.log(data.data.data);
        setp({
          ...p,
          title: project?.title,
          projectLead: project?.projectLead,
          startDate: project?.startDate,
          endDate:  project?.endDate,
          description: project?.description,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProject = () => {
    deleteAproject(userInfo().token, project._id).then(data=> {
      navigate("/home")
    }).catch(err=> {
      setErr(false)
    })
  }
  const handleChange= (e) => {
    setp({
      ...p,
      [e.target.name] : e.target.value,
    })
  }
  const [modal, setModal] = useState(false);
  
    // Toggle for Modal
    const toggle = () => setModal(!modal);

const {title, description, startDate, endDate, projectLead} = p;
  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/home"}>Home</Link>
          </li>
          <li className="breadcrumb-item active">
            <a>{project.title}</a>
          </li>
        </ol>
      </nav>
      <div className="row w-50 m-auto">
        <div className="row">

        <div className="col-md-12">
          <div className="card mb-3">
            <h3 className="card-header">{project.title} Information</h3>
            <p className="card-body">Description: {project.description}</p>
            <p className="card-body">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
            <p className="card-body">End Date: {new Date(project.endDate).toLocaleDateString()}</p>


            <ul className="list-group">
              <li className="list-group-item">
                Team Lead: {project?.projectLead}
              </li>
            </ul>
          </div>
        </div>
        </div>
        <div className="row">

        <div className="col-md-3">
          <button className="btn btn-danger" onClick={deleteProject}>Delete Project</button>
        </div>

        <div className="col-md-3">
          <Link to={{
            pathname: `/projects/${project._id}/update`,
            state: project
          }} className="btn btn-info" onClick={toggle}>Modify Project</Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProjects;
