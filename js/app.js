

let elLogoutBtn = document.querySelector(".admin__btn")
let elModalwrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let elAddBtn = document.querySelector(".admin__add-btn")
let elAdminTbody = document.querySelector(".admin__tbody")

let elAdminImg = document.querySelector(".admin__img")
let elAdmingetImg = document.querySelector(".admin__input-img")

let elSearch = document.querySelector(".admin__search")

let elSort = document.querySelector(".admin__sort-btn")

let elRemoveBtn = document.querySelector(".admin__btn-inner")
let elNav = document.querySelector(".admin__navbar")


elModalwrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalwrapper.classList.remove("open-modal")
    }
})

let res = new Date()

let pupils = JSON.parse(window.localStorage.getItem("pupils")) || []


// -------------------ADD Student Btn---start-----------------------

elAddBtn.addEventListener("click", function(evt){
    elModalwrapper.classList.add("open-modal")
    elModal.innerHTML = `
      <form class="form-add">
         <label>
          <div class="w-[60%] mx-auto">
          <img src="" class="add-img w-[100%] h-[250px] bg-white rounded-[20px]" alt="choose image"  ></img>
          </div>
            <input class="get-input visually-hidden" type="file">
         </label>
         <div class="mt-[30px] flex items-center justify-between">
            <div class="flex flex-col gap-[20px]">
              <label class="flex flex-col gap-[5px]">
                <span class="font-normal text-white text-[20px]">Enter your name</span>
                <input class="w-[300px] p-3 rounded-[10px]" required type="text" placeholder="Enter your name">
              </label>
              <label class="flex flex-col gap-[5px]">
                <span class="font-normal text-white text-[20px]">Enter your email</span>
                <input class="w-[300px] p-3 rounded-[10px] required type="email" placeholder="Enter your email">
              </label>
            </div>

          <div class="flex flex-col gap-[20px]">
          <label class="flex flex-col gap-[5px]">
            <span class="font-normal text-white text-[20px]">Enter your phone</span>
             <input class="w-[300px] p-3 rounded-[10px] required type="tel" placeholder="Enter your phone">
         </label>
          <label class="flex flex-col gap-[5px]">
             <span class="font-normal text-white text-[20px]">Enter your home phone</span>
            <input class="w-[300px] p-3 rounded-[10px] required type="tel" placeholder="Enter your home phone">
         </label>
            </div>
         </div>
         <div class="mt-[40px] flex items-center justify-end">
           <button class="w-[120px] p-3 bg-green-500 rounded-[7px] text-white font-bold text-[20px]">Submit</button>
         </div>
         <div class="absolute top-0 right-0 bottom-0 left-end">
           <button onclick="exitClickBtn()" class="w-[40px] h-[40px] p-[5px] rounded-[3px] text-white font-bold text-[20px]">X</button>
         </div>
      </form>
    `
    let elForm = document.querySelector(".form-add")
    let elAddImg = document.querySelector(".add-img")
    let elchangeInput = document.querySelector(".get-input")

    elchangeInput.addEventListener("change", function(evt){
        elAddImg.src = URL.createObjectURL(evt.target.files[0])
    })

    elForm.addEventListener("submit", function(evt){
    let eldate = (`${res.getDate().toString().padStart(2, 0)}.${(res.getMonth() + 1).toString().padStart(2, 0)}.${res.getFullYear()} ${res.getHours().toString().padStart(2, 0)}:${res.getMinutes().toString().padStart(2, 0)}`);
        evt.preventDefault()
        const data = {
            id: pupils.length,
            img: URL.createObjectURL(evt.target[0].files[0]),
            name:evt.target[1].value,
            email:evt.target[2].value,
            phone:evt.target[3].value,
            homePhone:evt.target[4].value,
            time:eldate
        }
        pupils.push(data)
        renderPupils(pupils, elAdminTbody)
        elModalwrapper.classList.remove("open-modal")
        window.localStorage.setItem("pupils", JSON.stringify(pupils))
    })
})

renderPupils(pupils, elAdminTbody)
window.localStorage.setItem("pupils", JSON.stringify(pupils))


function renderPupils(arr, list){
    list.innerHTML = ""
    arr.map(item =>{
        let elTr = document.createElement("tr")
        elTr.classList.add("tr")
        elTr.innerHTML = `
        <td class="text-start p-[15px] bg-white rounded-l-[8px]">
        <img class="w-[65px] h-[55px] rounded-[5px]" src=${item.img} alt="Image" width="65" height="65">
      </td>
      <td class="text-start font-normal text-[17px] leading-[17.07px] p-[15px] bg-white">${item.name}</td>
      <td class="text-start font-normal text-[17px] leading-[17.07px] p-[15px] bg-white">${item.email}</td>
      <td class="text-start font-normal text-[17px] leading-[17.07px] p-[15px] bg-white">${item.phone}</td>
        <td class="text-start font-normal text-[17px] leading-[17.07px] p-[15px] bg-white">${item.homePhone}</td>
        <td class="text-start font-normal text-[17px] leading-[17.07px] p-[15px] bg-white">${item.time}</td>
        <td class="text-center p-[15px] bg-white rounded-r-[8px]">
           <div class="flex items-center justify-center gap-[33px]">
           <button onclick="updateClickBtn(${item.id})">
           <img src="../images/update.svg" alt="Update icon" width="19" height="19">
           </button>
           <button onclick="deleteClickBtn(${item.id})">
           <img src="../images/delete.svg" alt="Delete icon" width="16" height="18">
           </button>
           </div>
         </td>
        `
        list.appendChild(elTr)

    })

}

// -------------------ADD Student Btn---end-----------------------

function exitClickBtn(){
    elModalwrapper.classList.remove("open-modal")
}

// ------------------Admin image change--start---------------

elAdmingetImg.addEventListener("change", function(evt){
    elAdminImg.src = URL.createObjectURL(evt.target.files[0])
})

// ------------------Admin image change end-----------------


// -------------------------------Search start-------------------

elSearch.addEventListener("keyup", function(evt){
    const inputvalue = evt.target.value.trim();
    const data = pupils.filter(item => item.name.toLowerCase().includes(inputvalue.toLowerCase()) || item.email.toLowerCase().includes(inputvalue.toLowerCase()) || item.phone.includes(inputvalue) || item.homePhone.includes(inputvalue))
    renderPupils(data, elAdminTbody)
})

// -------------------------------Search end-------------------


// -------------------Update start---------------------

function updateClickBtn(id){
    let data = pupils.find(item => item.id == id)
    elModalwrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <form class="form-update">
       <label>
        <div class="w-[60%] mx-auto">
        <img src="${data.img}" class="update-img w-[100%] h-[250px] bg-white rounded-[20px]" alt="choose image"  ></img>
        </div>
          <input class="update-input visually-hidden" type="file">
       </label>
       <div class="mt-[30px] flex items-center justify-between">
          <div class="flex flex-col gap-[20px]">
            <label class="flex flex-col gap-[5px]">
              <span class="font-normal text-white text-[20px]">Enter your name</span>
              <input value="${data.name}" class="w-[300px] p-3 rounded-[10px]" required type="text" placeholder="Enter your name">
            </label>
            <label class="flex flex-col gap-[5px]">
              <span class="font-normal text-white text-[20px]">Enter your email</span>
              <input value="${data.email}" class="w-[300px] p-3 rounded-[10px] required type="email" placeholder="Enter your email">
            </label>
          </div>

        <div class="flex flex-col gap-[20px]">
        <label class="flex flex-col gap-[5px]">
          <span class="font-normal text-white text-[20px]">Enter your phone</span>
           <input value="${data.phone}" class="w-[300px] p-3 rounded-[10px] required type="tel" placeholder="Enter your phone">
       </label>
        <label class="flex flex-col gap-[5px]">
           <span class="font-normal text-white text-[20px]">Enter your home phone</span>
          <input value="${data.homePhone}" class="w-[300px] p-3 rounded-[10px] required type="tel" placeholder="Enter your home phone">
       </label>
          </div>
       </div>
       <div class="mt-[40px] flex items-center justify-end">
         <button class="w-[120px] p-3 bg-green-500 rounded-[7px] text-white font-bold text-[20px]">Submit</button>
       </div>
       <div class="absolute top-0 right-0 bottom-0 left-end">
         <button onclick="exitClickBtn()" class="w-[40px] h-[40px] p-[5px] rounded-[3px] text-white font-bold text-[20px]">X</button>
       </div>
    </form>
  `
 let elUpdateForm = document.querySelector(".form-update")
 let elUpdateimg = document.querySelector(".update-img")
 let elUpdategetImg = document.querySelector(".update-input")

 elUpdategetImg.addEventListener("change", function(evt){
    elUpdateimg.src = URL.createObjectURL(evt.target.files[0])
 })

 elUpdateForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    data.img = elUpdateimg.src
    data.name = evt.target[1].value
    data.email = evt.target[2].value
    data.phone = evt.target[3].value
    data.homePhone = evt.target[4].value

    renderPupils(pupils, elAdminTbody)
    window.localStorage.setItem("pupils", JSON.stringify(pupils))
    elModalwrapper.classList.remove("open-modal")

 })
}

// -------------------Update end-----------------------


// ---------------------Sort----start----------------------

elSort.addEventListener("click", function(){
    pupils.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    renderPupils(pupils, elAdminTbody)
})

elSort.addEventListener("dblclick", function(){
    pupils.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1)
    renderPupils(pupils, elAdminTbody)
})

// ---------------------Sort----end----------------------


// ---------------------------Delete start-----------------

function deleteClickBtn(id){
    elModalwrapper.classList.add("open-modal")
    elModal.innerHTML = `
      <h2 class="font-bold text-white text-[24px] leading-[28px] text-center">Are you sure you want to delete?</h2>
      <div class="modal-card mt-[30px]">
        <button onclick="cancelClickBtn()" class="modal-cancel">Cancel</button>
        <button onclick="deleteBtn(${id})" class="modal-exit">Delete</button>
      </div>
    `
}

function cancelClickBtn(){
    elModalwrapper.classList.remove("open-modal")
}

function deleteBtn(id){
    let result = pupils.findIndex(item => item.id == id)
    pupils.splice(result, 1)
    renderPupils(pupils, elAdminTbody)
    window.localStorage.setItem("pupils", JSON.stringify(pupils))
    elModalwrapper.classList.remove("open-modal")
}

// ---------------------------Delete end-----------------

// ------------------Admin page remove start-------------------------

elRemoveBtn.addEventListener("click", function(evt){
    elNav.classList.toggle("remove-navbar") 
})

// ------------------Admin page remove end-------------------------

// ------------------logout start--------------------------

elLogoutBtn.addEventListener("click", function(evt){
    elModalwrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <p class="modal-text">Do you really want to quit?</p>
    <div class="modal-card">
    <button onclick="logoutCancelBtn()" class="modal-cancel">Cancel</button>
    <button onclick="logoutExitClickBtn()" class="modal-exit">Log out</button>
    </div>
    `
})

function logoutCancelBtn(){
    elModalwrapper.classList.remove("open-modal")
}

function logoutExitClickBtn(){
    window.location = "./login.html"
}


// ------------------logout end--------------------------
