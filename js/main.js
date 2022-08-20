const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
let tasks = [];
if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach(function (task) {
		renderTask(task);
	})
}

checkEmptyList()
form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

function addTask(e) {

	e.preventDefault();
	const taskText = taskInput.value;

	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	};
	tasks.push(newTask);
	saveLocaleStorage();
	renderTask(newTask);
	taskInput.value = "";
	taskInput.focus();
	checkEmptyList()
}

function deleteTask(e) {
	if (e.target.dataset.action !== 'delete') return;
	const parentNode = e.target.closest('li');
	const id = Number(parentNode.id);
	const index = tasks.findIndex(function (task) {
		return task.id === id;
	});
	tasks.splice(index, 1);
	saveLocaleStorage();
	parentNode.remove();
	checkEmptyList()
}

function doneTask(e) {
	if (e.target.dataset.action === "done") {
		const parentNode = e.target.closest('li');
		const id = parentNode.id;
		const task = tasks.find(function (task) {
			if (task.id === +id) {
				return true
			}
		})
		task.done = !task.done
		saveLocaleStorage();
		const span = parentNode.querySelector('span');
		span.classList.toggle('task-title--done');
		parentNode.classList.toggle('bg-color--done');
	}
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
											<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
											<div class="empty-list__title">Список дел пуст</div>
										</li>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}
	if (tasks.length > 0) {
		const emptyListEL = document.querySelector('#emptyList');
		emptyListEL ? emptyListEL.remove() : null;
	}
}

function saveLocaleStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title';
	const bgColor = task.done ? 'bg-color--done' : '';
	const taskHTML =
		`<li id="${task.id}" class="${bgColor} list-group-item d-flex justify-content-between task-item">
		<span class="${cssClass}">${task.text}</span>
		<div class="task-item__buttons">
			<button type="button" data-action="done" class="btn-action">
				<img src="./img/tick.svg" alt="Done" width="18" height="18">
			</button>
			<button type="button" data-action="delete" class="btn-action">
				<img src="./img/cross.svg" alt="Done" width="18" height="18">
			</button>
		</div>
		</li>`;
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}










setInterval(function () {

	var d = new Date();

	document.getElementById('Day').innerHTML =
		day(d.getDay());

	document.getElementById('Date').innerHTML =
		month(d.getMonth()) + ' ' +
		d.getDate() + " " +
		d.getFullYear();

	document.getElementById('Time').innerHTML =
		time(d.getHours()) + ':' +
		place(d.getMinutes()) + ':' +
		place(d.getSeconds()) + ' '
		// am(d.getHours())
		;

	function day(n) {
		let days = ['Воскресенье',
			'Понедельник',
			'Вторник',
			'Среда',
			'Четверг',
			'Пятница',
			'Суббота']
		return days[n]
	}

	function month(n) {
		let months = ['Январь',
			'Фквраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь'];
		return months[n];
	}

	function time(n) {
		n = n % 24
		return n == 0 ? 12 : n
	}

	function place(n) {
		return n < 10 ? '0' + n : n
	}

	function am(n) {
		return (n > 12) ? "pm" : "am";
	}

}, 1000)



let api_key = "59f3e581022d2eb378efd6da3360138c";

let exclude = "current"; //* may be: current, minutely, hourly, daily, alerts.
let city_name = "Baku";
// let lon = "-99.771335";
// let lat = "30.489772";
// let units = "metric"; //* may be: standard, metric and imperial.
// let lang = "ru";
// let api_url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${api_key}&units=${units}&lang=${lang}`;
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`)
	.then(function (response) {
		return response.json()
	})
	.then(function (data) {
		console.log(data);
		console.log(data.name);
		document.querySelector('.city-name').innerHTML = data.name;
		document.querySelector('.feels_like').innerHTML = ' But feels like ' + Math.round(data.main.feels_like - 273) + '&deg;';
		document.querySelector('.description').textContent = data.weather[0].description;
		document.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="50px" height="50px" alt=""></img><span class="heading">32°C</span>`;

		document.querySelector('.heading').innerHTML = Math.round(data.main.temp - 273) + '&deg;';





	})

