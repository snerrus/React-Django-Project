import axios from 'axios';
// import getEmployeeList from './ListEmployee';

class EmployeeService {

    deleteEmployee(id) {
        axios.delete('http://localhost:8000/employees/',{data:{id:id}})
            .then(() => {
                console.log('Employee Deleted !!!')
                Window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default EmployeeService;