
status = "";
video="";
function setup()
{
    canvas = createCanvas(680,430);
    canvas.position(400,350);
    video = createVideo(VIDEO);
    video.hide();   
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function draw()
{
    image(video, 0,0,680,430);
}