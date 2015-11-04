//declare variables

//body vars
var bodyX;
var bodyY;
var bodyW = 20;

//head vars
var headX;
var headY;
var headW;

//front paw vars
var fPawYDiff;
var fPawW;
var fPawH;

//rear paw vars
var rPawYDiff;
var rPawW;
var rPawH;

//front leg vars
var fLegXDiff;
var fLegYDiff;
var fLegW;
var fLegH;

//rear leg vars
var rLegXDiff;
var rLegYDiff;
var rLegW;
var rLegH;

//tail vars
var tailX;
var tailY;
var tailW;

//animation vars
var animLoop = 0;
var animFrameDefault = 0.09;
var animFrame = animFrameDefault;
var sizePlusDefault = 1.016;
var sizePlus = sizePlusDefault;

//color vars
//initial background color
var oldColor = color(205,255, 255);

//initial cat color
var currentR = 240;
var currentG = 210;
var currentB = 35;
var currentColor = color(currentR, currentG, currentB);

//decrease to turn eyes red
var eyeGB = 255;



//loop each frame
draw = function() {
    
    //bounce between 1 and -1
    if(animLoop >= 1 || animLoop <= -1){
        animFrame *= -1;
    }
    
    //increment animations
    animLoop += animFrame;
    
    //body position
    bodyX = 200;
    bodyY = 200-animLoop*bodyW*0.22;
    bodyW *= sizePlus;

    //red eyes
    if(bodyW >140){
        eyeGB -= 12;
    }

    //final pounce
    if(bodyW >200){
        sizePlus *= 1.01;
    }
    
    //reset everything
    if(bodyW >= 1100){
        bodyW = 1;
        animLoop = 0;
        sizePlus = sizePlusDefault;
        animFrame = animFrameDefault;
        eyeGB = 255;

        //save current cat color values for background
        oldColor = color(currentR,currentG,currentB);

        //randomize new cat color values
        currentR = (currentR + random(75,175)) % 255;
        currentG = (currentG + random(75,175)) % 255;
        currentB = (currentB + random(75,175)) % 255;
    
        currentColor = (currentR,currentG,currentB);
    }


    //body placement and animations
    
    //head placement
    headX = bodyX+bodyW*animLoop*0.05;
    headY = bodyY-bodyW*0.3+bodyW*abs(animLoop)*0.04;
    headW = bodyW*0.8;
    
    //paw placement (Must be before legs)
    //front paws
    fPawYDiff = bodyW*0.9+bodyW*0.5*-abs(animLoop+0.1);
    fPawW = bodyW*0.24+bodyW*0.05*animLoop;
    fPawH = bodyW*0.18+bodyW*0.05*animLoop;
    //rear paws
    rPawYDiff = bodyW*0.8+bodyW*0.5*-abs(animLoop+0.4);
    rPawW = bodyW*0.17+bodyW*0.03*-animLoop;
    rPawH = bodyW*0.12+bodyW*0.03*-animLoop;
    
    //leg placement
    //front legs
    fLegXDiff = bodyW*0.35;
    fLegYDiff = fPawYDiff/2;
    fLegW = bodyW*0.2+bodyW*0.03*animLoop;
    fLegH = (fPawYDiff-fLegYDiff)*2;
    //rear legs
    rLegXDiff = bodyW*0.17;
    rLegYDiff = rPawYDiff/2;
    rLegW = bodyW*0.17+bodyW*0.03*-animLoop;
    rLegH = (rPawYDiff-rLegYDiff)*2;
    
    //tail placement
    tailX = bodyX-bodyW*0.46*animLoop;
    tailY = bodyY-bodyW*0.18;
    tailW = bodyW*0.17;    
    
    
    //start drawing
        background(oldColor);
        fill(currentColor);
    
        //draw tail
        rect(bodyX,tailY-tailW/2,tailX-bodyX,tailW);
        ellipse(tailX,tailY,tailW,tailW);
        
        //draw rear legs 
        //rear left leg
        ellipse(bodyX-rLegXDiff,bodyY+rLegYDiff,rLegW,rLegH);
        //rear left paw
        ellipse(bodyX-rLegXDiff,bodyY+rPawYDiff,rPawW,rPawH);    
        //rear right leg
        ellipse(bodyX+rLegXDiff,bodyY+rLegYDiff,rLegW,rLegH);
        //rear right paw
        ellipse(bodyX+rLegXDiff,bodyY+rPawYDiff,rPawW,rPawH);   
    
        //draw body
        ellipse(bodyX, bodyY, bodyW, bodyW*0.9);

        //draw front legs
        //front left leg
        ellipse(bodyX-fLegXDiff,bodyY+fLegYDiff,fLegW,fLegH);
        //front left paw
        ellipse(bodyX-fLegXDiff,bodyY+fPawYDiff,fPawW,fPawH);    
        //front right leg
        ellipse(bodyX+fLegXDiff,bodyY+fLegYDiff,fLegW,fLegH);
        //front right paw
        ellipse(bodyX+fLegXDiff,bodyY+fPawYDiff,fPawW,fPawH);    

        //draw head
        ellipse(headX, headY, headW, headW*1.1);
        //left ear
        triangle(headX-headW*0.47,headY-headW*0.64,headX-headW*0.41,headY-headW*0.24,headX-headW*0.2,headY-headW*0.45); 
        //right ear
        triangle(headX+headW*0.47,headY-headW*0.64,headX+headW*0.41,headY-headW*0.24,headX+headW*0.2,headY-headW*0.45);
        //eyes
        fill(255,eyeGB,eyeGB);
        //left eye
        ellipse(headX-headW*0.175, headY, headW*0.25, headW*0.2);
        //right eye
        ellipse(headX+headW*0.175, headY, headW*0.25, headW*0.2);

};
