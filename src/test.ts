import fetch from "node-fetch"

const {
    createCanvas,
    loadImage
} = require('canvas')

const canvas = createCanvas(100, 100)
const ctx = canvas.getContext("2d")

generateImage()

async function generateImage() {
    const backgroundImage = await loadImage("./files/avatar.png")
    await ctx.drawImage(backgroundImage, 0, 0, 100, 100)

    const bodyToSend = {
        image: canvas.toBuffer()
    }

    await fetch('http://localhost:5000/upload/uploaded_avatar.png', {
        method: 'post',
        body: JSON.stringify(bodyToSend),
        headers: { 'Content-Type': 'application/json' }
    })
}