import { Stats } from 'fs';

export interface IFile {
	name: string;
	stats?: Stats;
}
export interface IFileRow extends IFile {
	kind: 'file';
	ext: string;
}
export interface IDirRow extends IFile {
	kind: 'dir';
}

export type DirOrFileRow = IDirRow | IFileRow;

export interface FileOrDirAddEventData {
	path: string;
	dirOrFile: DirOrFileRow;
}

export interface Page {
	path: string;
	dirsAndFiles: DirOrFileRow[];
	selected: boolean;
	lastSelected?: Page;
}
