// rule comp
let ruleComp = () => {
	let comp = Math.random();
	if ( comp < 0.34 ) return 'batu';
	if (comp > 0.34 && comp < 0.67) return 'gunting'
	return 'kertas'
}
// ruleGame
let ruleGame = (comp, player) => {
	if (comp == player) return 'draw';
	if (player == 'batu') return (comp == 'gunting') ? 'win':'lose';
	if (player == 'gunting') return (comp == 'kertas') ? 'win':'lose';
	if (player == 'kertas') return (comp == 'batu') ? 'win':'lose';
}

// random
let spin = () => {
	const imgComp = document.querySelector('.comp');
	const img = ['batu','gunting','kertas'];
	let i = 0;
	const startTime = new Date().getTime() // untuk mendapatkan/menangkap waktu saat ini
	setInterval(function(){
		if(new Date().getTime() - startTime > 3000){
			clearInterval;
			return;
		}
		imgComp.setAttribute('src','asset/img/'+ img[i++] +'.png');
		if(i == img.length) i = 0;
	},50);
};

const showWIn = document.querySelector('.win');
const showLose = document.querySelector('.lose');
let winWin = () =>{
	showWIn.classList.toggle('notif-actve');
}
let loseLose = () =>{
	showLose.classList.toggle('notif-actve');
}

// notif
let note = (input) => {
	const news = document.querySelectorAll('.news')
	const win = document.querySelector('.winner');
	const lose = document.querySelector('.loser');
	const draw = document.querySelector('.draw');
	
	setTimeout(()=>{
		if (input== 'win') return win.classList.add('wow');
		if (input== 'lose') return lose.classList.add('wow');
		else return draw.classList.add('wow');
	},2900);
	setTimeout(()=>{
		win.classList.remove('wow');
		lose.classList.remove('wow');
		draw.classList.remove('wow');
	},4900);
}


// inputPlayer
const inputPlayer = document.querySelectorAll( '.input img' );
const lifePoint= document.querySelector('.lifePoint');
	let win = 1;
	let lose = 1;
	let life = 5;
inputPlayer.forEach((input)=>{
	input.addEventListener('click',() => {
		const computer = ruleComp();
		const player = input.className;
		const game = ruleGame(computer, player);
		input.classList.add('bibBub');
		// output comp
		spin();

		setTimeout(function(){
			const imgComp = document.querySelector('.comp');
			imgComp.setAttribute('src', 'asset/img/'+ computer +'.png');
			input.classList.remove('bibBub')			

		},3000);
		setTimeout(function(){
			// menambahkan skor
			const scoreComputer = document.querySelector('.sComp');
			const scorePlayer = document.querySelector('.sPlayer');
			if(game == 'win') return scorePlayer.innerHTML = win++;
			if(game == 'lose') return scoreComputer.innerHTML = lose++;
		},3100);
	life--;
		setTimeout(()=> {
					if(life == 0) {
				if(win > lose) return winWin();
				if(win < lose) return loseLose();
				else return life +=1;
			}	
		},4000);

		note(game);

	lifePoint.innerHTML = life;
	});
});