import { createEvent, createStore } from 'effector';
import { Page } from './types';

export const selectPage = createEvent<Page>('selectPage');

export const $lastSelectedPage = createStore<Page>({
	path: '!!!!!',
	dirsAndFiles: [],
	selected: true
})
.on(selectPage, (oldSelectedPage, newSelectedPage) => {
	oldSelectedPage.selected = false;
	newSelectedPage.selected = true;
	return newSelectedPage;
});
