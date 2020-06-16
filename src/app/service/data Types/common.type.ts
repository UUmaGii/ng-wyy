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

export type songSheet = {
    id: number;
    name: string;
    playCount: number;
    picUrl: string;
    coverImgUrl: string;
}

export type singer = {
    id: number;
    name: string;
    picUrl: string;
    albumSize: string;
}