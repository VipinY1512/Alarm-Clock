const currentTime = document.querySelector(".current-time");
const timeFormat = document.querySelector("span");
const setAlarmBtn = document.querySelector("button");
const alarmList = document.querySelector(".alarm-list");
const hours = document.getElementById("hour");
const minutes = document.getElementById("min");
const selectZone = document.querySelector(".select-zone");

// Function to show the current time on  the window
const time = () =>{
    const date = new Date();
    let hour = String(date.getHours()).padStart(2,"0");
    let min = String(date.getMinutes()).padStart(2,"0");
    let sec = String(date.getSeconds()).padStart(2,"0");
    
    const amOrPm = hour >= 12 ? `<span>PM</span>` : `<span>AM</span>`;
    hour = (hour % 12) || 12;
    if(hour<10){
        hour = String(hour).padStart(2,"0");
    }
    const newTime = `<h2>${hour}:${min}:${sec}</h2>`;
    currentTime.innerHTML = newTime + amOrPm;

}
setInterval(time, 1000);


// Adding eventListener to the set alarm button for setting the alarm
setAlarmBtn.addEventListener('click', (e) =>{
    alarmList.style.display = "block";
    e.preventDefault();
    const alarmHour = String(hours.value).padStart(2,"0");
    const alarmMinute = String(minutes.value).padStart(2,"0");
    // conditions checks for right timing
    if(alarmHour === "00" & alarmMinute === "00"){
        window.alert("Please Enter Time!!")
        alarmList.style.display = "none";
        return;
    }else if(alarmHour !== "" && alarmMinute === ""){
        alarmMinute.padStart(2,"00");
    }else if(alarmHour >12 || alarmMinute > 60 ){
        alert("Please set Alarm with Right Timing!!");
        return;
    }
    const listItems = document.createElement("li");
    listItems.classList.add("list-item");
    listItems.innerHTML = `<h3>${alarmHour}:${alarmMinute} ${selectZone.value}</h3>`;
    alarmList.appendChild(listItems);
    deleteAlarm(listItems);
});

// function to delete alarms added in the list
const deleteAlarm = (listItems) =>{
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-alarm");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click",() =>{
        // listItems.style.display = "none";
        alarmList.removeChild(listItems);
    });
    listItems.appendChild(deleteButton);

}

// Function to check if the alarm time matches the current time
let triggeredAlarms = {};
const checkAlarm = () => {
    const date = new Date();
    let currentHour = String(date.getHours()).padStart(2, "0");
    let currentMinute = String(date.getMinutes()).padStart(2, "0");
    let currentZone = date.getHours() >= 12 ? 'PM' : 'AM';
    currentHour = (currentHour % 12) || 12;
    if(currentHour < 10){
        currentHour = String(currentHour).padStart(2,"0")
    }
    // Loop through each alarm set in the list
    const alarms = document.querySelectorAll(".list-item");
    alarms.forEach(alarm => {
        const alarmTime = alarm.querySelector('h3').textContent.trim();
        const [alarmHour, alarmMinute, alarmZone] = alarmTime.split(/:| /);
        // Compare the alarm time with the current time
        if (
            currentHour === alarmHour &&
            currentMinute === alarmMinute &&
            alarmZone === currentZone &&
            !triggeredAlarms[alarmTime]
        ) {
            // Trigger an alert when the alarm time matches the current time
            window.alert("Alarm time completed! " + alarmTime);
            triggeredAlarms[alarmTime] = true;
            // alarm.style.display = "none"; // Hide the alarm from the list
        }
    });
};

// Run the checkAlarm function at regular intervals (every second)
setInterval(checkAlarm, 1000);






