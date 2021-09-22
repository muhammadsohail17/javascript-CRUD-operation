var selectedRow = null
function onFormSubmit() {

    if (validateForm()) {    
        var formData = readFormData();
            if (selectedRow == null)
                insertNewRecord(formData);
            else {
                updateRecord(formData);
            }
            saveData(formData);
            resetForm();
        }
            
    } 
   

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["contact"] = document.getElementById("contact").value;
    formData["city"] = document.getElementById("city").value;
    formData["password"] = document.getElementById("psw").value;
    return formData;
}
function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.contact;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.password;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("city").value = "";
    document.getElementById("psw").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("contact").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
    document.getElementById("psw").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.contact;
    selectedRow.cells[3].innerHTML = formData.city;
    selectedRow.cells[4].innerHTML = formData.psw;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

//local storage

function saveData(data){
    let userRecords = new Array();
    userRecords = JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')): [];
    userRecords.push({
        'name':data.name,
        'email':data.email,
        'contact':data.contact,
        'city':data.city,
        'password':data.password,
        "id": userRecords.length + 1
    })


    if (data) localStorage.setItem('users', JSON.stringify(userRecords))
}



// javascript validation
function validateForm(){
    var username = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('contact').value;
    var city = document.getElementById('city').value;
    var password = document.getElementById('psw').value;
    // var Cpassword = document.getElementById('cpsw').value;

    var usercheck = /^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$/;
    var emailcheck =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var phonecheck =  /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;
    var citycheck = /^([0-9]{5}|[a-zA-Z][a-zA-Z ]{0,49})$/;
    var passwordcheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // var cpasswordcheck = (@"(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$");


    if(usercheck.test(username)){
        document.getElementById('usererror').innerHTML='';
    }else{
        document.getElementById('usererror').innerHTML='invalid username';
        return false;
    }
    
    if(emailcheck.test(email)){
        document.getElementById('emailerror').innerHTML = '';
    }else{
        document.getElementById('emailerror').innerHTML ='invalid email';
        return false;
    }

    if(phonecheck.test(phone)){
        document.getElementById('contacterror').innerHTML ='';
    }else{
        document.getElementById('contacterror').innerHTML = 'invalid phone number';
        return false;
    }
    if(citycheck.test(city)){
        document.getElementById('cityerror').innerHTML ='';
    }else{
        document.getElementById('cityerror').innerHTML = 'invalid city name';
        return false;
    }
    if(passwordcheck.test(password)){
        document.getElementById('passworderror').innerHTML ='';
    }else{
        document.getElementById('passworderror').innerHTML = 'invalid password';
        return false;
    }
    return true
}