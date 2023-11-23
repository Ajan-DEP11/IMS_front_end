const txtNameElm = document.querySelector('#txt-name');
const txtContElm = document.querySelector('#txt-contact');
const btnAddElm = document.querySelector('#btn-add');
const {API_BASE_URL} = process.env;

btnAddElm.addEventListener('click', ()=>{
   const name = txtNameElm.value.trim();
   const contact = txtContElm.value.trim();
   

   if(!/^[A-Za-z ]+$/.test(name)){
    txtNameElm.focus();
    txtNameElm.select ();
    return;
   }else if (!/^\d{3}-\d{7}$/.test(contact)){
    txtContElm.focus();
    txtContElm.select();
    return;
   }

   fetch(`${API_BASE_URL}/teachers`,{
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
                    <td>
                        <div id="icons" class="d-flex gap-3 fs-5">
                        <i data-bs-toggle="tooltip" 
                            data-bs-placeme="left"
                            data-bs-title="Click to edit" 
                            class="edit bi bi-pen"></i>
                            <i data-bs-toggle="tooltip" 
                            data-bs-placeme="left"
                            data-bs-title="Click to delete" 
                            class="delete bi bi-trash3"></i>
                        </div>
                    </td>
                </tr>
    `;
}

loadAllTeachers();

function loadAllTeachers(){
    //Todo: Retrive teacher list from the back-end
}