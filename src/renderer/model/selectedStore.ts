import { createStore, createEvent } from 'effector';
import { DirOrFileRow } from 'renderer/model/types';

export interface DirOrFileWithPath {
	fullPath: string;
	item: DirOrFileRow;
}

export const $selected = createStore<Set<DirOrFileWithPath>>(new Set<DirOrFileWithPath>(), { name: 'counderStore' });

export const selectFile = createEvent<DirOrFileWithPath>('selectFile');
export const unselectFile = createEvent<DirOrFileWithPath>('selectFile');
export const clearSelection = createEvent('selectFile');

$selected
	.on(selectFile, (state, value) => {
    state.add(value);
    console.log("select done, store: ", state);
	})
	.on(unselectFile, (state, value) => {
		state.delete(value);
    console.log("unselect done store: ", state);

	})
	.on(clearSelection, (state) => {
		state.clear();
	});

export const $selectedCount = $selected.map(s => s.size)
export const $selectedIsNotEmpty = $selected.map(s => s.size > 0)
