import { createAction, props } from '@ngrx/store';
import { PlayMode } from 'src/app/shared/wy-ui/wy-player/player-type';
import { Song } from 'src/app/service/data Types/common.type';

export const SetPlaying = createAction('[player]  Set playing', props<{ playing: boolean }>());
export const SetPlayMode = createAction('[player]  Set playMode', props<{ playMode: PlayMode }>());
export const SetSongList = createAction('[player]  Set songList', props<{ songList: Song[] }>());
export const SetPlayList = createAction('[player]  Set playList', props<{ playList: Song[] }>());
export const SetCurrentIndex = createAction('[player]  Set currentIndex', props<{ currentIndex: number }>());
