var express = require('express')
var router = express.Router()
var color = ['Red', 'Green', 'Pink', 'Blue']
var candies = [
      {'id': 1, 'name': 'Chewing Gum', 'color': 'Red'},
      {'id': 2, 'name': 'Pez', 'color': 'Green'},
      {'id': 3, 'name': 'Marshmallow', 'color': 'Pink'},
      {'id': 4, 'name': 'Candy Stick', 'color': 'Blue'}
    ]
  var index = 4

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

//ROOT
router.get('/candies', (req, res) => {
  res.status(200).json(candies)
})

// INDEX
router.get('/candies', (req, res) => {
  res.render('index', {
    result: candies
  })
  // res.status(200).json({
  //   results: ['post1', 'post2']
  // })
})

// SHOW
router.get('/candies/:id', (req, res) => {
  res.status(200).json({result: candies[req.params.id-1]})
})

// CREATE
router.post('/candies/', (req, res) => {
    // increase the candy index by 1
  index++
    // create new candy
  var candy = {'id': index, 'name': req.body.name, 'color': req.body.color}
    // push candy into candies array
  if (color.indexOf(candy.color) >= 0) {
    candies.push(candy)
    // return the result
  res.status(200).json({results: candy})
  }
  else {
    res.status(422).json({
      message: "Color is wrong!"
    })
  }
})

// UPDATE
router.put('/candies/:id', (req, res) => {
  candies[req.params.id-1].id = req.body.id
  candies[req.params.id-1].name = req.body.name
  candies[req.params.id-1].color = req.body.color
  res.status(200).json({message: `${req.params.id} updated`})
})

// DELETE/DESTROY
router.delete('/candies/:id', (req, res) => {
  candies.splice(req.params.id-1, 1)
  res.status(200).json({message: `${req.params.id} deleted`})
})

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router
