// async function time() {
//     let timeZones = fetch("https://api.timeapi.io/api/TimeZone/AvailableTimeZones");
//     let data = await timeZones.json();
//     console.log(data);
// }
// time();


// target add button
const addButton = document.querySelector('#add-clock-button');
const countryInput = document.querySelector('#country-name-input');
countryInput.addEventListener('keydown', handleEnterKeyPress);
function handleEnterKeyPress(event) {
    if (event.keyCode == 13) {
        console.log('pressed Enter');
        addClock();
    }
    else {
        console.log('It was not the enter key');
    }
}
countryInput.addEventListener('change', addClock);

// execute addFlag() on button click event 
addButton.addEventListener('click', addClock);

async function addClock() {
    // fetch all country names 
    let countryName = document.querySelector('#country-name-input').value;
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
    console.log('country name: ', countryName);

    const response = await fetch("https://flagcdn.com/en/codes.json");
    const countryCodes = await response.json();
    console.log('country codes: ', countryCodes);

    const countryCode = getKeyByValue(countryCodes, countryName);
    console.log('country code found: ', countryCode);

    // const countryCode = findCountryCode(countryName, countryCodes);
    const flagUrl = getFlagUrl(countryCode);
    console.log('Got flag url: ', flagUrl);


    createClock(countryCode, countryName, flagUrl);
    // setFlag(flagUrl, countryName);
    // setName(countryName);

    checkCardCount();

    console.log("end of the addClock()");
}

// function to find the key of a value in a given object 
function getKeyByValue(object, value) {
    console.log('params passed to getKeyByValue(): ', object, value);
    // Loop through each property in the object
    for (const key in object) {
        // Check if the current property's value matches the target value
        if (object[key] === value) {
            // Return the key if a match is found
            return key;
        }
    }

    console.log('key found in getKeyByValue(): ', key);
    // Return null if no match is found
    return null;
}

// find the country code 
function findCountryCode(countryName, countryCodes) {

    // if country name is present in the object then return the corresponding country code 
    if (countryCodes[countryName]) {
        var countryCode = countryCodes[countryName];
        console.log('country code for country "' + countryName + '" is: ' + countryCode);

    } else {
        console.log('Country name not found.');
    }

    // return the country code 
    return countryCode;
}

// get the flag url 
function getFlagUrl(countryCode) {
    console.log('inside getFlagUrl() passed countryCode: ', countryCode);

    // store the country flag url
    const flagUrl = `https://flagcdn.com/${countryCode}.svg`; //backticks are used to use js variables inside the string
    console.log('inside getFlagUrl() found flagUrl', flagUrl);

    // return the flag url 
    return flagUrl;
}

// set the flag inside the clock
// function setFlag(flagUrl) {
//     // Get the root element to access the CSS variables
//     const root = document.documentElement;
//     // Change the value of the --icon-flag variable
//     root.style.setProperty('--icon-flag', `url(${flagUrl})`);
// }

// function to set country name
// function setName(countryName) {
//     const countryNameField = document.querySelector('#country-name');
//     countryNameField.innerText = countryName;
// }

//====================features to add========================


// function to fetch data 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// function to create option 
function createOption(country) {
    const option = document.createElement('option');
    option.value = country.name.common;
    option.innerText = country.name.common.toUpperCase();
    option.setAttribute('data-country-code', country.cca3);
    return option;
}

//function to clear the dropdown list
function clearDropdown(dropdown) {
    dropdown.innerHTML = '';

    console.log('cleared dropdown!!');
}
// --------tried to find the timezone by concatenating the region and subregion--------- 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "7bd851f41aa8d4d1220642c55cf519d2";
const openWeatherUrl = apiUrl + "all&appid=" + apiKey;


// 1. fetch the datalist of all the timezones, country names, and cca3 country codes
// Fetch country data on page load
window.addEventListener('DOMContentLoaded', async () => {
    // Fetch weather data (if needed)
    // const openWeatherData = await fetchData(openWeatherUrl);
    // console.log(openWeatherData, 'countrydata from open weather');
    // const timezones = openWeatherData.region + '/' + openWeatherData.subregion;
    // console.log('timezones are : ', timezones);

    // Fetch rest country data
    const restCountryUrl = 'https://restcountries.com/v3.1/all?fields=name,timezones,cca3,region,subregion';
    const restCountryData = await fetchData(restCountryUrl);
    console.log('restCountryData: ', restCountryData);

    // Sort country data by name in ascending order
    const sortedCountryData = restCountryData.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    // Populate dropdown list
    const dropdown = document.querySelector('#country-name-input');
    // clearDropdown(dropdown); // Clear existing options

    sortedCountryData.forEach(country => {
        const option = createOption(country);
        dropdown.appendChild(option);
        // console.log('appending option in datalist: ', option);
    });
});

// 3. feature to create a card when click on add button after searching and selecting a timezone
function createClock(countryCode, countryName, flagUrl) {

    // if a unique country clock 
    const clocks = document.querySelectorAll(`.country-clock > .col[data-country-code = ${countryCode}]`);
    if (clocks.length < 1) {
        const clockHTML =
            `<!-- ${countryName} clock  -->
    <div class="col" onclick="deleteClock(this)" data-country-code="${countryCode}">
        <div class="row time">
            <p class="hour">00</p>: <p class="minute">00</p> : <p class="minute">00</p>
        </div>

        <div class="row clock">
            <!-- analog clock -->
            <div class="clock">
                <!-- clock numberings -->
                <div class="col num twelve">
                    <div class=" hour-num"></div>
                    <span>12</span>
                </div>
                <div class="col num one">
                    <div class=" hour-num"></div>
                    <span>1</span>
                </div>
                <div class="col num two">
                    <div class=" hour-num"></div>
                    <span>2</span>
                </div>
                <div class="col num three">
                    <div class=" hour-num"></div>
                    <span>3</span>
                </div>
                <div class="col num four">
                    <div class=" hour-num"></div>
                    <span>4</span>
                </div>
                <div class="col num five">
                    <div class=" hour-num"></div>
                    <span>5</span>
                </div>
                <div class="col num six">
                    <div class=" hour-num"></div>
                    <span>6</span>
                </div>
                <div class="col num seven">
                    <div class=" hour-num"></div>
                    <span>7</span>
                </div>
                <div class="col num eight">
                    <div class=" hour-num"></div>
                    <span>8</span>
                </div>
                <div class="col num nine">
                    <div class=" hour-num"></div>
                    <span>9</span>
                </div>
                <div class="col num ten">
                    <div class=" hour-num"></div>
                    <span>10</span>
                </div>
                <div class="col num eleven">
                    <div class=" hour-num"></div>
                    <span>11</span>
                </div>
                <!-- clock needles -->
                <!-- hour hand -->
                <div class="col needle hour-hand">
                    <div class="hand">
                        <div class="hour"></div>
                        </div>
                        </div>
                        <!-- minute hand -->
                        <div class="col needle minute-hand">
                        <div class="hand">
                        <div class="minute"></div>
                        </div>
                        </div>
                        <!-- second hand -->
                        <div class="col needle second-hand">
                        <div class="hand">
                        <div class="second"></div>
                        </div>
                        </div>
                        <!-- middle circle -->
                <div class="col circle"></div>
            </div>
        </div>

        <div class="row country" title="${countryName}">
            <div class="col flag" style="background-image: url(${flagUrl});">
    
            </div>
            <div class="col name">
                <p
                    class="country1"
                    id="country-name"
                    
                >${countryName}</p>
            </div>
        </div>
    </div>`;

        // append html code inside the country clock container 
        const clockContainer = document.querySelector('.country-clock');
        clockContainer.innerHTML += clockHTML;
        console.log('inserted the html code for Clock!');

        // ------------tried to adding event listener on each card when created ------------ 
        // // Wait for the next animation frame to ensure the DOM has been updated
        // requestAnimationFrame(() => {
        //     // Get the newly added clock element
        //     const newClock = clockContainer.lastElementChild;

        //     // Add event listener to the new clock
        //     newClock.addEventListener('click', () => deleteClock(countryCode));
        //     console.log('Added click event listener for clock with countryCode:', countryCode);
        // });
    }

    // reset the value of dorpdown 
    const dropdown = document.querySelector('#country-name-input');
    dropdown.selectedIndex = 0;
}

// 4. a delete badge on top of each card to delete the card
// function to delete the clock 
function deleteClock(clickedClock) {
    console.log("deleteClock called!!");

    const countryCode = clickedClock.dataset.countryCode;
    clickedClock.remove();
    console.log('removed: ', countryCode);

    checkCardCount();
};


// 5. if the display is small and cards are too many, then make the container a carousel


//6. add navigation feature to scroll to the previous/next clock
const clockContainer = document.querySelector('.country-clock');
const prevClockBtn = document.querySelector('.nav-prev');
const nextClockBtn = document.querySelector('.nav-next');
console.log('prevClockbtn: ', prevClockBtn);
console.log('prevClockbtn: ', nextClockBtn);

// add event listener to prevClockBtn and nextClockBtn 
prevClockBtn.addEventListener('click', () => scrollClockContainer(-30));
console.log('click prev button');
nextClockBtn.addEventListener('click', () => scrollClockContainer(30));
console.log('click next button');


// ================ not working ======================= 
// Function to scroll the clock container
function scrollClockContainer(scrollAmount) {
    console.log('inside scrollClockConatiner()');
    
    // Get the current scroll position and container width
    const currentScrollLeft = clockContainer.scrollLeft;
    const containerWidth = clockContainer.clientWidth;

    // Calculate the new scroll position
    const newScrollLeft = Math.max(0, Math.min(currentScrollLeft + scrollAmount, clockContainer.scrollWidth - containerWidth));

    console.log(newScrollLeft, 'value of newScrollLeft');

    // Scroll the clock container to the new position with smooth behavior
    clockContainer.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
    });
}
// ================ not working ======================= 


// 7. hide alert when card present / display alert when no card present
// target no-clock-alert message     
function checkCardCount() {
    console.log('running onchange!!!');
    const clocks = document.querySelectorAll('.country-clock > .col');
    if (clocks.length > 0) {
        hideAlert();
    } else {
        displayAlert();
    }
}

function displayAlert() {
    const noClockAlert = document.querySelector('#no-clock-alert');
    noClockAlert.style.setProperty('display', 'flex');
    console.log('display alert executed');
}

function hideAlert() {
    const noClockAlert = document.querySelector('#no-clock-alert');
    noClockAlert.style.setProperty('display', 'none');
    console.log('hide alert executed');
}