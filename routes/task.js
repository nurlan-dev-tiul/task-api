const express = require('express');
const { createTask, getTasks, getSingleTask, removeTask, updateTask, updateCompleted } = require('../controllers/task');
const upload = require('../utils/multer');
const router = express.Router();

router.post('/tasks', upload.array('files'), createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getSingleTask);
router.put('/tasks/:id', updateTask);
router.put('/tasks', updateCompleted);
router.delete('/tasks/:id', removeTask);

module.exports = router;