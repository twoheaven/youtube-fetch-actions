
# YouTube Video Fetcher

## 프로젝트 개요
이 프로젝트는 GitHub Actions와 YouTube Data API를 사용하여 매일 특정 유튜브 채널의 새로운 동영상 링크를 자동으로 가져와 저장하는 기능을 제공합니다. GitHub Actions는 매일 자정에 이 작업을 수행하며, 이 데이터는 리액트 기반의 프론트엔드 페이지에서 쉽게 접근할 수 있습니다.

## 주요 기능
- **자동화된 데이터 수집**: GitHub Actions를 통해 매일 정해진 시간에 YouTube API를 요청하여 최신 동영상 정보를 가져옵니다.
- **데이터 저장 및 업데이트**: 가져온 동영상 링크를 리포지토리에 자동으로 저장하고 커밋/푸시합니다.
- **백엔드와 프론트엔드 연동**: 백엔드 페이지에서 수집된 데이터를 프론트엔드 페이지에서 사용할 수 있도록 제공합니다.

## 프로젝트 구조
    ```bash
youtube-fetch-actions/
|-- .github/
|   |-- workflows/
|       |-- youtube-fetch.yml    # GitHub Actions 워크플로 파일
|-- fetchVideos.js               # YouTube API 요청 및 데이터 저장 스크립트
|-- package.json                 # 프로젝트 종속성 관리 파일
|-- README.md                    # 프로젝트 설명 파일
    ```

## 사용된 기술
- **GitHub Actions**: CI/CD 자동화를 위한 플랫폼.
- **Node.js**: 백엔드 스크립트 실행 환경.
- **YouTube Data API v3**: 유튜브 채널의 데이터에 접근하기 위한 API.

## 설치 및 설정 방법
1. **리포지토리 클론**
   ```bash
   git clone https://github.com/yourusername/youtube-fetch-actions.git
   cd youtube-fetch-actions
   ```

2. **필수 종속성 설치**
   ```bash
   npm install
   ```

3. **YouTube API 키 설정**
   - GitHub 리포지토리의 **Settings > Secrets and variables > Actions**에서 `YOUTUBE_API_KEY`라는 이름으로 API 키를 추가합니다.

4. **GitHub Actions 활성화**
   - `.github/workflows/youtube-fetch.yml` 파일이 리포지토리에 있으면 자동으로 워크플로가 활성화됩니다.

## 스크립트 설명
- **`fetchVideos.js`**: YouTube Data API를 호출하여 최신 동영상 링크를 JSON 또는 다른 포맷으로 저장하는 스크립트입니다.

## GitHub Actions 워크플로 설명
- **`youtube-fetch.yml`**:
  - 매일 자정(UTC 기준)에 자동으로 실행되는 워크플로입니다.
  - API 요청을 실행하고 데이터를 업데이트한 후 자동으로 커밋 및 푸시합니다.

## 주의사항
- **API 키 보안**: `YOUTUBE_API_KEY`는 GitHub Secrets에 추가하여 안전하게 관리하세요.
- **푸시 권한**: GitHub Actions의 `GITHUB_TOKEN`을 사용하여 푸시 권한을 설정해야 합니다.

## 기여 방법
1. 프로젝트를 포크하고 새로운 브랜치를 생성하세요. (`git checkout -b feature/새기능`)
2. 변경사항을 커밋하세요. (`git commit -m '새 기능 추가'`)
3. 브랜치에 푸시하세요. (`git push origin feature/새기능`)
4. Pull Request를 생성하세요.

## 라이선스
이 프로젝트는 MIT 라이선스에 따라 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 문의
문의사항이 있으면 [이슈](https://github.com/yourusername/youtube-fetch-actions/issues)를 통해 제기해 주세요.