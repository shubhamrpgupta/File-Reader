const excelToJSON = require('convert-excel-to-json');
const { Console } = require('console')
const fs = require('fs');



module.exports.home = (req, res) => {
    res.render('fileReader')
}




module.exports.output = (req, res) => {

    const outputLogger = new Console({
        stdout: fs.createWriteStream('output.txt'),
        stderr: fs.createWriteStream('error.txt')
    })

    //Converting excel file into JSON file
    const result = excelToJSON({
        source: fs.readFileSync(req.file.path),
        header: { rows: 1 },
        sheets: ['Sheet1']
    })
    const firstSheetArray = result.Sheet1;

    //Converting Date & time into MS.
    const updatedArray = firstSheetArray.map(obj => {
        const newArray = {
            ...obj,
            C: new Date(obj.C).getTime(),
            D: new Date(obj.D).getTime(),
            E: new Date(obj.E).getTime(),
            F: new Date(obj.F).getTime(),
            G: new Date(obj.G).getTime(),
        }
        return newArray;
    })

    //Workers who have worked for more than 14 hours in a single shift
    const workedFourteenHours = updatedArray.forEach(obj => {
        const inTime = obj.C;
        const outTime = obj.D;
        const difference = outTime - inTime
        const requiredhour = 14 * 60 * 60 * 1000
        {
            if (difference >= requiredhour) {
                answer = outputLogger.log(obj.A, obj.H);
            }
        }
    })
    res.redirect('/')
}


