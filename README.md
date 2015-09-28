# README #

This README show you the steps are necessary to get the application up and running.

### What is this repository for? ###

MyFuelCloud developers.

### How do I get set up? ###

* Summary of set up
    * Clone git
    * npm install

* How to run tests
    * mongod
    * npm test

* Local deployment instructions
    * mongod
    * npm start

* Openshift deployment instructions
    * Create new MEAN gear at openshift using this repo.
    * rhc port-forward myFuelCloud to connect to mongoDB.
    * Create your dbuser on refuel db giving readWrite permission.

* Logs
    * rhc tail -a myFuelCloud

### Who do I talk to? ###
    * Breogán González Fernández (@breogangf)
