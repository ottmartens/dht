console.log(`Hello, i am ${process.env.id} and i'm alive`);

setTimeout(() => {
	console.log(process.env.id, 'is dying');
}, 2000);
