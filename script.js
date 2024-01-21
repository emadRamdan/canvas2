const canvas = document.querySelector("canvas"),
 ctx = canvas.getContext("2d") ;

 var tools = document.querySelectorAll(".tool");
 var rang = document.querySelector("#slider");
 var colors = document.querySelectorAll(".colors .option")
 var picker = document.querySelector("#picker")
 var fill = document.querySelector("#fill-color");
 var clear = document.querySelector("#clear");
 var save = document.querySelector("#save");


 

 let flag = false ;
 let  brushsize = rang.value ;
 let startx , starty , snapshot ;
 let selectedTool ="brush";
let selectedColor = "black";

window.addEventListener("load" , ()=>{
    canvas.width = canvas.offsetWidth ;
    canvas.height = canvas.offsetHeight ;
})

rang.addEventListener("change" , ()=>{
    brushsize= rang.value ;

 })

tools.forEach((tool)=>{
    tool.addEventListener('click',()=>{
        tools.forEach((tool)=>{
            tool.classList.remove("active");
         } )

         tool.classList.add("active")
        selectedTool = tool.id ;
        
    })
})

colors.forEach((color)=>{
    color.addEventListener('click' , ()=>{
        
            colors.forEach((color)=>{
                color.classList.remove("selected");
             } )
    
             color.classList.add("selected")
            selectedColor = window.getComputedStyle(color).getPropertyValue("background-color");
            // console.log(selectedColor)
    
})
});

picker.addEventListener('change',()=>{
    picker.parentElement.style.backgroundColor = picker.value ;
    picker.parentElement.click() ;
})
var startDrow = (e)=>{
    flag = true ;
    ctx.beginPath();
    ctx.lineWidth = brushsize ;
    startx = e.offsetX  ;
    starty = e.offsetY  ;
    // console.log(startx , starty)
     snapshot = ctx.getImageData(0 , 0 , canvas.width , canvas.height)
    //  console.log(snapshot)

}

var drow = (e)=>{
    if(!flag) return;
    ctx.putImageData(snapshot , 0 , 0);
    ctx.strokeStyle = selectedColor ;
            ctx.fillStyle = selectedColor ;
    switch(selectedTool){
        case("brush"):
        case("eraser"):{
            ctx.strokeStyle = selectedTool === "eraser" ? "antiquewhite" : selectedColor ;
            ctx.lineTo(e.offsetX , e.offsetY) ;
            ctx.stroke();
            
            
            break ;
        }
        case("rectangle"):{
            if(!fill.checked){
                ctx.strokeRect(e.offsetX , e.offsetY , startx - e.offsetX   , starty-  e.offsetY  ) ;
                // ctx.stroke();
                break ;
            }else{
                ctx.fillRect(e.offsetX , e.offsetY , startx - e.offsetX   , starty-  e.offsetY  ) ;
                // ctx.stroke();
                break ;
            }
        }
        case("circle"):{
            ctx.beginPath();
            let radis = Math.sqrt(Math.pow((startx-e.offsetX),2) + Math.pow((starty-e.offsetY),2) , 2) ;
            ctx.arc(startx , starty ,radis, 0 ,2 * Math.PI)
            fill.checked ? ctx.fill() : ctx.stroke() ;
            break ;
        }
        case("triangle"):{
            ctx.beginPath();
            ctx.moveTo(startx , starty) ;
            ctx.lineTo(e.offsetX , e.offsetY);
            ctx.lineTo(startx*2 - e.offsetX,e.offsetY);
            ctx.closePath();
            fill.checked ? ctx.fill() : ctx.stroke() ;
            break ;
        }
    }
   
    // console.log("end" + e.offsetX , e.offsetY)
}

canvas.addEventListener("mousedown" , startDrow)
canvas.addEventListener("mousemove", drow);
canvas.addEventListener("mouseup" , ()=> flag=false )

clear.addEventListener('click' , ()=>{
    ctx.clearRect(0 , 0 , canvas.width , canvas.height)
})

save.addEventListener('click' , ()=>{
    const link = document.createElement("a");
})
