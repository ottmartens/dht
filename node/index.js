setTimeout(() => {
	console.log(process.env.id, 'is alive!');
}, 100);

setTimeout(() => {
	console.log(process.env.id, 'is dying');
}, 2000);
