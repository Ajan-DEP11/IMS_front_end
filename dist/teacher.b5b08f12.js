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
const txtAddressElm = document.querySelector("#txt-address");
const txtIdElm = document.querySelector("#txt-id");
const { API_URL } = process.env;
loadAllTeachers();
function loadAllTeachers() {
    fetch(`${API_URL}/teachers`).then((res)=>{
        if (res.ok) res.json().then((teacherList)=>teacherList.forEach((teacher)=>createTeacher(tteacherask)));
        else alert("Failt to load all tasks");
    }).catch((err)=>{
        alert("Something went wrong. Try Later");
    });
}

//# sourceMappingURL=teacher.b5b08f12.js.map
