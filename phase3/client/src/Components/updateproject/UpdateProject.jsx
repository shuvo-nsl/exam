import React, {useState, useEffect} from 'react'
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
  import { useNavigate, useLocation, useParams } from 'react-router-dom';
  import { showError } from '../../utils/messages';
  import { userInfo } from '../../utils/auth';
  import { getsingleProjects, updateSingleProject } from '../../api/auth';

  //formating date in slash
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join('/');
  }
const UpdateProject = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [project, setProject] = useState({});
    const [p, setp] = useState({
      title: "",
      projectLead: "",
      startDate: "",
      endDate: "",
      description: ""
      
    });
    const [err, setErr] = useState(false)
    const {title, description, startDate, endDate, projectLead} = p;
    useEffect(() => {
      getsingleProjects(userInfo().token, params.id)
        .then((data) => {
          setProject(data.data.data);
          // console.log(data.data.data);
          setp({
            ...p,
            title: data.data.data.title,
            projectLead: data.data.data.projectLead,
            startDate: formatDate(new Date(data.data.data.startDate)),
            endDate:  formatDate(new Date(data.data.data.endDate)),
            description: data.data.data.description,
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
      const handleChange= (e) => {
        setErr(false)
        setp({
          ...p,
          [e.target.name] : e.target.value,
        })
      }
console.log(p);
      const update = (e) => {
        e.preventDefault()
        console.log(p);
        updateSingleProject(userInfo().token, params.id, p).then(data=> {
          console.log(data);
          navigate(`/home`)
        }).catch(err=>{
          console.log(err);
          setErr(true)
        })
      }
  return (
    <div className='container'>
        <div className="col-md-6 p-1 m-auto">
                  <div>{showError(err, "Project creation Failed, try different title")}</div>

      <form className="mb-1" onSubmit={update} >
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            name="title"
            placeholder="Title of project"
            type="text"
            required
            value={title}
            onChange={handleChange}
            readOnly={'true'}
          />
          <Label for="description">Description</Label>
          <Input
            name="description"
            placeholder="Title of project"
            type="text"
            value={description}
            onChange={handleChange}
            required
          />
          <Label for="">Start Date</Label>
          <Input
          name="startDate"
            type={'date'}
            title={startDate}
            value={startDate}
            onChange={handleChange}
          />
          <Label for="">End Date</Label>
          <Input
            name="endDate"
            type="date"
            title={endDate}
            value={endDate}
            onChange={handleChange}
            
          />
          <Label for="">Project Lead</Label>
          <Input name="projectLead" value={projectLead} onChange={handleChange} />
         
    
        </FormGroup>
        <input type="submit" className='btn btn-primary' value={'submit'}/>
      </form>
      <Button type="button" onClick={() => {
        navigate("/home")
      }} >GO Back</Button>
    </div>
    </div>
  )
}

export default UpdateProject