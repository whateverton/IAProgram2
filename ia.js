var canvas, context;
var FRAME_RATE = 60.0;

var RESULT_X = 20;
var RESULT_Y = 20;

var LIM_MIN_COKE = 50;
var LIM_MAX_COKE = 60;
var LIM_MIN_PEPSI = 60;
var LIM_MAX_PEPSI = 70;
var LIM_MIN_RUN = 10;
var LIM_MAX_RUN = 30;
var LIM_MIN_ICE = 20;
var LIM_MAX_ICE = 20;

var FORTE_MIN_COKE = LIM_MIN_COKE;
var FORTE_MID_COKE = 52;
var FORTE_MAX_COKE = 54;
var SUAVE_MIN_COKE = 0;
var SUAVE_MID_COKE = 0;
var SUAVE_MAX_COKE = 0;
var FRACO_MIN_COKE = 0;
var FRACO_MID_COKE = 0;
var FRACO_MAX_COKE = LIM_MAX_COKE;

var FORTE_MIN_PEPSI = LIM_MIN_PEPSI;
var FORTE_MID_PEPSI = 0;
var FORTE_MAX_PEPSI = 0;
var SUAVE_MIN_PEPSI = 0;
var SUAVE_MID_PEPSI = 0;
var SUAVE_MAX_PEPSI = 0;
var FRACO_MIN_PEPSI = 0;
var FRACO_MID_PEPSI = 0;
var FRACO_MAX_PEPSI = LIM_MAX_PEPSI;

var FORTE_MIN_RUN = LIM_MIN_RUN;
var FORTE_MID_RUN = 0;
var FORTE_MAX_RUN = 0;
var SUAVE_MIN_RUN = 0;
var SUAVE_MID_RUN = 0;
var SUAVE_MAX_RUN = 0;
var FRACO_MIN_RUN = 0;
var FRACO_MID_RUN = 0;
var FRACO_MAX_RUN = LIM_MAX_RUN;

var notCubaLibre =
"Esse drink não se enquadra na receita de Cuba Libre. " +
"[Coca-Cola (50ml a 60ml) ou Pepsi(60ml a 70ml), Run (10ml a 30ml) e Gelo (20ml)]";

var fraco = "";
var suave = "";
var forte = "";

var radioCoke;
var radioPepsi;

var sodaAmount;
var runAmount;
var iceAmount;

function Start()
{
	canvas = document.getElementById("canvas");
	context = canvas.getContext('2d');
  
	setInterval(Loop, 1000/FRAME_RATE);
  
  radioCoke = document.getElementById("coke");
  radioPepsi = document.getElementById("pepsi");
  
  sodaAmount = document.getElementById("sodaAmount");
  runAmount = document.getElementById("runAmount");
  iceAmount = document.getElementById("iceAmount");
}


function Loop()
{
	Update();
}


function Update()
{
}

function ClearScreen()
{
	// Clear canvas
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect(0,0,canvas.width,canvas.height); 
}

function ClearData()
{
  ClearScreen();

  sodaAmount.value = "";
  runAmount.value = "";
  iceAmount.value = "";
}

function createDrink()
{
  var isCubaLibre = true;

  if(radioCoke.checked)
  {
    if((sodaAmount.value < LIM_MIN_COKE) || (sodaAmount.value > LIM_MAX_COKE))
    {
      isCubaLibre = false;
    }
  }
  else if(radioPepsi.checked)
  {
    if((sodaAmount.value < LIM_MIN_PEPSI) || (sodaAmount.value > LIM_MAX_PEPSI))
    {
      isCubaLibre = false;
    }
  }
  
  if((runAmount.value < LIM_MIN_RUN) || (runAmount.value > LIM_MAX_RUN))
  {
    isCubaLibre = false;
  }
  
  if((iceAmount.value < LIM_MIN_ICE) || (iceAmount.value > LIM_MAX_ICE))
  {
    isCubaLibre = false;
  }
  
  ClearScreen();
  
  if(!isCubaLibre)
  {
    printResult(notCubaLibre,RESULT_X,RESULT_Y);
  }
  else
  {
  }
}

function printResult(text,x,y)
{
	//context.lineWidth=1;
  context.font = '12px Arial';
	context.fillStyle = 'black';
	context.strokeStyle = 'black';
  
  context.strokeText(text,x,y);
}

function calculaPertinencia(min, mid, max, x)
{
  if((x < min) || (x > max))
    return 0;
    
  if((x >= min) && (x < mid))
    return 1;
  
  if((x >= mid) && (x <= max))
    return ((max - x)/(max - mid));
}