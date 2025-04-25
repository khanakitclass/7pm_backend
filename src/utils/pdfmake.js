var PdfPrinter = require('pdfmake');

var fonts = {
	Roboto: {
		normal: 'public/font/static/Roboto-Regular.ttf',
		bold: 'public/font/static/Roboto-Medium.ttf',
		italics: 'public/font/static/Roboto-Italic.ttf',
		bolditalics: 'public/font/static/Roboto-MediumItalic.ttf'
	}
};


var printer = new PdfPrinter(fonts);
var fs = require('fs');

const createPDF = async (docDefinition, name) => {
  try {
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(`public/user/${name}.pdf`));
    pdfDoc.end();
  } catch (error) {
    console.log(error);

  }
}

module.exports = createPDF