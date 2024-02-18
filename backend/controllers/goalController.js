const asyncHandler = require("express-async-handler")
const Goal = require("../models/goal.model")
const User = require("../models/user.model")


const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        req.status(400)
        throw new Error("Please add a text field")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
    // Find the goal
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    // find user from the token
    // const user = await User.findById(req.user.id)

    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // User id has to match the id who created that goal
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    // Update the goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
    // Find the goal
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    // find user from the token
    // const user = await User.findById(req.user.id)

    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // User id has to match the id who created that goal
    if (goal.user.toString() != req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    // Delete the goal
    await Goal.remove(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}