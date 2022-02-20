import { Card, CardContent, List } from '@mui/material';
import { FC } from 'react';
import { IDirRow, Page } from 'renderer/model/types';
import { createNewId } from 'services/utils';
import { DirRow } from './DirRow';
import { FileRow } from './FileRow';

export interface PageProps2 {
	page: Page;
}

export const FilePage: FC<PageProps2> = ({ page }) => {
	return (
		<Card>
			<CardContent>
				<List>
					{page.dirsAndFiles.map(
						(x) =>
							x.kind === 'file' ? (
								<FileRow key={createNewId()} path={page.path} item={x} />
							) : (
								<DirRow key={createNewId()} path={page.path} item={x} />
							)
					)}
				</List>
			</CardContent>
		</Card>
	);
};
