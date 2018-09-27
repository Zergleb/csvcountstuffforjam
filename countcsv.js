const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'file', alias: 'f', type: String },
]

const options = commandLineArgs(optionDefinitions)

fs.readFile(options.file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log('csvdata', data);

  var records = parse(data, {columns: true});

  var counts = {

  }

  console.log('records', records)
  for(var recordIndex in records) {
    let record = records[recordIndex]
    for(var fieldName in record) {
       console.log('fieldName', fieldName)
       let count = counts[fieldName]
       if(!count) {
         count = 0;
       } 
       console.log('value', record[fieldName])
       if(record[fieldName] == "Yes") {
         console.log('increment', record[fieldName])
         count += 1;
       }
       counts[fieldName] = count;
    }
  }

  console.log(counts);

  var highestNumber = 0;
  for(countField in counts) {
    let fieldCount = counts[countField]
    if(fieldCount > highestNumber) {
      highestNumber = fieldCount;
    }
  }

  for(countField in counts) {
    let fieldCount = counts[countField]
    if(fieldCount == highestNumber) {
      console.log("One of the winners is: " + countField);
    }
  }
  

});






