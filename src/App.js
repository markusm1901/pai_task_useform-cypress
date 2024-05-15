import './App.css';
import { get, useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getValue } from '@testing-library/user-event/dist/utils';

function App() {
  const { register, getValues, reset, handleSubmit } = useForm();
  const handle_clear = () =>{
    const values = getValues();
    console.log(values);
    if(values.name !=="" || values.surname !=="" || values.checked || values.radio !==""){
      if(window.confirm("Do you want to clear the form?")){
       reset(); 
      }
    }
  }
  return (
    <div className="App">
    
    <img src={require("./pobrane.png")} alt="cos" className='rounded'></img>
    <form onSubmit={handleSubmit((data)=>{
      let result = Object.values(data);
      if(result[0] !=="" && result[1] !=="" && result[3] !=="" && result[4] !==null){
        console.log(data)
      }
      else{
        alert("Form data is not complete, please fill all inputs")
      }
    })}>
    <p>Name</p>
    <input {...register('name')} className="form-control" type="text"></input>
    <p>Surname</p>
    <input {...register('surname')} className="form-control" type="text"></input>
    <p>Checkbox1</p>
    <input {...register('checked')} type="checkbox"></input>
    <p>Dropdown List</p>
    <select class="form-control-sm" {...register('dropdown')}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <p>Radio</p>
    <div>
      <input {...register('radio')} type="radio"  value="1"></input>1<br></br>
      <input {...register('radio')} type="radio"   value="2"></input>2<br></br>
      <input {...register('radio')} type="radio" value="3"></input>3<br></br>
    </div>
    <button type='submit' className='btn btn-primary'>Submit</button>
    <button type='button' className='btn btn-secondary' onClick={handle_clear}>Clear</button>
    </form>
    </div>
  );
}

export default App;