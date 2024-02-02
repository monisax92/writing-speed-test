//draw a keyboard
const allKeys = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['z', 'x', 'c', 'v', 'b', 'n', 'm']
];
const flatAllKeys = allKeys.flat();
const keyboard = document.querySelector('#keyboard');

const drawKeyboard = () => {
	allKeys.forEach(row => {
		const rowDiv = document.createElement('div');
		rowDiv.classList.add('row');
		row.forEach(letter => {
			const key = document.createElement('div');
			key.textContent = letter;
			key.classList.add('key');
			key.setAttribute('data-value', letter);
			rowDiv.appendChild(key);
		});
		keyboard.appendChild(rowDiv);
	});
};

drawKeyboard();

//randomly selected key
function newRandomKey() {
	let randomNr = Math.floor(flatAllKeys.length * Math.random());
	let newRandomBtn = document.querySelector(
		`[data-value = ${flatAllKeys[randomNr]}]`
	);
	return newRandomBtn;
}

let correctKey = newRandomKey();
correctKey.classList.add('highlight');

//user pressed key
let userSelectedKey;

document.addEventListener('keydown', function (e) {
	//prevent detecting press on other key than available
	if (flatAllKeys.includes(e.key)) {
		userSelectedKey = document.querySelector(`[data-value = ${e.key}]`);
		userSelectedKey.classList.add('pressed');
		//delete pressed effect after few miliseconds
		setTimeout(function () {
			userSelectedKey.classList.remove('pressed');
		}, 100);

		//if user pressed correct key, call newRandomKey function to set new correctKey
		if (userSelectedKey === correctKey) {
			correctKey.classList.remove('highlight');
			correctKey = newRandomKey();
			correctKey.classList.add('highlight');
		}
	}
});
