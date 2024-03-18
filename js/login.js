
let elForm = document.querySelector(".login-form")
let elModalwrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

elModalwrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalwrapper.classList.remove("open-modal")
    }
})

elForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    const data = {
        userEmail: evt.target[0].value,
        userPass: evt.target[1].value
    }
    const result = {
        userEmail:"dilshod19@gmail.com",
        userPass:"12345"
    }
    if(data.userEmail == result.userEmail && data.userPass == result.userPass){
        window.localStorage.setItem("user", JSON.stringify(data))
        setTimeout(()=>{
            window.location = "./index.html"
        },1000)
    }
    else{
        elModalwrapper.classList.add("open-modal")
        elModal.innerHTML =`
           <p class="modal-text">The information you entered is incorrect. Please try again!</p>
           <button onclick="exitClickBtn()" class="modal-btn">Ok</button>
        `
    }
})

function exitClickBtn(){
    elModalwrapper.classList.remove("open-modal")
}