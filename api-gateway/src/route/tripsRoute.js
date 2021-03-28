const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')


const searchEnging = (target, trip) => {
    const tagMatching = trip.tags.filter((value) => value.includes(target))
    const title = trip.title.toLocaleLowerCase()
    const description = trip.description.toLocaleLowerCase()
    const toLowerOftarget = target.toLocaleLowerCase()
    if (
        title.includes(toLowerOftarget) ||
        description.includes(toLowerOftarget) ||
        tagMatching.length > 0
    ) {
        return trip
    }
    return false
}

router.get('/', async (req, res) => {
    const keyword = req.query.keyword
    const url = 'http://localhost:9000/trips'
    const fetchJson = await fetch(url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json' 
        }
    })
    if(fetchJson.status === 200){
        const data = await fetchJson.json()
        if(keyword){
           const search = data.filter((trip) => searchEnging(keyword, trip))
           res.json(search)
        }
        res.json(data)
    }
    res.status(fetchJson.status)
})

module.exports = router