imaage = "";
status = "";
object = [];

function preload(){

    imaage = loadImage("20210711_160247.jpg");

}
function setup(){

    canvas = createCanvas(640, 420);
    canvas.center();
    
    objectDetectorCOOCOO = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object :)";

}

function draw(){
    
    image(imaage, 0, 0, 640, 420);

    if(status != ""){

        for(i = 0; i < object.length; i++){

            document.getElementById("status").innerHTML = "Status: Object Detected :D";
            fill("#ff0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label  + " " + percent + "%,", object[i].x, object[i].y + 10);
            noFill();
            stroke("#ff0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

        }

    }

}

function modelLoaded(){

    console.log("model has been loaded");
    status = true;
    objectDetectorCOOCOO.detect(imaage, gotResult);

}

function gotResult(error, results){

    if(error){

        console.error(error);

    }
    else{

        console.log(results);
        object = results;

    }

}