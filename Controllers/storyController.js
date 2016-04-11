var db = require('../models')
// GET /api/albums
function index(req, res) {
  db.Story.find({})
    .populate('author')
    .exec(function(err, foundStories){
    if (err){
      return console.log("index error:", err);
    }
    res.json(foundStories);
  });
}

function create(req, res) {
  console.log('body', req.body);

  // split at comma and remove and trailing space
  var genre = req.body.genre.split(',').map(function(item) { return item.trim(); } );




    var newStory = {
       title: req.body.title,
       genres: [genre],
       content: req.body.content
     }
     console.log('PRECREATION: ',newStory);
     db.Story.create(newStory)
      .populate('author')
      .exec(function(err, createdStory) {
       if(err) { console.log('error', err);}
       console.log("SUCCESS", createdStory);
       res.json(createdStory);
     });
   }

   function update(req, res) {
     console.log('updating with data', req.body);
     db.Story.findById(req.params.storyId)
      .populate('author')
      .exec(function(err, foundStory) {
       if(err) { console.log('storyController.update error', err); }
       foundStory.email = req.body.email;
       foundStory.pseudonym = req.body.pseudonym;
       foundStory.genres = [req.body.genre];
       foundStory.save(function(err, savedAlbum) {
         if(err) { console.log('save fail'); }
         res.json(savedStory);
       });
     });

   }



   function show(req, res) {
     db.Story.findById(req.params.storyId)
       .populate('author')
       .exec(function(err, foundStory) {
       if(err) { console.log('storyController.show error', err); }
       console.log('storyController.show responding with', foundStory);
       res.json(foundStory);
     });
   }
// function destroy(req, res) {
//   // FILL ME IN !
// }
//



// export public methods here
module.exports = {
  index: index,
  create: create
  // show: show,
  // destroy: destroy,
  update: update
};
