window.addEventListener('DOMContentLoaded', function () {
	const playBtn = document.getElementById('play-btn');
	const playAgainBtn = document.getElementById('play-button');
	const gameContainer = document.getElementById('game-container');
	const lettersContainer = document.getElementById('letters');
	const dogImgContainer = document.querySelector('.game-container__img');
	const finalMsg = document.getElementById('final-message');
	const popup = document.getElementById('popup-container');
	const notification = document.getElementById('notification-container');
	const figureParts = Array.from(document.querySelectorAll('.figure-part'));

	let alphabet = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	];

	// create alphabet ul
	function createAlphabet() {
		myButtons = document.getElementById('buttons');
		letters = document.createElement('ul');
		letters.setAttribute('id', 'alphabet-list');

		letters.classList.add('alphabet-list');
		letters.innerHTML = `
${alphabet
	.map(
		(letter) => `
	  <li class="alphabet-button">
	  ${letter}
  </li>
  `
	)
	.join('')}
	`;

		myButtons.appendChild(letters);
	}

	// reset aplhabet
	function resetAlphabet() {
		let letters = document.getElementById('alphabet-list');
		if (letters != null) {
			letters.remove();
		}
	}

	playBtn.addEventListener('click', (e) => {
		getSingleDogBreed();
		resetAlphabet();
		createAlphabet();
	});

	// Restart game and play again
	playAgainBtn.addEventListener('click', () => {
		getSingleDogBreed();
		resetAlphabet();
		createAlphabet();

		popup.style.display = 'none';
	});

	async function getSingleDogBreed() {
		playBtn.innerText = 'Give up and play again (display new Dog breed)';

		const breedListResponse = await fetch(
			'https://dog.ceo/api/breeds/list/all'
		);

		const breedListData = await breedListResponse.json();
		let breedsArray = Object.keys(breedListData.message);

		const singleBreed =
			breedsArray[Math.floor(Math.random() * breedsArray.length)];

		const breedListImageResponse = await fetch(
			`https://dog.ceo/api/breed/${singleBreed}/images/random`
		);
		const breedListImageData = await breedListImageResponse.json();

		dogImgContainer.innerHTML = `
								<img
									src="${breedListImageData.message}"
									class="dog__image"
									alt=""
									id="dog-img"
								/>
								<button class="dog__btn" id="next-btn">Next hint</button>
							`;

		const dogImg = document.getElementById('dog-img');
		const dogImgHeight = getComputedStyle(dogImg);
		const maxHeight = dogImgHeight.height;

		const nextDogBtn = document.getElementById('next-btn');
		nextDogBtn.addEventListener('click', (e) => {
			fetch(`https://dog.ceo/api/breed/${singleBreed}/images/random`)
				.then((res) => res.json())
				.then((data) => dogImg.setAttribute('src', data.message));
		});

		////// hangman part

		let selectedWord = singleBreed;
		const wordEl = document.getElementById('word');
		const correctLetters = [];
		const wrongLetters = [];

		function resetLetters() {
			let letters = document.querySelectorAll('.alphabet-button');
			letters.forEach((letter) => {
				letter.classList.remove('clicked');
			});
		}

		resetLetters();

		// Show hidden word
		function displayWord() {
			wordEl.innerHTML = `
         		 ${selectedWord
								.split('')
								.map(
									(letter) => `
              <li class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
              </li>
              `
								)
								.join('')}`;

			const innerWord = wordEl.innerText.replace(/\n/g, '');

			if (innerWord === selectedWord) {
				finalMsg.innerText = 'Congrats! You won!';
				popup.style.display = 'flex';
			}
		}

		displayWord();

		// Show notification
		function showNotification() {
			notification.classList.add('show');

			setTimeout(() => {
				notification.classList.remove('show');
			}, 3500);
		}

		function drawFigure() {
			// draw each part when wrong
			figureParts.forEach((part, index) => {
				const error = wrongLetters.length;

				if (index < error) {
					part.style.display = 'block';
				} else {
					part.style.display = 'none';
				}
			});

			// display notification when game over
			if (wrongLetters.length === figureParts.length) {
				finalMsg.innerText = 'YOU LOST! better luck next time';
				popup.style.display = 'flex';
			}
		}

		// hide figure parts after game over
		function resetFigure() {
			figureParts.forEach((part) => {
				part.style.display = 'none';
			});
		}

		resetFigure();

		// check for letter that was clicked on
		function clickedLetter() {
			let letters = document.querySelectorAll('.alphabet-button');
			console.log(selectedWord);

			let clickedLetters = letters.forEach((letter) => {
				letter.addEventListener('click', (e) => {
					let clickedLetter = e.target.innerText;
					e.target.classList.add('clicked');
					const innerWord = wordEl.innerText.replace(/\n/g, '');

					if (selectedWord.includes(clickedLetter)) {
						if (!correctLetters.includes(clickedLetter)) {
							correctLetters.push(clickedLetter);

							displayWord();
						} else if (innerWord != selectedWord) {
							notification.innerText = `word already contains letter ${clickedLetter.toUpperCase()}`;
							showNotification();
						}
					} else {
						if (!wrongLetters.includes(clickedLetter)) {
							wrongLetters.push(clickedLetter);

							drawFigure();
						} else {
							notification.innerText = `word does not contain letter ${clickedLetter.toUpperCase()} plus you already clicked it DUMBASS`;
							showNotification();
						}
					}
				});
			});

			return clickedLetters;
		}

		clickedLetter();

		function displayGame() {
			gameContainer.style.maxHeight =
				parseInt(maxHeight.replace(/px/, '')) + 3000 + 'px';
		}

		displayGame();
	}
});
