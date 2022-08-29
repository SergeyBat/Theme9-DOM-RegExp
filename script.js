const form = document.forms.changeText
const input = form.text
const output = document.querySelector('.output')
input.onchange = ()=>{
	let val = input.value
	let el;
	if (/^[#].*/gm.test(val)){
		el=document.createElement('h1')
		el.innerHTML =`${val.slice(1)}`
		output.append(el)
	} else if (/^[*]{2}.*[*]{2}$/gm.test(val)){
		el = document.createElement('b')
		el.innerHTML = `${val.slice(2, -2)}`
		output.append(el)
	} else {
		el = document.createElement('span')
		el.innerHTML = `${val}`
		output.append(el)
	}
	input.value = ''
}