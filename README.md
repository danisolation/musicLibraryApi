# MusicLibraryApi

API quản lý bài hát và playlist sử dụng Node.js, Express và MongoDB.

## Cài đặt

1. Clone repository
2. Chạy `npm install` để cài đặt các dependencies
3. Tạo file `.env` và cấu hình các biến môi trường (xem `.env.example`)
4. Chạy `npm run dev` để khởi động server trong chế độ phát triển

## API Endpoints

### Tracks

- POST /api/tracks: Tạo bài hát mới
- GET /api/tracks: Lấy danh sách bài hát
- GET /api/tracks/:id: Lấy thông tin bài hát theo ID
- PUT /api/tracks/:id: Cập nhật thông tin bài hát
- DELETE /api/tracks/:id: Xóa bài hát

### Playlists

- POST /api/playlists: Tạo playlist mới
- GET /api/playlists: Lấy danh sách playlist
- GET /api/playlists/:id: Lấy thông tin playlist theo ID
- PUT /api/playlists/:id: Cập nhật thông tin playlist
- DELETE /api/playlists/:id: Xóa playlist
- POST /api/playlists/:playlistId/tracks/:trackId: Thêm bài hát vào playlist
- DELETE /api/playlists/:playlistId/tracks/:trackId: Loại bài hát khỏi playlist
- GET /api/playlists/:id/stream": Streaming playlist dưới dạng m3u

### Search

- GET /api/search?query=: Tìm kiếm bài hát và playlist

## Cấu trúc dữ liệu

### Track

- title: String (required)
- artist: String (required)
- album: String
- genre: String
- releaseYear: String
- duration: String
- lyric: String
- filePath: String (required)

### Playlist

- title: String (required)
- albumCover: String
- tracks: Array of Track IDs

## Xử lý lỗi

API sử dụng middleware xử lý lỗi để bắt và xử lý các lỗi một cách nhất quán. Các lỗi sẽ được trả về dưới dạng JSON với mã trạng thái HTTP phù hợp.

## Tính năng nâng cao

- Streaming playlist dưới dạng m3u (Trả về một tệp m3u, giúp người dùng có thể phát danh sách phát (playlist) trong các trình phát đa phương tiện như VLC. File upload được lưu tĩnh trong folder uploads.)
- Tìm kiếm mờ (fuzzy search) (Sử dụng thư viện Fuse.js để thực hiện tìm kiếm với khả năng khớp gần đúng (fuzzy search))

## Đóng góp

Vui lòng tạo issue hoặc pull request nếu bạn muốn đóng góp vào dự án.

