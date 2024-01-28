document.addEventListener('DOMContentLoaded', clock);

function clock() {
    const hourHand = document.querySelector('.clock__hour-hand__outer');
    const minuteHand = document.querySelector('.clock__minute-hand__outer');
    const secondHand = document.querySelector('.clock__second-hand__outer');

    const runClock = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        var hourAngle = (hours * 360 / 12) + (minutes / 60) * 30;
        var minuteAngle = (minutes * 360 / 60) + (seconds / 60) * 6;
        var secondAngle = seconds * 360 / 60;

        hourHand.style.transform = `rotate(${hourAngle}deg)`;
        minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        secondHand.style.transform = `rotate(${secondAngle}deg)`;
    }

    runClock();
    setInterval(runClock, 1000);
}






