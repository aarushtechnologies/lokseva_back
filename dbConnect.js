let mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/Codingwale')

mongoose.connect('mongodb+srv://user1:dG57n2HLEuQx4NB9@cluster0.key0z.mongodb.net/lokseva?retryWrites=true&w=majority&appName=Cluster0')

console.log('Db Connected')