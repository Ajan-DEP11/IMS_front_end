function initializeToolTips(){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

initializeToolTips();

const btnAddElm = document.querySelector('#btn-add');
const btnClearElm = document.querySelector('#btn-clear');
const btnAddNewCustomerElm = document.querySelector('#btnAddNewCustomer');
const txtNameElm = document.querySelector('#txt-name');
const txtAddressElm = document.querySelector('#txt-address');
const txtIdElm = document.querySelector('#txt-id');
const {API_URL} = process.env;

loadAllTeachers();

function loadAllTeachers(){ 
    fetch(`${API_URL}/teachers`).then(res =>{
        if(res.ok){
                res.json().then(teacherList => teacherList.forEach(teacher => createTeacher(teacher)));
        }else{
            alert("Failt to load all tasks")
        }

    }).catch(err => {
        alert('Something went wrong. Try Later');
    });
    
}

btnAddElm.addEventListener('click', ()=>{
    const name = txtNameElm.value.trim();
    const contact = txtContElm.value.trim();
    fetch(`${API_URL}/teachers`,{
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name, contact})
       }).then(res =>{
        if(res.status === 201){
            res.json().then(teacher => {
                createNewRow(teacher);
                txtNameElm.value ='';
                txtContElm.value='';
                txtNameElm.focus();
    
            });
        }else{
            alert("Fail to create teacher");
        }
       }).catch(err => alert("Something went wrong, try again later"));
  

});

function createNewRow(teacher){
    const trElm = document.createElement('tr');
    document.querySelector('#tbl tbody').append(trElm);
    trElm.innerHTML=`
                <tr>
                    <td>${teacher.id}</td>
                    <td>${teacher.name}</td>
                    <td>${teacher.contact}</td>
                    <td><button class="delete btn btn-danger">Delete</button></td>
                </tr>
    `;
}
    