const express = require('express');
const app = express();
const config = require('./config');

const User = require('./models/user');
const Rack = require('./models/rack');
const City = require ('./models/city');

//Associations
User.hasMany(Rack, {foreignKey: 'User_id'});
Rack.belongsTo(User, {foreignKey: 'User_id'});

// City.hasMany(User, {foreignKey: 'City_id'});
// User.belongsTo(City, {foreignKey: 'City_id'});


const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require("multer");
const fs = require('fs');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('uploads')); //This makes our uploads folder public


// Configure Multer
let storage = multer.diskStorage({
    destination: (req, file, cb) => {    
      cb(null, './uploads'); //Defining where uploads images should be stored
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); //Name of the uploaded file
    }
  });
  let upload = multer({
    storage: storage
  });

  //

config.authenticate().then(function(){
    console.log('Database is connected.');
}).catch(function(err){
    console.log(err);
});

//

app.post('/signup', async (req, res) => {
    const { FirstName, LastName, Email, Password} = req.body;
    const hash = await bcrypt.hash(Password, saltRounds);
    let user_data = { FirstName, LastName, Email, Password: hash};

    User.create(user_data).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.post('/login', async (req, res) => {

    const {Email, Password} = req.body;
    let user_data = {
        where: {Email} // {email: email}
    }
    
    //Find a user that corresponds to the email
    User.findOne(user_data).then((result) => {
        if(result){
            console.log(result);
            bcrypt.compare(Password, result.Password, function(err, output) {
                console.log(output);
                if(output){
                    res.status(200).send(result);
                }else{
                    res.status(400).send('Incorrect password.');
                }
            });            
        }
        else{
            res.status(404).send('User does not exist.');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
        
});

//

app.get('/cities/:id', function(req, res){
    let id = parseInt(req.params.id);
    City.findByPk(id)
    .then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/cities', function (req,res){
    let data = {where: {}};
    if(req.query.id !== undefined){
        data.where.id = req.query.id;
    };
    City.findAll(data).then(function(results){
        res.status(200).send(results);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/users/:id', function(req, res){
    let id = parseInt(req.params.id);
    User.findByPk(id)
    .then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/users', function(req, res){
    let user_data = {where: {}};

    if(req.query.id !== undefined){
        user_data.where.id = req.query.id;
    };
    User.findAll(user_data).then(function(results){
        res.status(200).send(results);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.patch('/users/details/:id', upload.single('image'), function(req, res) {
    // const { Birthday, Gender } = req.body;
    // const City_id = req.body.City_id;

    let id = parseInt(req.params.id);
    User.findByPk(id)
    .then(function(result){
        if(result){
                result.Birthday = req.body.Birthday;
                result.Gender = req.body.Gender;
                result.City_id = req.body.City_id;
                if(req.file){
                    result.Image = req.file? req.file.filename : null;
                };

            result.save().then(function(){
                res.status(200).send(result);
            })
            .catch(function(err){
                res.send(err);
            });

        }else{
            res.status(404).send('User was not found');
        }
    })
    .catch(function(err){
        res.send(err);
    });
});


app.patch('/users/:id', upload.single('image'), function(req, res) {
    const { FirstName, LastName, Birthday, Gender } = req.body;

    let id = parseInt(req.params.id);
    User.findByPk(id)
    .then(function(result){
        if(result){
                result.FirstName = FirstName;
                result.LastName = LastName;
                result.Birthday = Birthday;
                result.Gender = Gender;

            if(req.file){
                fs.unlink('./uploads/' + result.Image, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    console.log('old image deleted');
                    });
                result.Image = req.file? req.file.filename : null;
            }
            //save record back to database
            result.save().then(function(){
                res.status(200).send(result);
            })
            .catch(function(err){
                res.send(err);
            });

        }else{
            res.status(404).send('User was not found');
        }
    })
    .catch(function(err){
        res.send(err);
    });
});

app.get('/users/lr/:id', function(req, res){
    let id = parseInt(req.params.id);
    User.findByPk(id)
    .then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});


app.patch('/users/lr/:id', function(req, res) {
    const  City_id  = req.body.City_id;
    let id = parseInt(req.params.id);
    User.findByPk(id)
    .then(function(result){
        console.log(result);
        if(result){
                result.City_id = City_id;
            result.save().then(function(){
                res.status(200).send(result);
            })
            .catch(function(err){
                res.send(err);
            });

        }else{
            res.status(404).send('User was not found');
        }
    })
    .catch(function(err){
        res.send(err);
    });
});


app.post('/rack', upload.single('image'), function(req, res){
    const {Title, Description, Season, Type, User_id} = req.body
    let rack_data = {
        Title,
        Description,
        Season,
        Type,
        Image: req.file? req.file.filename : null,
        User_id
    };

    Rack.create(rack_data).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.get('/rack/:id', function(req, res){
    let id = parseInt(req.params.id);
    Rack.findByPk(id)
    .then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
})

app.get('/rack', function(req, res){
    let rack_data = {where: {}};
    if(req.query.User_id !== undefined){
        rack_data.where.User_id = req.query.User_id;
    };

    if(req.query.Season !== undefined){
        rack_data.where.Season = req.query.Season;
    };

    if(req.query.Item_type !== undefined){
        rack_data.where.Item_type = req.query.Item_type;
    };    

    Rack.findAll(rack_data).then(function(results){
        res.status(200).send(results);
    }).catch(function(err){
        res.status(500).send(err);
    });

});

app.patch('/rack/:id', upload.single('image'), function(req, res) {
    const { Title, Season, Item_type, Description} = req.body;
    let id = parseInt(req.params.id);
    
    Rack.findByPk(id)
    .then(function(result){
        if(result){
            result.Title = Title;
            result.Season = Season;
            result.Item_type = Item_type;
            result.Description = Description;
            
            //result.Image = current file name - delete this then below will add new one
            
            if(req.file){
                fs.unlink('./uploads/' + result.Image, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    console.log('old image deleted');
                    });
                result.Image = req.file? req.file.filename : null;
            }
            //save record back to database
            result.save().then(function(){
                res.status(200).send(result);
            })
            .catch(function(err){
                res.send(err);
            });

        }else{
            res.status(404).send('Item was not found');
        }
    })
    .catch(function(err){
        res.send(err);
    });
});





app.delete('/rack/:id', function(req, res){
    let id = parseInt(req.params.id); 

    Rack.findByPk(id)
    .then(function(result){
        if(result){
            result.destroy().then(function(){
                res.status(200).send(result);
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else{
            res.status(404).send('item was not found');
        }
    })
    .catch(function(err){
        res.send(err);
    });
})



app.listen(process.env.PORT || 3000, function(){
    console.log('Server running on port 3000...')
});




//The logic seems wrong. revisit this.
            // if(Password){
            //     bcrypt.compare(Password, result.Password, function(err, output) {
            //         console.log(output);
            //         if(output){
            //             res.status(200).send(result);
            //             result.Password = Password;
            //         }else{
            //             res.status(400).send('Incorrect password.');
            //         }
            //     });
            // }