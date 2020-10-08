NoseX = 0;
NoseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;
function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 550);
    video.position(10, 100)

    canvas = createCanvas(600, 550);
    canvas.position(620, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded()
{
    console.log("poseNet is initialized!");
}

function draw()
{
    document.getElementById("square_side").innerHTML = "Width and height of the square will be " + difference + "px";
    background("#FF6F61");
    fill("#FF1493");
    stroke("#FF0000");
    square(NoseX, NoseY, difference);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        NoseX = results[0].pose.nose.x;
        NoseY = results[0].pose.nose.y;
        console.log("x = " + NoseX + "y = " + NoseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("left wrist x = " + leftWristX + "right wrist x = " + rightWristX + "difference = " + difference);
    }
}