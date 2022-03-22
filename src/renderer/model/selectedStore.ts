import { createStore, createEvent, combine } from 'effector';
import { DirOrFileRow } from 'renderer/model/types';

export interface DirOrFileWithPath {
	fullPath: string;
	item: DirOrFileRow;
}

export const $selected = createStore<DirOrFileWithPath[]>([], { name: 'selected' });

export const selectFile = createEvent<DirOrFileWithPath>('selectFile');
export const unselectFile = createEvent<DirOrFileWithPath>('unselectFile');
export const clearSelection = createEvent('clearSelection');

$selected
	.on(selectFile, (state, value) => [ ...state, value ])
	.on(unselectFile, (state, value) => state.filter((x) => x.fullPath !== value.fullPath))
	.on(clearSelection, (_state) => [])
	.watch((x) => console.log(x));


export const manualOpenCloseGlobalMenu = createEvent<boolean>('manualOpenCloseGlobalMenu');

export const $globalMenuOpenManual = createStore<boolean>(false).on(manualOpenCloseGlobalMenu, (_state, value) => {
	return value;
});
export const $selectedIsNotEmpty = $selected.map((s) => s.length > 0);

export const $globalMenuOpen = combine($globalMenuOpenManual, $selectedIsNotEmpty, (a, b) => {
	return a || b;
});
