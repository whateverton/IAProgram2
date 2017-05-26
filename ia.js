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
var SUAVE_MIN_COKE = 52;
var SUAVE_MID_MIN_COKE = 54;
var SUAVE_MID_MAX_COKE = 56;
var SUAVE_MAX_COKE = 58;
var FRACO_MIN_COKE = 56;
var FRACO_MID_COKE = 58;
var FRACO_MAX_COKE = LIM_MAX_COKE;

var FORTE_MIN_PEPSI = LIM_MIN_PEPSI;
var FORTE_MID_PEPSI = 62;
var FORTE_MAX_PEPSI = 64;
var SUAVE_MIN_PEPSI = 62;
var SUAVE_MID_MIN_PEPSI = 64;
var SUAVE_MID_MAX_PEPSI = 66;
var SUAVE_MAX_PEPSI = 68;
var FRACO_MIN_PEPSI = 66;
var FRACO_MID_PEPSI = 68;
var FRACO_MAX_PEPSI = LIM_MAX_PEPSI;

var FORTE_MIN_RUN = LIM_MIN_RUN;
var FORTE_MID_RUN = 15;
var FORTE_MAX_RUN = 20;
var SUAVE_MIN_RUN = 15;
var SUAVE_MID_MIN_RUN = 20;
var SUAVE_MID_MAX_RUN = 25;
var SUAVE_MAX_RUN = 27;
var FRACO_MIN_RUN = 23;
var FRACO_MID_RUN = 28;
var FRACO_MAX_RUN = LIM_MAX_RUN;

var pert_coke_fraco;
var pert_coke_suave;
var pert_coke_forte;

var pert_pepsi_fraco;
var pert_pepsi_suave;
var pert_pepsi_forte;

var pert_run_fraco;
var pert_run_suave;
var pert_run_forte;

var pertinencia_gelo;

var pertinencia_suave;
var pertinencia_forte;
var pertinencia_fraco;

var pertinencia_final;

var notCubaLibre =
"Esse drink não se enquadra na receita de Cuba Libre. " +
"[Coca-Cola (50ml a 60ml) ou Pepsi(60ml a 70ml), Run (10ml a 30ml) e Gelo (20ml)]";

var fraco = "Este drink é fraco e custa R$15,00";
var suave = "Este drink é suave e custa R$20,00";
var forte = "Este drink é forte e custa R$25,00";

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
    if((parseInt(sodaAmount.value) < LIM_MIN_COKE) || (parseInt(sodaAmount.value) > LIM_MAX_COKE))
    {
      isCubaLibre = false;
    }
  }
  else if(radioPepsi.checked)
  {
    if((parseInt(sodaAmount.value) < LIM_MIN_PEPSI) || (parseInt(sodaAmount.value) > LIM_MAX_PEPSI))
    {
      isCubaLibre = false;
    }
  }
  
  if((parseInt(runAmount.value) < LIM_MIN_RUN) || (parseInt(runAmount.value) > LIM_MAX_RUN))
  {
    isCubaLibre = false;
  }
  
  if((parseInt(iceAmount.value) < LIM_MIN_ICE) || (parseInt(iceAmount.value) > LIM_MAX_ICE))
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
    // Refri
    if(radioCoke.checked)
    {
      pert_coke_forte = calculaPertinenciaForte(FORTE_MIN_COKE,FORTE_MID_COKE,FORTE_MAX_COKE,parseInt(sodaAmount.value));
      pert_coke_suave = calculaPertinenciaSuave(SUAVE_MIN_COKE,SUAVE_MID_MIN_COKE,SUAVE_MID_MAX_COKE,SUAVE_MAX_COKE,parseInt(sodaAmount.value));
      pert_coke_fraco = calculaPertinenciaFraco(FRACO_MIN_COKE,FRACO_MID_COKE,FRACO_MAX_COKE,parseInt(sodaAmount.value));
    }
    else
    {
      pert_pepsi_forte = calculaPertinenciaForte(FORTE_MIN_PEPSI,FORTE_MID_PEPSI,FORTE_MAX_PEPSI,parseInt(sodaAmount.value));
      pert_pepsi_suave = calculaPertinenciaSuave(SUAVE_MIN_PEPSI,SUAVE_MID_MIN_PEPSI,SUAVE_MID_MAX_PEPSI,SUAVE_MAX_PEPSI,parseInt(sodaAmount.value));
      pert_pepsi_fraco = calculaPertinenciaFraco(FRACO_MIN_PEPSI,FRACO_MID_PEPSI,FRACO_MAX_PEPSI,parseInt(sodaAmount.value));
    }
    
    // Run
    pert_run_forte = calculaPertinenciaForte(FORTE_MIN_RUN,FORTE_MID_RUN,FORTE_MAX_RUN,parseInt(runAmount.value));
    pert_run_suave = calculaPertinenciaSuave(SUAVE_MIN_RUN,SUAVE_MID_MIN_RUN,SUAVE_MID_MAX_RUN,SUAVE_MAX_RUN,parseInt(runAmount.value));
    pert_run_fraco = calculaPertinenciaFraco(FRACO_MIN_RUN,FRACO_MID_RUN,FRACO_MAX_RUN,parseInt(runAmount.value));
    
    pertinencia_gelo = 1;
    
    pertinencia_suave = desfuzzyfySuave();
    pertinencia_forte = desfuzzyfyForte();
    pertinencia_fraco = desfuzzyfyFraco();
    
    pertinencia_final = desfuzzyfyFinal();
    
    if(pertinencia_final == pertinencia_forte)
    {
      printResult(forte,RESULT_X,RESULT_Y);
    }
    else if(pertinencia_final == pertinencia_suave)
    {
      printResult(suave,RESULT_X,RESULT_Y);
    }
    else if(pertinencia_final == pertinencia_fraco)
    {
      printResult(fraco,RESULT_X,RESULT_Y);
    }
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

function calculaPertinenciaForte(min, mid, max, x)
{
  if((x < min) || (x > max))
    return 0;
    
  if((x >= min) && (x < mid))
    return 1;
  
  if((x >= mid) && (x <= max))
    return ((max - x)/(max - mid));
}

function calculaPertinenciaSuave(min, mid_min, mid_max, max, x)
{
  if((x < min) || (x > max))
    return 0;
    
  if((x > mid_min) && (x < mid_max))
    return 1;
  
  if((x >= mid_max) && (x <= max))
    return ((max - x)/(max - mid_max));

  if((x >= min) && (x <= mid_min))
    return ((mid_min - x)/(mid_min - min));
}

function calculaPertinenciaFraco(min, mid, max, x)
{
  if((x < min) || (x > max))
    return 0;
    
  if((x <= max) && (x > mid))
    return 1;
  
  if((x >= min) && (x <= mid))
    return ((mid - x)/(mid - min));
}

function desfuzzyfySuave()
{
  var min1;
  var min2;
  var min3;
  var max;
  
  min1 = Math.min(pert_coke_forte,pert_run_fraco);
  min1 = Math.min(min1,pertinencia_gelo);
  
  min2 = Math.min(pert_coke_suave,pert_run_suave);
  min2 = Math.min(min2,pertinencia_gelo);
  
  min3 = Math.min(pert_coke_fraco,pert_run_forte);
  min3 = Math.min(min3,pertinencia_gelo);
  
  max = Math.max(min1,min2);
  max = Math.max(max,min3);
  
  return max;
}

function desfuzzyfyForte()
{
  var min1;
  var min2;
  var min3;
  var max;
  
  min1 = Math.min(pert_coke_forte,pert_run_suave);
  min1 = Math.min(min1,pertinencia_gelo);
  
  min2 = Math.min(pert_coke_forte,pert_run_forte);
  min2 = Math.min(min2,pertinencia_gelo);
  
  min3 = Math.min(pert_coke_suave,pert_run_forte);
  min3 = Math.min(min3,pertinencia_gelo);
  
  max = Math.max(min1,min2);
  max = Math.max(max,min3);
  
  return max;
}

function desfuzzyfyFraco()
{
  var min1;
  var min2;
  var min3;
  var max;
  
  min1 = Math.min(pert_coke_fraco,pert_run_fraco);
  min1 = Math.min(min1,pertinencia_gelo);
  
  min2 = Math.min(pert_coke_fraco,pert_run_suave);
  min2 = Math.min(min2,pertinencia_gelo);
  
  min3 = Math.min(pert_coke_suave,pert_run_fraco);
  min3 = Math.min(min3,pertinencia_gelo);
  
  max = Math.max(min1,min2);
  max = Math.max(max,min3);
  
  return max;
}

function desfuzzyfyFinal()
{
  var max;
  
  max = Math.max(pertinencia_suave,pertinencia_forte);
  max = Math.max(max,pertinencia_fraco);
  
  return max;
}