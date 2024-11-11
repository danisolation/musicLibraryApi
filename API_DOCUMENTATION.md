# Tài liệu API MusicLibraryApi

## Tổng quan

API này cung cấp các endpoint để quản lý bài hát, playlist, và thực hiện các chức năng tìm kiếm trong ứng dụng âm nhạc.

Base URL: `http://localhost:3000/api`

## Endpoints

### Bài hát (Tracks)

#### Tạo bài hát mới

- **URL**: `/tracks`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `title` (required): Tên bài hát
  - `artist` (required): Tên nghệ sĩ
  - `album`: Tên album
  - `genre`: Thể loại
  - `releaseYear`: Năm phát hành
  - `duration`: Thời lượng (giây)
  - `file` (required): File MP3 (path)

**Response**:

```json
{
  "_id": "60d5ecb54b24a1234f456789",
  "title": "Example Song",
  "artist": "Example Artist",
  "album": "Example Album",
  "genre": "Nhạc trẻ",
  "releaseYear": "2023",
  "duration": "180",
  "lyric": "Example Lyric",
  "filePath": "uploads/1234567890.mp3"
}
```

#### Lấy danh sách bài hát

- **URL**: `/tracks`
- **Method**: `GET`

**Response**:

```json
[
  {
    "_id": "60d5ecb54b24a1234f456789",
    "title": "Example Song 1",
    "artist": "Example Artist 1",
    "album": "Example Album 1",
    "genre": "Nhạc trẻ",
    "releaseYear": "2023",
    "duration": "180",
    "lyric": "Example Lyric 1",
    "filePath": "uploads/1234567890.mp3"
  },
  {
    "_id": "60d5ecb54b24a1234f456790",
    "title": "Example Song 2",
    "artist": "Example Artist 2",
    "album": "Example Album 2",
    "genre": "Rock",
    "releaseYear": "2022",
    "duration": "200",
    "lyric": "Example Lyric 2",
    "filePath": "uploads/0987654321.mp3"
  }
]
```

#### Lấy thông tin bài hát

- **URL**: `/tracks/:id`
- **Method**: `GET`
- **URL Params**: `id` (ID của bài hát)

**Response**:

```json
{
  "_id": "60d5ecb54b24a1234f456789",
  "title": "Example Song",
  "artist": "Example Artist",
  "album": "Example Album",
  "genre": "Nhạc trẻ",
  "releaseYear": "2023",
  "duration": "180",
  "lyric": "Example Lyric",
  "filePath": "uploads/1234567890.mp3"
}
```

#### Cập nhật bài hát

- **URL**: `/tracks/:id`
- **Method**: `PUT`
- **Content-Type**: `application/json`
- **URL Params**: `id` (ID của bài hát)
- **Body**: Các trường cần cập nhật (title, artist, album, genre, releaseYear, duration, lyric)

**Response**:

```json
{
  "_id": "60d5ecb54b24a1234f456789",
  "title": "Updated Song",
  "artist": "Updated Artist",
  "album": "Updated Album",
  "genre": "Updated Genre",
  "releaseYear": "2024",
  "duration": "190",
  "lyric": "Updated Lyric",
  "filePath": "uploads/1234567890.mp3"
}
```

#### Xóa bài hát

- **URL**: `/tracks/:id`
- **Method**: `DELETE`
- **URL Params**: `id` (ID của bài hát)

**Response**:

```json
{
  "message": "Đã xóa bài hát thành công"
}
```

### Playlist

#### Tạo playlist mới

- **URL**: `/playlists`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**:
  - `title` (required): Tên playlist
  - `albumCover`: URL ảnh bìa album
  - `tracks`: Mảng các ID bài hát

**Response**:

```json
{
  "_id": "60d5ecb54b24a1234f456791",
  "title": "My Playlist",
  "albumCover": "https://example.com/cover.jpg",
  "tracks": ["60d5ecb54b24a1234f456789", "60d5ecb54b24a1234f456790"]
}
```

#### Lấy danh sách playlist

- **URL**: `/playlists`
- **Method**: `GET`

**Response**:

```json
[
  {
    "_id": "60d5ecb54b24a1234f456791",
    "title": "My Playlist 1",
    "albumCover": "https://example.com/cover1.jpg",
    "tracks": ["60d5ecb54b24a1234f456789", "60d5ecb54b24a1234f456790"]
  },
  {
    "_id": "60d5ecb54b24a1234f456792",
    "title": "My Playlist 2",
    "albumCover": "https://example.com/cover2.jpg",
    "tracks": ["60d5ecb54b24a1234f456793", "60d5ecb54b24a1234f456794"]
  }
]
```

#### Lấy thông tin playlist

- **URL**: `/playlists/:id`
- **Method**: `GET`
- **URL Params**: `id` (ID của playlist)

**Response**:

```json
{
  "_id": "60d5ecb54b24a1234f456791",
  "title": "My Playlist",
  "albumCover": "https://example.com/cover.jpg",
  "tracks": [
    {
      "_id": "60d5ecb54b24a1234f456789",
      "title": "Example Song 1",
      "artist": "Example Artist 1"
    },
    {
      "_id": "60d5ecb54b24a1234f456790",
      "title": "Example Song 2",
      "artist": "Example Artist 2"
    }
  ]
}
```

#### Cập nhật playlist

- **URL**: `/playlists/:id`
- **Method**: `PUT`
- **Content-Type**: `application/json`
- **URL Params**: `id` (ID của playlist)
- **Body**: Các trường cần cập nhật (title, albumCover, tracks)

**Response**:

```json
{
  "_id": "60d5ecb54b24a1234f456791",
  "title": "Updated Playlist",
  "albumCover": "https://example.com/updated-cover.jpg",
  "tracks": [
    "60d5ecb54b24a1234f456789",
    "60d5ecb54b24a1234f456790",
    "60d5ecb54b24a1234f456795"
  ]
}
```

#### Xóa playlist

- **URL**: `/playlists/:id`
- **Method**: `DELETE`
- **URL Params**: `id` (ID của playlist)

**Response**:

```json
{
  "message": "Đã xóa playlist thành công"
}
```

#### Thêm bài hát vào playlist

- **URL**: `/playlists/:playlistId/tracks/:trackId`
- **Method**: `POST`
- **URL Params**:
  - `playlistId` (ID của playlist)
  - `trackId` (ID của bài hát cần thêm)

**Response**:

```json
{
  "_id": "60d5ecb54b24a1234f456791",
  "title": "My Playlist",
  "albumCover": "https://example.com/cover.jpg",
  "tracks": [
    "60d5ecb54b24a1234f456789",
    "60d5ecb54b24a1234f456790",
    "60d5ecb54b24a1234f456795"
  ]
}
```

#### Loại bài hát khỏi playlist

- **URL**: `/playlists/:playlistId/tracks/:trackId`
- **Method**: `DELETE`
- **URL Params**:
  - `playlistId` (ID của playlist)
  - `trackId` (ID của bài hát cần loại)

**Response**:

```json
{
  "_id": "60d5ecb54b24a1234f456791",
  "title": "My Playlist",
  "albumCover": "https://example.com/cover.jpg",
  "tracks": [
    "60d5ecb54b24a1234f456789",
    "60d5ecb54b24a1234f456790"
  ]
}
```

### Tìm kiếm

#### Tìm kiếm bài hát và playlist

- **URL**: `/search`
- **Method**: `GET`
- **Query Params**: `query` (từ khóa tìm kiếm)

**Response**:

```json
{
  "tracks": [
    {
      "_id": "60d5ecb54b24a1234f456789",
      "title": "Example Song",
      "artist": "Example Artist",
      "album": "Example Album"
    }
  ],
  "playlists": [
    {
      "_id": "60d5ecb54b24a1234f456791",
      "title": "My Playlist",
      "albumCover": "https://example.com/cover.jpg"
    }
  ]
}
```

### Streaming Playlist

#### Tạo file M3U cho playlist

- **URL**: `/playlists/:id/stream`
- **Method**: `GET`
- **URL Params**: `id` (ID của playlist)

**Response**:
File M3U với Content-Type: `audio/x-mpegurl`

## Xử lý lỗi

Tất cả các endpoint đều sử dụng xử lý lỗi nhất quán. Trong trường hợp có lỗi, response sẽ có dạng:

```json
{
  "message": "Mô tả lỗi"
}
```

Các mã trạng thái HTTP phổ biến:

- 200: Thành công
- 201: Tạo mới thành công
- 400: Bad Request (dữ liệu không hợp lệ)
- 404: Not Found (không tìm thấy tài nguyên)
- 500: Internal Server Error (lỗi server)

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, vui lòng liên hệ: tranquocdungb4@gmail.com.com




