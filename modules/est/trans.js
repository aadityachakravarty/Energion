const nodes = require(__base + 'models/nodes.js')

const rad = require(__base + 'modules/misc/rad.js')

const geocode = require('./geo.js')

// const sendSMS = require(__base + 'modules/comm/nexmo.js')

const getEstimation = (req,res) => {
  if (!req.body.address && !req.body.capacity) {
    res.json({
      success: false,
      msg: 'Please check the inputs.'
    });
  }
  else {
    geocode(req.body.address, (err, geo) => {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        })
      }
      else {
        // Since we are using the 'let' word instead of var or const, we can use the co name again.
        let co = geo.results[0].geometry.location
        // Requested Load
        let rl = req.body.capacity;
        // Phone Number
        // let ph = req.body.phone;
        let allowedNodes = [];
        let ec = 0;

        // Now, we selected the nodes from the database.
        nodes.find({}, (err,data) => {
          if (err) {
            res.json({
              success: false,
              msg: err.message
            })
          }
          else {
            data.forEach((e) => {
              // We are checking the distance between 2 coordinates.
              if(rad(co.lat,co.lng,e.location.lattitude,e.location.longitude) <= 100) {
                // Now we check if the selected node can accomodate the actual load. Else shift the node.
                if(e.currentCapacity + parseInt(rl) <= (70/100)*e.maxCapacity) {
                  allowedNodes.push(e);
                }
                else {
                  ec = 1
                  return;
                }
              }
              else {
                ec = 2
                return;
              }
            })
            
            // Now, we will find the minimum estimated node for the onnection.
            let minNode = allowedNodes[0]
            let finalEst;

            let initDist = rad(co.lat,co.lng,minNode.location.lattitude,minNode.location.longitude)
            let initEst = 2500+(minNode.rate*initDist*1000)

            // Now, we shall check for all other possible minimum nodes for the given capacity.
            allowedNodes.forEach((elem) => {
              let currDist = rad(co.lat,co.lng,elem.location.lattitude,elem.location.longitude)
              let currEst = 2500+(elem.rate*currDist*1000)

              if( currEst <= initEst ) {
                minNode = elem
                finalEst = currEst
              }
            })

            var final = {
              "coordinates":{
                "transformer":{
                  "lat":minNode.location.lattitude,
                  "lng":minNode.location.longitude
                },
                "customer":{
                  "lat":co.lat,
                  "lng":co.lng
                }
              },
              "distance": Number.parseFloat(initDist).toFixed(2),
              "estimatedCost":parseInt(finalEst),
              "freeCapacity":minNode.maxCapacity-minNode.currentCapacity,
              "reqCapacity":parseInt(rl),
              "provider":minNode.provider
            }

            if(allowedNodes[0] == null) {
                res.json({
                  success: false,
                  msg: "No nodes found within 1KM.",
                  code: ec
                })
            }
            else {
                // let smsReady = "Your estimated cost is: "+parseInt(finalEst)+" and your load-demand is: "+parseInt(rl)
                // sendSMS(ph,smsReady)
                res.json(final)
            }
          }
        })
      }
    });
  }
}

module.exports = getEstimation
