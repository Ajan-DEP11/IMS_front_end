function initializeToolTips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [
        ...tooltipTriggerList
    ].map((tooltipTriggerEl)=>new bootstrap.Tooltip(tooltipTriggerEl));
}
initializeToolTips();
const btnAddElm = document.querySelector("#btn-add");
const btnClearElm = document.querySelector("#btn-clear");
const btnAddNewCustomerElm = document.querySelector("#btnAddNewCustomer");
const txtNameElm = document.querySelector("#txt-name");
const txtContElm = document.querySelector("#txt-contact");
const txtIdElm = document.querySelector("#txt-id");
const { API_URL } = process.env;
loadAllTeachers();
function loadAllTeachers() {
    fetch(`${API_URL}/teachers`).then((res)=>{
        if (res.ok) res.json().then((teacherList)=>teacherList.forEach((teacher)=>createTeacher(teacher)));
        else alert("Failt to load all tasks");
    }).catch((err)=>{
        alert("Something went wrong. Try Later");
    });
}
btnAddElm.addEventListener("click", ()=>{
    const name = txtNameElm.value.trim();
    const contact = txtContElm.value.trim();
    fetch(`${API_URL}/teachers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            contact
        })
    }).then((res)=>{
        if (res.status === 201) res.json().then((teacher)=>{
            createNewRow(teacher);
            txtNameElm.value = "";
            txtContElm.value = "";
            txtNameElm.focus();
        });
        else alert("Fail to create teacher");
    }).catch((err)=>alert("Something went wrong, try again later"));
});
function createNewRow(teacher) {
    const trElm = document.createElement("tr");
    document.querySelector("#tbl tbody").append(trElm);
    trElm.innerHTML = `
                <tr>
                    <td>${teacher.id}</td>
                    <td>${teacher.name}</td>
                    <td>${teacher.contact}</td>
                    <td><div id="icons" class="d-flex gap-3 fs-5">
                    <i data-bs-toggle="tooltip" 
                        data-bs-placeme="left"
                        data-bs-title="Click to edit" 
                        class="edit bi bi-pen"></i>
                        <i data-bs-toggle="tooltip" 
                        data-bs-placeme="left"
                        data-bs-title="Click to delete" 
                        class="delete bi bi-trash3"></i>
                    </div></td>
                </tr>
    `;
}
taskcontainerElm.addEventListener("click", (e)=>{
    if (e.target?.classList.contains("delete")) {
        const taskId = e.target.closest("li").id.substring(5);
        fetch(`${API_URL}/tasks/${taskId}`, {
            method: "DELETE"
        }).then((res)=>{
            if (res.ok) e.target.closest("li").remove();
            else alert("Failed to delete the task");
        }).catch((err)=>{
            alert("Something went wrong. Trt Later");
        });
    }
});

//# sourceMappingURL=teacher.b5b08f12.js.map
