const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')


const searchEnging = (target, trip) => {
    const tagMatching = trip.tags.filter((tag) => tag.includes(target)) // we must check with lower case.
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
    else{
        return false
    }
    
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
           console.log("search")
           res.json(search)
        }
        else{
            res.json(data)
        }
        
    }
    else{
        res.status(fetchJson.status)
    }
    
})

module.exports = router