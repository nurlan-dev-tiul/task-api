const express = require('express');
const sharp = require('sharp');
const Task = require('../model/task');
const cloudinary = require('cloudinary').v2;
const uploadedApi = require('cloudinary').UploadApiResponse;

//! Добавление
const createTask = async(req, res) => {
    try {
        let images = req.files;
        let imagesBuffer = [];

        for (const file of images) {
            const { path } = file;
            const uploadFile = await cloudinary.uploader.upload(path, {
                folder: 'tasks',
                resource_type: "auto",
            });

            imagesBuffer.push({
                url: uploadFile.url
            })
        }

        req.files = imagesBuffer;
        const task  = await Task.create({
            ...req.body,
            file: req.files
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//! Получение всех задач
const getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({}).sort('-createdAt');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//! Получение детальной задачи
const getSingleTask = async(req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if(!task) {
            res.status(404).json('Не найдено ID задачи');
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


//! Редактирование
const updateTask = async(req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(
            {_id: id},
            req.body,
            {new: true, 
            runValidators: true}
        )
        if(!task) {
            res.status(404).json('Не найдено ID задачи');
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//! Статус выполнено
const updateCompleted = async(req, res) => {
    try {
        const { taskId, complete } = req.body;
        const task = await Task.findByIdAndUpdate(taskId, {
            ...req.body,
            completed: complete
        }, {new: true})

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


//! Удаление
const removeTask = async(req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if(!task) {
            res.status(404).json('Не найдено ID задачи');
        }
        res.status(200).json('Задача удалена');
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = {
    createTask,
    getTasks,
    getSingleTask,
    removeTask,
    updateTask,
    updateCompleted
}