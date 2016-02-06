// Load required packages
var Refuel = require('../models/refuel');
var Statistic = require('../models/statistic');

//GET - Return all statistics from a user
exports.getStatistics = function(req, res) {


 Refuel.find({ userId: req.user._id }, function (err, refuels) {
            if (err) res.send(500, err.refuel);
            //console.log(refuels);

            var statistic = new Statistic({
                price_amount_average: 0,
                fuel_amount_average: 0,
                fuel_consumption_average: 0,
                cost_per_kilometer: 0,
                previous_distance_average: 0,
                gas_price_average: 0,
            });

            for (var i = 0; i < refuels.length; i++) {
                //console.log('Price amount: ' + refuels[i].price_amount);
                //console.log('Fuel amount: ' + refuels[i].fuel_amount);
                //console.log('Fuel consumption: ' + (refuels[i].fuel_amount*100)/refuels[i].previous_distance);
                //console.log('Cost per kilometer: ' + refuels[i].price_amount/refuels[i].previous_distance);
                //console.log('Previous distance: ' + refuels[i].previous_distance);
                //console.log('Gas price: ' + refuels[i].gas_price);

                if (refuels[i].previous_distance > 1){
                    statistic.price_amount_average += refuels[i].price_amount;
                    statistic.fuel_amount_average += refuels[i].fuel_amount;
                    statistic.fuel_consumption_average += (refuels[i].fuel_amount*100)/refuels[i].previous_distance;
                    statistic.cost_per_kilometer += refuels[i].price_amount/refuels[i].previous_distance;
                    statistic.previous_distance_average += refuels[i].previous_distance;
                    statistic.gas_price_average += refuels[i].gas_price;
                }
                
            };

            statistic.price_amount_average = statistic.price_amount_average/i;
            statistic.fuel_amount_average = statistic.fuel_amount_average/i;
            statistic.fuel_consumption_average = statistic.fuel_consumption_average/i;
            statistic.cost_per_kilometer = statistic.cost_per_kilometer/i;
            statistic.previous_distance_average = statistic.previous_distance_average/i;
            statistic.gas_price_average = statistic.gas_price_average/i;
            
            //console.log(statistic);

            res.status(200).jsonp(statistic);

        })
};
