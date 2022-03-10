import { createStore, createEvent } from 'effector';

export const $loadingPercent = createStore<number>(100, { name: 'loadingPercent' });
export const $loadingColor = createStore<string>('sas', { name: 'loadingColor' });

export const setLoading = createEvent<number>('setValue');

$loadingPercent.on(setLoading, (_state, value) => {
	return value;
});
