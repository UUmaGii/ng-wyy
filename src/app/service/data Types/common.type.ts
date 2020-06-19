export type Banner = {
    targetId: number;
    url: string;
    imageUrl: string;
}

export type HotTag = {
    id: number;
    position: number;
    name: string;
}


// 歌手
export type singer = {
    id: number;
    name: string;
    picUrl: string;
    albumSize: string;
}

// 歌曲
export type Song = {
    id: number;
    name: string;
    url: string;
    ar: singer[];
    al: { id: number; name: string; picUrl: string };
    dt: number;
}

// 歌单
export type songSheet = {
    id: number;
    userId: number;
    name: string;
    picUrl: string;
    coverImgUrl: string;
    playCount: number;
    tags: string[];
    createTime: number;
    creator: { nickname: string; avatarUrl: string; };
    description: string;
    subscribedCount: number;
    shareCount: number;
    commentCount: number;
    subscribed: boolean;
    tracks: Song[];
    trackCount: number;
}

// 播放地址
export interface SongUrl {
    id: number;
    url: string;
  }
  