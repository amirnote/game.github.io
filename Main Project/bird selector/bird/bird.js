//main(صفحه اصلی ما )
let main;
let mainwidth = 440 ;
let mainheight  =680;
let context ;

 //bird
 let birdwidth = 34;//عرض ظول پرنده رو مشخص میکنیم
 let birdheight = 24;
 let birdx = mainwidth/8;//برای پوزیضن پرنده باید عرض صفحه رو تقسیم بر 8 کنیم
 let birdy = mainheight/2;//برای پوزیشن عمودی پرنده هم باید ارتفاع تقسیم بر 2 کنیم
 let bird = {
    x : birdx,
    y : birdy,
    width : birdwidth,
    height : birdheight
 }
 //pipes
 let pipeArray = [];
 let pipewidth= 64;// عرض/ارتفاع = 384/3072 = 1/8
 let pipeheight = 512 ;
 let pipex = mainwidth;
 let pipey = 0 ;

 let toppipeimg ;
 let downpipeimg ; 


//فیزیک بازی
let velocityx = -2;//سرعت حرکت موانع به سمت چپ
let velocityy = 0; // مقدار جرکت در جها y
let gravity = 0.4 ; // ایجاد جاذبه
let gameover = false;
let score = 0 ;



window.onload = function(){
    main = document.getElementById("main");
    main.height = mainheight ;
    main.width = mainwidth ;
    context = main.getContext("2d"); // برای کشیدن روی ()let main

//کشیدن پرنده روی صفحه اصلی
    //context.fillStyle = "green";
    //context.fillRect(bird.x, bird.y, bird.width, bird.height);
//لود شدن عکس ها 
    birdimg = new Image();//این برای پرنده
      birdimg.src = "./flappybird.png";
    birdimg.onload = function(){
      context.drawImage(birdimg, bird.x, bird.y, bird.width, bird.height)};

    toppipeimg = new Image();//این برای موانع یا همون pipe ها
    toppipeimg.src = "./toppipe.png";  
    
    downpipeimg = new Image();//موانع که از پایین لود میشن
    downpipeimg.src = "./bottompipe.png";   

    requestAnimationFrame(update);
    setInterval(placepipes, 1000);//هر 1.5 صانیه موانع تولید میکنه
    document.addEventListener("mousedown",movebird);
    document.addEventListener("keydown",movebird);
    
    }
      //برای تکرار فریم در هر قانیه 
function update(){
    
    requestAnimationFrame(update);
    if (gameover) {
        return ;
    }
    context.clearRect(0, 0 ,main.width, main.height);// پاک کردن صفحه بعد ار هر فریم 
    //bird
    velocityy += gravity;
    //bird.y += velocityy;
    bird.y = Math.max(bird.y + velocityy, 0);//باعث میشه شی ما بالای تر از صفحه نره
    context.drawImage(birdimg, bird.x, bird.y, bird.width, bird.height);//ایجاد دوباره پرنده در هر فریم
    if (bird.y > main.height){
        gameover = true ; 
    }
    //ایجاد موانع 

    for (let i = 0 ; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityx;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        
        if (!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;//چون هر کدوم یکی اضافه میکنه پس باید تقسیم بر 2 بشه
            pipe.passed= true;
        }  

        if(detectCollision(bird, pipe )){
            gameover = true;
        }
    }
    //پاک کردن مانع ها
    while(pipeArray.length> 0 && pipeArray[0].x < -pipewidth){
          pipeArray.shift();
    }

    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45); 
     
    
    
    if(gameover){
        context.fillText("نشد که بشه ):",90 , 350);
    }
}

//فانکشن برای تولید موانع
function placepipes() {
    if (gameover){

        return;
    }
    let randompipey = pipey - pipeheight/4 - Math.random()*pipeheight/2;//باعث تولید 2 سایز جدا میشه
    let space = main.height/4;
    let toppipe = {
       img : toppipeimg,                                
        x  : pipex,
        y  : randompipey,
        width  : pipewidth,
        height : pipeheight,
        passed : false
    }
    let downpipe = {
        img : downpipeimg,
        x : pipex , 
        y : randompipey + pipeheight + space ,
        width :pipewidth ,
        height :pipeheight ,
        passed : false
    }
    pipeArray.push(toppipe); 
    pipeArray.push(downpipe);
}




function movebird(e) {
if (e.code == "Space" || e.code == "click" || e.code == "onclick"){
    velocityy = -6;


    //ریستارت کردن بازی
    if(gameover){
        bird.y = birdy;
        pipeArray = [];
        score = 0 ;
        gameover = false;
    }
}}
//منطق بازی
function detectCollision(a, b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
document.addEventListener("click", function() {
    velocityy = -6;
    if(gameover){
        bird.y = birdy;
        pipeArray = [];
        score = 0 ;
        gameover = false;
    }
});

 
 