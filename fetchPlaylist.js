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
    if (!data.items || data.items.length === 0) {
      console.log('No videos found.');
      return;
    }

    // 'Private video'와 'Deleted video' 제외하고 비디오 정보 추출
    const videoDetails = data.items
      .filter(item => item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')  // 'Private video'와 'Deleted video' 제외
      .map(item => {
        const date = new Date(item.snippet.publishedAt);
        const dateOnly = date.toISOString().split('T')[0];  // 날짜만 추출

        return {
          date: dateOnly,  // 날짜만 저장
          title: item.snippet.title,  // 영상 제목
          link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,  // 영상 링크
          publishedAt: item.snippet.publishedAt  // 원본 날짜 저장 (정렬용)
        };
      });

    // 가장 최신 영상부터 내림차순으로 정렬
    videoDetails.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // ID 추가 (1부터 시작)
    const finalVideoDetails = videoDetails.map((item, index) => ({
      id: index + 1,  // ID는 1부터 시작
      date: item.date,  // 날짜
      title: item.title,  // 영상 제목
      link: item.link  // 영상 링크
    }));

    // videoDetails를 파일에 저장 (예: playlist.json)
    fs.writeFileSync('playlist.json', JSON.stringify(finalVideoDetails, null, 2));
    console.log('YouTube video details have been saved.');
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
  }
}

fetchPlaylistVideos();
