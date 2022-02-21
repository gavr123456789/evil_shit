import { createStore, createEvent } from 'effector';
import { DirOrFileRow } from 'renderer/model/types';

export const $selected = createStore<Set<DirOrFileRow>>(new Set<DirOrFileRow>(), { name: 'counderStore' });

export const selectFile = createEvent<DirOrFileRow>('selectFile');
export const unselectFile = createEvent<DirOrFileRow>('selectFile');
export const clearSelection = createEvent('selectFile');

$selected
	.on(selectFile, (state, value) => {
		state.add(value);
	})
	.on(unselectFile, (state, value) => {
		state.delete(value);
	})
	.on(clearSelection, (state) => {
		state.clear();
	});

export const $selectedCount = $selected.map(s => s.size)
export const $selectedIsNotEmpty = $selected.map(s => s.size > 0)
