# Rizeology snapit

## Installation

Make sure you have Node.js and npm installed. Install the required dependencies using the following command:

```bash
npm install rizeology-snapit
```

## Usage

```js
const {Snapit} = require("rizeology-snapit");
const snapit = new Snapit();

let delay = 6*1000 // 6seconds delay for website to fully load

// take a screenshot and add delay before taking a screenshot
const path = await snapit.snapAfter("https://website-url-or-image-url.com",delay)

// generate a pdf file
const path = await snapit.genPDFAfter("https://website-url-or-image-url.com",delay)

// delete file
snapit.deleteFile(path)

```


## Contributing
Feel free to contribute by opening issues or submitting pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.

#### made with 💘 by preciousken



