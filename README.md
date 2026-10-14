# Fungibless Web Application

## Environments

- node 24 (`.nvmrc`)
- gatsby
- npm

## Start Development Server

```sh
npm run develop
```

## How to deploy

- main branch에 커밋하면 GitHub Actions(`.github/workflows/deploy-pages.yml`)가 빌드해서 GitHub Pages로 배포함
- 주소: <https://fungibless.github.io/>

## Network

- Polygon Mainnet. 개발 서버도 메인넷 컨트랙트에 연결되므로 트랜잭션은 실제로 실행됨

## NFT Assets

- `static/images/tww/{tokenId}.png`: TWW 원본 이미지 (IPFS `bafybeigqa6z3gbsqro34rgphuypoekshnxxo2hp2tlrvrcj6wkwowce3oe`)
- `src/data/tww-tokens.json`: TWW 메타데이터 요약 (IPFS `bafybeifuvi4iopnwdgr2h6grsg3t3dmz56fwbhfocy6clx7ehotertddti`)
