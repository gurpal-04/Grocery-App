
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: 'https://project1-61353-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemInDB = ref(database, "items")

const inputBox = document.getElementById("input-item")
const btn = document.getElementById("add")
const shoppingList = document.getElementById("shoppingList")


btn.addEventListener("click" , function(){
    console.log(inputBox.value)
    let inputValue = inputBox.value

    clearInputBox()

    push(itemInDB, inputValue)
})

onValue(itemInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()
    
        for(let i=0;i<itemsArray.length;i++){
            let currentItem = itemsArray[i];
    
            appendShoppingList(currentItem)
        } 
    }
    else{
        shoppingList.innerHTML = "Nothing to BUY"
    }
})

function clearInputBox(){
    inputBox.value = ""
}

function clearShoppingList(){
    shoppingList.innerHTML = ""
}

function appendShoppingList(item) {
    // shoppingList.innerHTML+=`<li>${item}</li>`
    
    let itemID = item[0]
    let itemValue = item[1]
    let newItem = document.createElement("li")
    newItem.textContent = itemValue

    shoppingList.append(newItem)

    newItem.addEventListener("click", function() {
        let location = ref(database, `items/${itemID}`)
        remove(location)
    })
}