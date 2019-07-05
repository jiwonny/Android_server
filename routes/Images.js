const router = require('express').Router();
var fs = require('fs');

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

router.get('/', (req, res) => {
  console.log('hereeeee');

  //var img = fs.readFileSync(__dirname + "/uploads/" + file);
  //res.writeHead(200, {'Content-Type': 'image/png' });
  //res.end(img, 'binary');

  fs.readFile("routes/mouse.jpg", { encoding: "base64"},
	(err, base64Image) => {
		// 2. Create a data URL
    console.log('hereeeee2222222');
		const dataUrl = `data:image/jpg;base64,${base64Image}`
    console.log(dataUrl);
    console.log(`length:,${dataUrl.length}`);
		return res.json({"img":dataUrl});
	}
);
});

module.exports = router;
