var mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer'),
	cors = require('cors'),
	express = require('express')
path = require("path");
const keys = require("./config/config")
var db = require('./db');
const user = require('./routes/user');
const blog = require('./routes/blog');

const port = 1234;
const app = express();
app.use(require('morgan')('combined'));

mongoose
	.connect(
		`${keys.mongoURI}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('connected to DB'))
	.catch((err) => console.log('connection to Db failed', err.message));

mongoose.set('useFindAndModify', false);
app.use(cors());
app.use(expressSanitizer());

app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'build')))
app.use('/user', user);
app.use('/blogs', blog);



//INDEX Route

app.listen(process.env.PORT || port, () => console.log(`App is running at ${port}`));
