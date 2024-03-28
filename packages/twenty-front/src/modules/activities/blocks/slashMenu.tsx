import { getDefaultReactSlashMenuItems } from '@blocknote/react';
import {
  IconComponent,
  IconFile,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
  IconPhoto,
  IconPilcrow,
  IconTable,
  SuggestionItem,
} from 'twenty-ui';

import { blockSchema } from './schema';

const Icons: Record<string, IconComponent> = {
  'Heading 1': IconH1,
  'Heading 2': IconH2,
  'Heading 3': IconH3,
  'Numbered List': IconListNumbers,
  'Bullet List': IconList,
  Paragraph: IconPilcrow,
  Table: IconTable,
  Image: IconPhoto,
};

export const getSlashMenu = (editor: typeof blockSchema.BlockNoteEditor) => {
  const items: SuggestionItem[] = [
    ...getDefaultReactSlashMenuItems(editor).map((x) => ({
      ...x,
      Icon: Icons[x.title],
    })),
    {
      title: 'File',
      aliases: ['file', 'folder'],
      Icon: IconFile,
      onItemClick: () => {
        const currentBlock = editor.getTextCursorPosition().block;

        editor.insertBlocks(
          [
            {
              type: 'file',
              props: {
                url: undefined,
              },
            },
          ],
          currentBlock,
          'before',
        );
      },
    },
  ];
  return items;
};
