window.addEventListener('DOMContentLoaded', function () {
	const playBtn = document.getElementById('play-btn');
	const playAgainBtn = document.getElementById('play-button');
	const gameContainer = document.getElementById('game-container');
	const dogImgContainer = document.querySelector('.game-container__img');
	const finalMsg = document.getElementById('final-message');
	const popup = document.getElementById('popup-container');
	const notification = document.getElementById('notification-container');
	const figureParts = document.querySelectorAll('.figure-part');

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

	playBtn.addEventListener('click', (e) => {
		async function getSingleDogBreed() {
			playBtn.innerText = 'Play again';

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
								<button class="dog__btn" id="next-btn">Next pic</button>
							`;

			await new Promise((resolve, reject) => setTimeout(resolve, 200));

			const dogImg = document.getElementById('dog-img');
			const dogImgHeight = getComputedStyle(dogImg);
			const maxHeight = dogImgHeight.height;

			function displayGame() {
				gameContainer.style.maxHeight =
					parseInt(maxHeight.replace(/px/, '')) + 3000 + 'px';
			}

			displayGame();

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

			// Show hidden word
			function displayWord() {
				wordEl.innerHTML = `
         		 ${selectedWord
								.split('')
								.map(
									(letter) => `
              <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
              </span>
              `
								)
								.join('')}
          `;
				console.log(selectedWord);

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
				}, 1500);
			}

			// check for letter that was clicked on
			function clickedLetter() {
				let letters = document.querySelectorAll('.alphabet-button');
				console.log(selectedWord);

				let clickedLetters = letters.forEach((letter) => {
					letter.addEventListener('click', (e) => {
						let clickedLetter = e.currentTarget.innerText;

						if (selectedWord.includes(clickedLetter)) {
							if (!correctLetters.includes(clickedLetter)) {
								correctLetters.push(clickedLetter);

								displayWord();
							} else {
								showNotification();
							}
						} else {
							if (!wrongLetters.includes(clickedLetter)) {
								wrongLetters.push(clickedLetter);
							} else {
								showNotification();
							}
						}
					});
				});

				return clickedLetters;
			}

			clickedLetter();

			// Restart game and play again
			playAgainBtn.addEventListener('click', () => {
				// empty arrays
				correctLetters.splice(0);
				wrongLetters.splice(0);

				selectedWord = singleBreed;
				getSingleDogBreed();
				displayWord();

				popup.style.display = 'none';
			});
		}

		getSingleDogBreed();
	});

	// create alphabet ul
	function createAlphabet() {
		myButtons = document.getElementById('buttons');
		letters = document.createElement('ul');
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

	createAlphabet();
});
