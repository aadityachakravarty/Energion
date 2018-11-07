const mongoose = require('mongoose')
const node = require(__base + 'models/nodes.js')

const rad = require(__base + 'modules/misc/rad.js')

const createBackupNode = require('./backup.js')

const balancer = (req,res) => {
  node.find({}, (err,data) => {
    if(err) {
      console.log(err)
    }
    else {
      let sn = data[0]
      data.forEach((node,index) => {
        if(index!=0) {
          let dist = rad(sn.location.lattitude,sn.location.longitude,node.location.lattitude,node.location.longitude)
          let loadAggr = node.currentCapacity/node.maxCapacity*100
          if(loadAggr > 70 && dist < 10) {
            if(node.currentCapacity < sn.currentCapacity) {
                // send alert about this node
            }
            else if(node.currentCapacity > sn.currentCapacity){
                // send alert about making a new this node
            }
            else {
                // send an alert about making a new sub-station
            }
          }
        }
      })
    }
  })
}


module.exports = balancer
