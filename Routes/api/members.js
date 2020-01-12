const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//GETS ALL MEMBERS
router.get('/', (req, res) => res.json(members));

//GET SINGLE MEMBER
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {

    // res.send(req.params.id)
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No Member with the id of ${req.params.id}`});
    }

});

//Create Member
router.post('/', (req, res) =>{
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name:req.body.name,
        email: req.body.email,
        status:'active'

    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please Include a Name and Email'});
    }
    // members.save(newMember)
    members.push(newMember);
    // res.json(members);
    res.redirect('/')
});

// Update Member

router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name: member.name;
                member.email = updMember.email ? updMember.email: member.email

                res.json({ msg: 'Member Updated', member});
            }
        });

    } else {
        res.status(400).json({msg: `No Member with the id of ${req.params.id}`});
    }

});

//DELETE MEMBER
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {

    res.json({msg: 'Member Deleted', members: members.filter(member => member.id === parseInt(req.params.id))})
    } else {
        res.status(400).json({msg: `No Member with the id of ${req.params.id}`});
    }

});


module.exports = router;