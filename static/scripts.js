const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')



function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])



//Getting hold of DOM elements.
let spinnerObject = document.querySelector('.spinner')
let doButton = document.getElementById('getStock');
let input = document.getElementById('selectStock');

//Function that fetches the initial list which stores the stock "FB" "AAPL" etc.
async function fetchList (){
  const listData = await fetch('/stocks') 
  const response = await listData.json()
  console.log(response)
}

// Event listener for the button.
doButton.addEventListener('click', async () =>{
  await fetchData() 
})

//Fetching the data within the object adding input in order to access the specific type we want.

async function fetchData (){
let logInput = input.value.toUpperCase();
const listData = await fetch(`/stocks/${logInput}`) //Template Literals


  if (!listData.ok) {
    // handle error here
    console.log('No Data Available')
  }
  // handle the response
  const data = await listData.json();
  //Transforming the timestamps and value into actual readable data.
    data.forEach(element => {
      let stockPoint = (Number.parseFloat(element.value).toFixed(2))
      let timestamp = element.timestamp
      let date = new Date(timestamp);
  
      console.log(`
          ${logInput}: '£'${stockPoint});
          Date: ${date} 
          `)

    
    });
  spinnerObject.style.visibility = "hidden";
}


//Waiting for the window to load in order to fetch.
async function innit(){
await fetchList();
}
 window.addEventListener('load',innit);
