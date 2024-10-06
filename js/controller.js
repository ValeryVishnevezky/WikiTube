'use strict'

function onInit() {
    getVideos('lofi', renderVideos)
    onVideoClick('jfKfPfyJRdk')
    getVideoInfo('lofi', renderInfo)
}

function onSearch(ev) {
    ev.preventDefault()
    const input = document.querySelector('.form-control').value
    getVideos(input, renderVideos)
    getVideoInfo(input, renderInfo)
}

function renderVideos(videos) {
    const strHTMLs = videos.map(video => `
        <div class="video">
        <img src="${video.snippet.thumbnails.medium.url}" onclick="onVideoClick('${video.id.videoId}')" alt="video"/>
        <div class="info-box">
        <div class="video-title">${video.snippet.title}</div>
        <div class="channel-title">${video.snippet.channelTitle}</div>
        </div>
        </div>
        `)
    document.querySelector('.videos-content').innerHTML = strHTMLs.join('')
}

function renderInfo(information){
    const input = document.querySelector('.form-control').value
    const strHTMLs = information.map(info => `
    <div class="info">
        <h1 class="about">About ${input}:</h1>
        <h3 class="info-description">${info.snippet}</h3>
        </div>
        `)
    document.querySelector('.video-info').innerHTML = strHTMLs.join('')
}

function onVideoClick(videoId) {
    const video = getVideoById(videoId)
    const strHTMLs = `
        <iframe width="600" height="338"
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1">
        </iframe>
        <div class="player-info-box">
        <div class="video-player-title">${video.snippet.title}</div>
        <div class="video-player-description">${video.snippet.description}</div>
        <div class="channel-player-channel-title">${video.snippet.channelTitle} Channel</div>
        </div>
        `
    document.querySelector('.video-player').innerHTML = strHTMLs
}

