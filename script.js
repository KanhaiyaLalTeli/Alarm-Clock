const alarmSetButton=document.getElementById('alarmSetButton');
const currentTimeShow=document.getElementById('currentTime');
const stopAlarm=document.getElementById('stopBtn');
const hours=document.getElementById('hours');
const minutes=document.getElementById('minutes');
const seconds=document.getElementById('second');
const amPm=document.getElementById('amPm')
const alarmList=document.getElementById('alarmList');

const audio= new Audio('./asset/Alarm_Ringtone.mp3')
audio.loop=true;

let alarmListArray=[];

function checkInput(input){
    input.addEventListener('input', function() {
        if (parseInt(this.value) > parseInt(this.max)) {
          this.value = this.max;
        }
      });
}
checkInput(hours);
checkInput(minutes);
checkInput(seconds);


function currentTime(){
    const time=new Date();
    var hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    if(hours==12){
        var now=`${(hours).toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} PM`;
    }
    
    else if(hours>11)
        {
            var now=`${(hours-12).toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} PM`;            
        }
    else{
        var now=`${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} AM`;        
    }

    return now;

}

setInterval(function(){

    const now=currentTime();  
    currentTimeShow.innerText=now;  

},1000)

alarmSetButton.addEventListener('click',setAlarm)

function setAlarm(){

    const alarmHours=hours.value;
    const alarmMinutes=minutes.value;
    const alarmSeconds=seconds.value;
    const alarmAmPm=amPm.value;
  
    if(alarmAmPm=='AM')
        {
            var totalalarmseconds=alarmHours*60*60 + Number(alarmMinutes)*60 +Number(alarmSeconds);
        }
    else if(alarmAmPm=='PM')
        {
            var totalalarmseconds=(alarmHours*60*60 + Number(alarmMinutes)*60 +Number(alarmSeconds))*2;
        }
    
     if(!totalalarmseconds)
        {
            alert("Please select Correct Time and AM/PM");
            return;
        }
      else{
        let singleAlarm={
            Hours : alarmHours,
            Minutes: alarmMinutes,
            Seconds : alarmSeconds,
            AmPm : alarmAmPm,
            id : totalalarmseconds
        
        };
        alarmListArray.push(singleAlarm);

        ringAlarm();

        hours.value="";
        minutes.value="";
        seconds.value="";
        amPm.value="AM/PM";

        renderAlarmList(singleAlarm);
      }
}


function ringAlarm(){

    setInterval(function(){
     
    const now=currentTime();

        alarmListArray.forEach((key)=>{
         let alarmTime=`${(key.Hours).toString().padStart(2, '0')} : ${key.Minutes.toString().padStart(2, '0')} : ${key.Seconds.toString().padStart(2, '0')} ${key.AmPm}`;
         if(now===alarmTime)
             {
                  audio.play();
                  alert("Alarm Time "+ now);
                    stopAlarm.addEventListener('click',function(){
                     audio.pause();
                    })
            }
     })  
 },1000)
 }

function renderAlarmList(key){

        const alarmContainer=document.createElement('div');
        const alarm=document.createElement('span');
        const deleteBtn=document.createElement('button');
        deleteBtn.innerText="Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.setAttribute("data-id",key.id)
        alarm.innerText=`${key.Hours.toString().padStart(2, '0')} : ${key.Minutes.toString().padStart(2, '0')} : ${key.Seconds.toString().padStart(2, '0')} ${key.AmPm}`;
        alarmContainer.append(alarm);
        alarmContainer.append(deleteBtn)
        alarmList.append(alarmContainer);

        deleteBtn.addEventListener('click',function(event){
           deleteAlarm(event.target.parentElement,key.id)

        })   
}

function deleteAlarm(element,id){

  alarmListArray.forEach((key,index)=>{
    if(key.id===id){
        alarmListArray.splice(index,1);
        element.remove();
    }
  })
}
