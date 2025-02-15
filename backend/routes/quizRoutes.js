const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all quizzes
// router.get('/', async (_, res) => {
//     const quizzes = await prisma.quiz.findMany();
//     res.json(quizzes);
// });


router.get('/', async (req, res) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true  // Include date created
            }
        });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a quiz by ID
// router.get('/:id', async (req, res) => {
//     const quiz = await prisma.quiz.findUnique({ where: { id: Number(req.params.id) } });
//     res.json(quiz);
// });

router.get('/:id', async (req, res) => {
    try {
        const quiz = await prisma.quiz.findUnique({
            where: { id: Number(req.params.id) },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true  // Include date created
            }
        });
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Create a quiz
// router.post('/', async (req, res) => {
//     const { title, description } = req.body;
//     const newQuiz = await prisma.quiz.create({ data: { title, description, userId: 1 } });
//     res.json(newQuiz);
// });

router.post('/', async (req, res) => {
    const { title, description, userId } = req.body;

    // Validate input fields
    if (!title || !description) {
        return res.status(400).json({ error: "Title and description cannot be empty" });
    }

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newQuiz = await prisma.quiz.create({
            data: { title, description, userId }
        });

        res.json(newQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update a quiz
router.put('/:id', async (req, res) => {
    const updatedQuiz = await prisma.quiz.update({
        where: { id: Number(req.params.id) },
        data: req.body
    });
    res.json(updatedQuiz);
});

// Delete a quiz
router.delete('/:id', async (req, res) => {
    await prisma.quiz.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Quiz deleted' });
});

router.post('/', async (req, res) => {
    const { title, description, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    try {
        // Ensure the user exists before creating a quiz
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newQuiz = await prisma.quiz.create({
            data: { title, description, userId }
        });

        res.json(newQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
