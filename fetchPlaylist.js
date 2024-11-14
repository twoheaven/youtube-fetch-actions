const fetch = require('node-fetch');
const fs = require('fs');

const API_KEY = process.env.YOUTUBE_API_KEY;  // GitHub Secrets에서 가져오기
const PLAYLIST_ID = 'PLl17uh9uoLI1cXT-V0xerN1NJeXZ-YbhY';
const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`;

async function fetchPlaylistVideos() {
  if (!API_KEY) {
    console.error('YouTube API Key is not set.');
    return;
  }

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      console.error(`Error fetching data: ${response.statusText}`);
      return;
    }

    const data = await response.json();

    // 응답 데이터 확인
    if (!data.items) {
      console.error('No items found in the response.');
      return;
    }

    if (data.items.length === 0) {
      console.log('No videos found.');
      return;
    }

    // 비디오 링크 추출
    const videoLinks = data.items.map(item => `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`);

    // videoLinks를 파일에 저장 (예: videos.json)
    fs.writeFileSync('playlist.json', JSON.stringify(videoLinks, null, 2));
    console.log('YouTube video links have been saved.');
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
  }
}

fetchPlaylistVideos();
