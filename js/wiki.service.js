'use strict'
const apiKey = 'AIzaSyDI4jGUom3GWxCd8N3oCdYl9y472QbuofA'
const VIDEOS_KEY = 'videos_data'
const VIDEOS_INFO = 'video_info'

function getVideos(value, cb) {
    let videos = loadFromStorage(VIDEOS_KEY)
    if (videos && videos.length > 0) {
        const searchValue = value.toLowerCase().split(' ')
        const filteredVideos = videos.filter(video => {
            const title = video.snippet.title.toLowerCase()
            return searchValue.some(word => title.includes(word))
        })
        if (filteredVideos.length > 0) {
            return cb(filteredVideos)
        }
    }
    const videoUrl = (`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${apiKey}&q=${encodeURIComponent(value)}&maxResults=5`)
    return fetch(videoUrl)
        .then(res => {
            return res.json()
        })
        .then(data => {
            saveToStorage(VIDEOS_KEY, data.items)
            cb(data.items)
        })
        .catch(err => console.log('err:', err))
}

function getVideoById(videoId) {
    let videos = loadFromStorage(VIDEOS_KEY)
    return videos.find(video => video.id.videoId === videoId)
}

function getVideoInfo(value, cb) {
    let infos = loadFromStorage(VIDEOS_INFO)
    if (infos && infos.length > 0) {
        const searchValue = value.toLowerCase().split(' ')
        const filteredInfo = infos.filter(info => {
            const title = info.title.toLowerCase()
            return searchValue.some(word => title.includes(word))
        })
        if (filteredInfo.length > 0) {
            return cb(filteredInfo)
        }
    }
    const videoInfo = (`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${encodeURIComponent(value)}&format=json&srlimit=1`)
    return fetch(videoInfo)
        .then(res => {
            return res.json()
        })
        .then(data => {
            saveToStorage(VIDEOS_INFO, data.query.search)
            cb(data.query.search)
        })
        .catch(err => console.log('err:', err))
}