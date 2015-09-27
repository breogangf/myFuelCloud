var config = module.exports = {};

config.ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
config.port = process.env.OPENSHIFT_NODEJS_PORT || '3000';

config.mongo = {};
config.mongo.port = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
config.mongo.uri = 'mongodb://' + config.ip + ':' + config.mongo.port + '/';

if(process.env.OPENSHIFT_MONGODB_DB_HOST){
	config.mongo.uri = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + config.mongo.port + '/';
	config.dbUser = {
		user: "superuser",
		pass: "12345678"
	};
}

config.mongo.db = 'refuel';

if(process.env.NODE_ENV == 'test'){
	config.port = '3500';
	config.mongo.db = 'refuelTest';
}

config.url = 'http://' + config.ip + ':' + config.port;