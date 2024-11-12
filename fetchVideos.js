const fetch = require('node-fetch');
const fs = require('fs');

const API_KEY = process.env.YOUTUBE_API_KEY;  // GitHub Secrets에서 가져오기
const CHANNEL_ID = 'UCfItTXw28rd2Z2DSw0UqAXg';  // 특정 유튜브 채널 ID
const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=7&order=date&type=video&key=${API_KEY}`;

async function fetchYouTubeVideos() {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    const videoLinks = data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`);

    // videoLinks를 파일에 저장 (예: videos.json)
    fs.writeFileSync('videos.json', JSON.stringify(videoLinks, null, 2));
    console.log('YouTube video links have been saved.');
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
  }
}

fetchYouTubeVideos();
