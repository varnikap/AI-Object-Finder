
status = "";

objects=[];

function setup()
{
    canvas = createCanvas(430,430);
    canvas.position(550,350);
    video = createCapture(VIDEO);
    video.size(430,430);
    video.hide();   
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;

}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function draw()
{
    image(video, 0,0,680,430);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("#FF0000");
            percentage = floor(objects[i].confidence * 100);
            text( objects[i].label +"" + percentage + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect( objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
       
        if(objects[i].label == object_name)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + "Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
        }
        else
        {
            document.getElementById("object_status").innerHTML = object_name + "Not Found";
        }
    }
    }
                 
    }


function gotResult(error,results)
{
    if(error) {
        console.log(error);
    }
    console.log(results);
        objects = results;
    
}