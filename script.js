const form = document.forms.formTask2

const input = form.text
const counter = document.getElementById('textCounter')

const emailList = document.querySelector('.emailList')
const emailListItem = document.getElementsByClassName('emailList__item')
const emailError = document.querySelector('span.error');

changeCounterText();
buttonDelListItem();
choiceEmail()


form.onsubmit = (e) => {
	e.preventDefault()
	addEmailinEmailList()
}

input.addEventListener('input', () => {
	if (validate()) {
		emailError.textContent = '';
		emailError.className = 'error';
	} else {
		emailError.textContent = 'Введите корректный email. Допустимо использовать только латинские буквы, цифры, знак подчеркивания, точку и минус.';
		emailError.className = 'error active';
	}
})

function addEmailinEmailList() {
	if (validate()){
		li = document.createElement('li');
		li.className = 'emailList__item';
		li.innerHTML = `
			<input class="emailList__radio" type="radio" id="emailChoice${emailListItem.length}" name="email" value="${input.value}">
			<label class="emailList__label" for="emailChoice${emailListItem.length}">${input.value}</label>
			<button type="button" class="emailList__delItem">&#9747</button>
		`;
	
		emailList.append(li);
		buttonDelListItem();
		changeCounterText();
		input.value = '';
		choiceEmail();
	} else {
		return false;
	}

}

function validate(){
	let value = input.value.trim();
	console.log(value)
	let reg = /^(?<name>[\w\_\-\.]+)@(?<address>[A-Za-z]+)(?<domaine>\.[A-Za-z]{2,4})$/mi;
	if (reg.test(value)) {
		return true;
	} else {
		return false;
	}
}

function buttonDelListItem() {
	const buttonDel = document.querySelectorAll('.emailList__delItem')
	buttonDel.forEach(e => {
		e.addEventListener('click', () => {
			e.parentNode.remove();
			changeCounterText();
			changeChoiceIndex();
		})
	})
}

function choiceEmail() {
	const radioButton = document.getElementsByName('email')
	radioButton.forEach(e => {
		e.addEventListener('change', () => {
			input.value = e.value;
			emailError.textContent = '';
			emailError.className = 'error';
		})
	})
}

function changeCounterText() {
	counter.textContent = `${emailListItem.length} items`;
}

function changeChoiceIndex() {
	const emailListItem = [...emailList.children]
	emailListItem.forEach((e, index) => {
		radio = e.firstElementChild;
		label = radio.nextElementSibling;
		radio.id = `emailChoice${index}`;
		label.setAttribute('for', `emailChoice${index}`);
	})
}