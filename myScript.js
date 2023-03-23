const color=["red","blue","yellow","green"]
var userTurn=false
var record=0
var countShow=0
var indexEQ=0
var countPress=0
var computerOrder=[]

// init game with record
function init(){
    const p=document.getElementById("Record")
    if(localStorage["record"]!=null){
        record=JSON.parse(localStorage["record"])
    }
    p.innerHTML="RECORD: " + record;
}

// lottery new color and function show all order
function computer(){
    if(userTurn)
        return
    const p=document.getElementById("Count")
    p.innerHTML="COUNT: " + computerOrder.length;
    const random = color[Math.floor(Math.random() * color.length)]
    computerOrder.push(random)
    countShow=0
    interId=setInterval(function(){passOnOrder()},600)
    
}

// show all color order
function passOnOrder(){
    if (countShow==computerOrder.length){
        userTurn=true
        clearInterval(interId)
    }
    const current=computerOrder[countShow++]
    show(current)
}

// check if guess playe its true
function player(guess){
    if(!userTurn)
        return

    if (guess!=computerOrder[indexEQ++]){
        gameOver()    
    }
    
    else{
        show(guess)
        countPress++   
        if (countPress==computerOrder.length){
            userTurn=false
            countPress=0
            indexEQ=0
            setTimeout(function(){computer()},2000)
        }           
    }
}

// change color
function show(current){
    const div=document.getElementById(current)
    const aud=document.getElementById('sound'+current)
    aud.cloneNode().play()
    if (current=="red") {
        div.style.background="linear-gradient(to bottom, #800000 0%, #ff5050 100%)"
    }
    if (current=="blue") {
        div.style.background="linear-gradient(to bottom,#00ccff 0%, #000066  100%)"
    }
    if (current=="yellow") {
        div.style.background="linear-gradient(to bottom, #ffffcc 0%, #ffcc00 100%)"
    }
    if (current=="green") {
        div.style.background="linear-gradient(to bottom, #006600  0%,#99ff99  100%)"
    }
    setTimeout(function(){reShow(current)},200)
}

// rechange color
function reShow(current){
    const div=document.getElementById(current)
    if (current=="red") {
        div.style.background="linear-gradient(to bottom, #ff3300 0%, #ff6666 100%)"
    }
    if (current=="blue") {
        div.style.background="linear-gradient(to bottom, #3399ff 0%, #0000ff 100%)"
    }
    if (current=="yellow") {
        div.style.background="linear-gradient(to bottom, #ffff99 0%, #ffff00 100%)"
    }
    if (current=="green") {
        div.style.background="linear-gradient(to bottom, #009933 0%, #99ff66 100%)"
    }  
}


// game over and empty to new game
function gameOver(){
    if(computerOrder.length-1>record){
        record=computerOrder.length-1
        localStorage["record"]=record
    }
    
    alert("Gmae Over")
    const p=document.getElementById("Record")
    p.innerHTML="RECORD : " + record;
    computerOrder=[]
    countPress=0
    userTurn=false
    indexEQ=0
    return
}
