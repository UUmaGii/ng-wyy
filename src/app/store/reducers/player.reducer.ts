import { PlayMode } from 'src/app/shared/wy-ui/wy-player/player-type';
import { Song } from 'src/app/service/data Types/common.type';
import { createReducer, on, Action } from '@ngrx/store';
import { SetPlaying, SetPlayMode, SetSongList, SetPlayList, SetCurrentIndex } from '../actions/player.action';

export type PlayState = {
  // 播放状态
  playing: boolean;

  // 播放模式
  playMode: PlayMode;

  // 歌曲列表
  songList: Song[];

  // 播放列表
  playList: Song[];

  // 当前播放
  currentIndex: number;

  // 当前播放歌曲
  // currentSong: Song;
};

export const initialState: PlayState = {
  playing: false,
  playMode: {type: 'loop', label: '循环'},
  songList: [],
  playList: [],
  currentIndex: -1
}



const reducer = createReducer(initialState,
  on(SetPlaying, (state, { playing }) => ({...state, playing})),
  on(SetPlayMode, (state, { playMode }) => ({...state, playMode})),
  on(SetSongList, (state, { songList }) => ({...state, songList})),
  on(SetPlayList, (state, { playList }) => ({...state, playList})),
  on(SetCurrentIndex, (state, { currentIndex }) => ({...state, currentIndex})),
);

export function playerReducer(state: PlayState, action: Action) {
  return reducer(state, action);
}