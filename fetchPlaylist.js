const fetch = require('node-fetch');
const fs = require('fs');

const API_KEY = process.env.YOUTUBE_API_KEY;  // GitHub Secrets에서 가져오기
const PLAYLIST_ID = 'PLl17uh9uoLI1cXT-V0xerN1NJeXZ-YbhY';
let URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`;

async function fetchPlaylistVideos() {
  if (!API_KEY) {
    console.error('YouTube API Key가 설정되지 않았습니다.');
    return;
  }

  const allVideos = [];
  let nextPageToken = null;

  try {
    // 여러 페이지의 비디오를 가져오기 위해 반복문 사용
    do {
      const response = await fetch(nextPageToken ? `${URL}&pageToken=${nextPageToken}` : URL);

      if (!response.ok) {
        console.error(`데이터 가져오기 오류: ${response.statusText}`);
        return;
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        console.log('찾을 수 있는 비디오가 없습니다.');
        return;
      }

      // 'Private video'와 'Deleted video' 제외하고 비디오 정보 추출
      const videoDetails = data.items
        .filter(item => item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')
        .map(item => {
          const date = new Date(item.snippet.publishedAt);
          const dateOnly = date.toISOString().split('T')[0];  // 날짜만 추출

          return {
            date: dateOnly,  // 날짜
            title: item.snippet.title,  // 영상 제목
            link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,  // 영상 링크
            publishedAt: item.snippet.publishedAt  // 원본 날짜 (정렬용)
          };
        });

      // 최신 영상부터 내림차순으로 정렬
      videoDetails.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      // ID 추가 (1부터 시작)
      const finalVideoDetails = videoDetails.map((item, index) => ({
        id: index + 1,  // ID는 1부터 시작
        date: item.date,  // 날짜
        title: item.title,  // 영상 제목
        link: item.link  // 영상 링크
      }));

      // 모든 비디오 정보를 `allVideos` 배열에 저장
      allVideos.push(...finalVideoDetails);

      // 다음 페이지가 있으면 `nextPageToken` 업데이트
      nextPageToken = data.nextPageToken;

    } while (nextPageToken); // `nextPageToken`이 있으면 계속해서 요청

    // 비디오 정보를 파일에 저장 (예: playlist.json)
    fs.writeFileSync('playlist.json', JSON.stringify(allVideos, null, 2));
    console.log('YouTube 비디오 정보가 저장되었습니다.');
  } catch (error) {
    console.error('YouTube 비디오 가져오기 오류:', error);
  }
}

fetchPlaylistVideos();
