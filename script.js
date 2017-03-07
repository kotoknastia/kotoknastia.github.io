window.addEventListener("load", init, false);

function init() {
	validation = false;
	validationEmail = false;
	validationName = false;
	validationCountry = false;
	validationCity = false;
	validationSocial = false;
	validationCat = false;
	validationFb = true;
	validationVk = true;
	validationTwit = true;
	validationOk = true;
	count = 0;
	ableBtn = 0;
	valSocial = undefined;
	buttonsAble = {"one" : "able", "two": "disable", "three": "disable", "four": "disable"};
	validateButton();
	$("one").onclick = firstBtn;
	$("two").onclick = secondBtn;
	$("three").onclick = thirdBtn;
	$("four").onclick = fourthBtn;
    $("name").oninput = nameOnChange;
    $("mail").oninput = emailOnChange;
    $("next").onclick = nextOnClick;
    $("prev").onclick = prevOnClick;
    $("country").oninput = countryOnChange;
    $("city").oninput = cityOnChange;
    $("fb").onchange = fbChecked;
    $("vk").onchange = vkChecked;
    $("twit").onchange = twitChecked;
    $("ok").onchange = okChecked;
    $("fbChecked").oninput = fbOnChange;
    $("vkChecked").oninput = vkOnChange;
    $("twitChecked").oninput = twitOnChange;
    $("okChecked").oninput = okOnChange;
    $("cat1").onclick = choosenCat1;
    $("cat2").onclick = choosenCat2;
    $("cat3").onclick = choosenCat3;
    $("dog4").onclick = choosenDog4;
    $("finishBtn").onclick = finish;
    $("again").onclick = tryAgain;
    ableSteps(count);
    prevClick();
    addCountries();
}

function $(id) {
    return document.getElementById(id);
}

function save(key,value) {
	window.localStorage[key] = value;
}

function validate(elem, pattern) {
    var res = elem.value.search(pattern);
    if (res == -1) elem.className = "invalid"; 
    else elem.className = "valid";
}

function firstBtn() {
	count = 0;
	buttons(count);
	steps(count);
	prevClick();
	validateButton();
	$("finishBtn").setAttributeNode(document.createAttribute("hidden"));
	$("next").removeAttribute("hidden");
}

function secondBtn() {
	count = 1;
	buttons(count);
	steps(count);
	prevClick();
	validateButton();
	$("finishBtn").setAttributeNode(document.createAttribute("hidden"));
	$("next").removeAttribute("hidden");
}

function thirdBtn() {
	count = 2;
	buttons(count);
	steps(count);
	prevClick();
	validateButton();
	$("finishBtn").setAttributeNode(document.createAttribute("hidden"));
	$("next").removeAttribute("hidden");
}

function fourthBtn() {
	count = 3;
	buttons(count);
	steps(count);
	prevClick();
	validateButton();
}

function nameOnChange() {
    var pattern = /\S \S/; //любой не пробельный символ
    validate(this, pattern);
    if (this.className == "invalid") {
    	$("nameErr").innerHTML = "- введите имя и фамилию";
    	validationName = false;
    } else if (this.value == "") {
    	validationName = false;
    } else {
    	$("nameErr").innerHTML = "";
    	validationName = true;
    	val = this.value;
    	save("name", val);
    }
    validateButton();
}

function emailOnChange() {
    var pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
    validate(this, pattern);
    var pattern1 = /\@/;
    var pattern2 = /\./;
    var res1 = this.value.search(pattern1);
    var res2 = this.value.search(pattern2);
    if (res1 == -1) {
    	$("emailErr").innerHTML = "- в адресе должен быть символ '@'";
    	validationEmail = false;
    } else if (res2 == -1) {
    	$("emailErr").innerHTML = "- в адресе должен быть символ '.'";
    	validationEmail = false;
    } else if (this.value == "") {
    	validationEmail = false;
    } else if (this.className == "invalid") {
    	validationEmail = false;
    } else {
    	$("emailErr").innerHTML = "";
    	validationEmail = true;
    	val = this.value;
    	save("email", val);
    }
    validateButton();
}

function countryOnChange() {
	var pattern = /\S/; //любой не пробельный символ
    validate(this, pattern);
    if (this.className == "invalid") {
    	$("countryErr").innerHTML = "- выберите страну";
    	validationCountry = false;
    } else if (this.value == "") {
    	$("countryErr").innerHTML = "- выберите страну";
    	validationCountry = false;
    } else {
    	$("countryErr").innerHTML = "";
    	validationCountry = true;
    	val = this.value;
    	save("country", val);
    }
    validateButton();
    $("cities").innerHTML = "";
    chooseCountry();
}

function cityOnChange() {
	var pattern = /\S/; //любой не пробельный символ
    validate(this, pattern);
    if (this.className == "invalid") {
    	$("cityErr").innerHTML = "- выберите город";
    	validationCity = false;
    } else if (this.value == "") {
    	$("cityErr").innerHTML = "- выберите город";
    	validationCity = false;
    } else {
    	$("cityErr").innerHTML = "";
    	validationCity = true;
    	val = this.value;
    	save("city", val);
    }
    validateButton();
}

function chooseCountry() {
	var country = $("country").value;
	switch(country) {
		case "Ukraine": {
			chooseCity(1);
		}; break;
		case "France": {
			chooseCity(3);
		}; break;
		case "Spain": {
			chooseCity(4);
		}; break;
		case "USA": {
			chooseCity(6);
		}; break;
		case "Canada": {
			chooseCity(7);
		}; break;
		case "Moldova": {
			chooseCity(8);
		}; break;
		case "Belarus": {
			chooseCity(9);
		}; break;
		case "Poland": {
			chooseCity(10);
		}; break;
	}
}

function chooseCity(number) {
	var cities = {
	    "2": {"country": 3, "name": "Paris"},
	    "3": {"country": 4, "name": "Madrid"},
	    "4": {"country": 6, "name": "Houston"},
	    "5": {"country": 7, "name": "Montreal"},
	    "6": {"country": 8, "name": "Кишинев"},
	    "7": {"country": 9, "name": "Minsk"},
	    "8": {"country": 10, "name": "Warsaw"},
	    "100": {"country": 1, "name": "Львов"},
	    "101": {"country": 1, "name": "Николаев"},
	    "103": {"country": 1, "name": "Переяслав-Хмельницкий"},
	    "104": {"country": 1, "name": "Каменец-Подольский"},
	    "105": {"country": 1, "name": "Donetsk"},
	    "106": {"country": 1, "name": "Kharkov"},
	    "107": {"country": 1, "name": "Луцк"},
	    "108": {"country": 1, "name": "Poltava"},
	    "109": {"country": 1, "name": "Черновцы"},
	    "299": {"country": 1, "name": "Чернигов"}
	}
	for (city in cities) {
		if (cities[city].country == number) {
			$("cities").innerHTML += "<option value=" + cities[city].name + "></option>";
		}
	}
} 

function fbChecked() {
	if (this.checked) {
		$("fbChecked").removeAttribute("hidden");
		validationFb = false;
	} else {
		$("fbChecked").setAttributeNode(document.createAttribute("hidden"));
	}
}

function vkChecked() {
	if (this.checked) {
		$("vkChecked").removeAttribute("hidden");
		validationVk = false;
	} else {
		$("vkChecked").setAttributeNode(document.createAttribute("hidden"));
	}
}

function twitChecked() {
	if (this.checked) {
		$("twitChecked").removeAttribute("hidden");
		validationTwit = false;
	} else {
		$("twitChecked").setAttributeNode(document.createAttribute("hidden"));
	}
}

function okChecked() {
	if (this.checked) {
		$("okChecked").removeAttribute("hidden");
		validationOk = false;
	} else {
		$("okChecked").setAttributeNode(document.createAttribute("hidden"));
	}
}

function fbOnChange() {
	socialOnChange("fbChecked");
	if (validationSocial) {
		validationFb = true;
	}
}
function vkOnChange() {
	socialOnChange("vkChecked");
	if (validationSocial) {
		validationVk = true;
	}
}
function twitOnChange() {
	socialOnChange("twitChecked");
	if (validationSocial) {
		validationTwit = true;
	}
}
function okOnChange() {
	socialOnChange("okChecked");
	if (validationSocial) {
		validationOk = true;
	}
}

function socialOnChange(social) {
	var pattern = /(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/; //любой не пробельный символ
    validate($(social), pattern);
    if ($(social).className == "invalid") {
    	validationSocial = false;
    } else if ($(social).value == "") {
    	validationSocial = false;
    } else {
    	validationSocial = true;
    	valSocial = $(social).value;
		save(social, valSocial);
    }
    validateButton();
}

function choosenCat1() {
	cats(0);
}

function choosenCat2() {
	cats(1);
}

function choosenCat3() {
	cats(2);
}

function choosenDog4() {
	cats(3);
}

function cats(number) {
	var cat = {"cat1" : "0", "cat2": "1", "cat3": "2", "dog4": "3"};
	for (key in cat) {
		if (cat[key] == number) {
			$(key).style.border = "2px solid #ff9800";
			if(number == 3) {
				$("dog").removeAttribute("hidden");
				$("images").style.marginBottom = "70px";
				validationCat = false;
			} else {
				var src = key + ".png"
				save("image", src);
				$("dog").setAttributeNode(document.createAttribute("hidden"));
				$("images").style.marginBottom = "90px";
				validationCat = true;
			}
		} else {
			$(key).style.border = "none";
		}	
	}
	validateButton();
}

function validateButton() {
	if (count == 0) {
		if (validationEmail && validationName) {
			$("next").removeAttribute("disabled");
		} else {
			$("next").setAttributeNode(document.createAttribute("disabled"));
		}
	} else if (count == 1) {
		if (validationCountry && validationCity) {
			$("next").removeAttribute("disabled");
		} else {
			$("next").setAttributeNode(document.createAttribute("disabled"));
		}
	} else if (count == 2) {
		if (validationSocial && validationFb && validationVk && validationTwit && validationOk) {
			$("next").removeAttribute("disabled");
		} else {
			$("next").setAttributeNode(document.createAttribute("disabled"));
		}
	} else if (count == 3) {
		$("next").setAttributeNode(document.createAttribute("hidden"));
		$("finishBtn").removeAttribute("hidden");
		if (validationCat) {
			$("finishBtn").removeAttribute("disabled");
		} else {
			$("finishBtn").setAttributeNode(document.createAttribute("disabled"));
		}
	}
}

function nextOnClick() {
	count++; // рахуємо скільки етапів пройдено
	steps(count);
	ableSteps(count);
	ableBtn++;
	buttons(count);
	prevClick();
	validateButton();
}

function prevClick() {
	if (count <= 0) {
		$("prev").setAttributeNode(document.createAttribute("disabled"));
	} else {
		$("prev").removeAttribute("disabled");
		$("next").removeAttribute("disabled");
	}
}

function prevOnClick() {
	if (count == 3) {
		$("finishBtn").setAttributeNode(document.createAttribute("hidden"));
		$("next").removeAttribute("hidden");
	}
	count = count - 1;
	steps(count);
	buttons(count);
	prevClick(); 
	validateButton();
}

function finish() {
	$("continue").className = "continue";
	$("buttons").className = "buttons";
	$("continue").setAttributeNode(document.createAttribute("hidden"));
	$("buttons").setAttributeNode(document.createAttribute("hidden"));
	addItems();
	steps(4);
}

function addItems() {
	$("addName").innerHTML = localStorage["name"];
	$("addEmail").innerHTML = localStorage["email"];
	$("addCity").innerHTML = localStorage["city"] + ", " + localStorage["country"];
	if (localStorage["fbChecked"]) {
		$("addFb").removeAttribute("hidden");
		$("addFb").innerHTML = "<span>Facebook:</span>" + localStorage["fbChecked"];
	} else {
		$("addFb").setAttributeNode(document.createAttribute("hidden"));
	}
	if (localStorage["vkChecked"]) {
		$("addVk").removeAttribute("hidden");
		$("addVk").innerHTML = "<span>Вконтакте:</span>" + localStorage["vkChecked"];
	} else {
		$("addVk").setAttributeNode(document.createAttribute("hidden"));
	}
	if (localStorage["twitChecked"]) {
		$("addTwit").removeAttribute("hidden");
		$("addTwit").innerHTML = "<span>Twitter:</span>" + localStorage["twitChecked"];
	} else {
		$("addTwit").setAttributeNode(document.createAttribute("hidden"));
	}
	if (localStorage["okChecked"]) {
		$("addOk").removeAttribute("hidden");
		$("addOk").innerHTML = "<span>Одноклассники:</span>" + localStorage["okChecked"];
	} else {
		$("addOk").setAttributeNode(document.createAttribute("hidden"));
	}
	if(localStorage["fbChecked"] && localStorage["vkChecked"] && localStorage["twitChecked"] && localStorage["okChecked"]) {
		$("addEmail").style.marginBottom = "13px";
		$("addCity").style.marginBottom = "13px";
	}
	$("addImage").setAttribute("src", localStorage["image"]);
}

function tryAgain() {
	localStorage.clear();
	$("countries").innerHTML = "";
	$("cities").innerHTML = "";
    $("continue").className = "container continue";
	$("buttons").className = "container buttons";
	$("finishBtn").setAttributeNode(document.createAttribute("hidden"));
	$("next").removeAttribute("hidden");
	$("continue").removeAttribute("hidden");
	$("buttons").removeAttribute("hidden");
	clearBorder();
	clearInputs();
	$("fb").checked = "";
	fbChecked();
	$("vk").checked = "";
	vkChecked();
	$("twit").checked = "";
	twitChecked();
	$("ok").checked = "";
	okChecked();
	init();
	$("two").style.color = "#bbbbbb";
	$("three").style.color = "#bbbbbb";
	$("four").style.color = "#bbbbbb";
	steps(0);
}

function clearBorder() {
	var cat = {"cat1" : "0", "cat2": "1", "cat3": "2", "dog4": "3"};
	for (key in cat) {
			$(key).style.border = "none";
	}	
}

function clearInputs() {
	var inputs = document.getElementsByTagName("input");
	for (var i=0; i < inputs.length; i++) {
		inputs[i].value = "";
	}
};

function ableSteps(step) {
	var i = 0;
	for (key in buttonsAble) {
		if (i == step) {
			buttonsAble[key] = "able";
			$(key).style.color = "#4d4d4d";
			$(key).removeAttribute("disabled");
		} else if (buttonsAble[key] == "disable") {
			$(key).setAttributeNode(document.createAttribute("disabled"));
		}
		i++;
	}
}

function buttons(count) {
	var i = 0;
	for (key in buttonsAble) {
		if (buttonsAble[key] == "able" && ableBtn > 0 && i == count) {
			$(key).style.color = "#ff9800";
		} else if (buttonsAble[key] == "able") {
			$(key).style.color = "#4d4d4d";
		}
		i++;
	}
}

function steps(count) {
	var steps = {"firstStep" : "show", "secondStep" : "hidden", "thirdStep" : "hidden", "fourthStep" : "hidden", "finish" : "hidden"};
	var counter = 0;
	for (key in steps) {
		if (counter == count) {
			if(key == "firstStep" || key == "secondStep") {
				$(key).className = key + " container";
			}
			$(key).removeAttribute("hidden");
			steps[key] = "show";
		} else {
			if(key == "firstStep" || key == "secondStep") {
				$(key).className = key;
			}
			$(key).setAttributeNode(document.createAttribute("hidden"));
			steps[key] = "hidden";
		}
		counter++;
	}
}

function addCountries() {
	var countries = {
        "1": "Ukraine",
        "2": "Germany",
        "3": "France",
        "4": "Spain",
        "5": "Sweden",
        "6": "USA",
        "7": "Canada",
        "8": "Moldova",
        "9": "Belarus",
        "10": "Poland"
    }
    
    for (country in countries) {
    	$("countries").innerHTML += "<option value=" + countries[country] + "></option>";
    }
}