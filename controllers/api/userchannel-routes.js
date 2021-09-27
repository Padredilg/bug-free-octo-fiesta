const router = require('express').Router();
const { UserChannel } = require('../../models');

router.get('/', (req, res) => {
    UserChannel.findAll({
        attributes: [
            'id',
            'user_id',
            'channel_id'
        ],
        order: [['user_id', 'ASC']]
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/user',  (req, res) => {
    UserChannel.findAll({
        where: {user_id: req.body.user_id}
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/',  (req, res) => {
    UserChannel.create({
        user_id: req.body.user_id,
        channel_id: req.body.channel_id
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;