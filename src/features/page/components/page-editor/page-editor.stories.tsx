import { Result } from '@praha/byethrow';
import { delay } from 'msw';
import { expect, waitFor, within } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { editPageBody } from '../../actions/edit-page-body';
import { editPageTitle } from '../../actions/edit-page-title';
import { Page } from '../../models/page';
import { PageEditor } from './page-editor';

const ACTION_DURATION_MS = 300;
const PARAGRAPH =
  '親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。';

const writtenPage = Result.unwrap(
  Page.parse({
    body: Array.from({ length: 8 }, () => PARAGRAPH).join('\n\n'),
    createdAt: '2025-04-04T00:00:00.000Z',
    kind: 'Written',
    pageId: 1,
    title: '坊ちゃん',
  }),
);

const unwrittenPage = Result.unwrap(
  Page.parse({
    createdAt: '2025-04-04T00:00:00.000Z',
    kind: 'Unwritten',
    pageId: 2,
    title: '無名のページ',
  }),
);

const slowAction = async () => {
  await delay(ACTION_DURATION_MS);
};

const meta = preview.meta({
  args: { page: writtenPage },
  component: PageEditor,
  decorators: [
    (Story) => (
      <div style={{ blockSize: '100dvh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    serverFunctions: new Map([
      [editPageTitle, slowAction],
      [editPageBody, slowAction],
    ]),
  },
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { level: 1, name: '坊ちゃん' }),
    ).toBeVisible();
  },
});

export const Unwritten = meta.story({
  args: { page: unwrittenPage },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('本文はまだありません')).toBeVisible();
  },
});

export const EditTitle = meta.story({
  play: async ({ canvas, userEvent }) => {
    const title = within(canvas.getByRole('region', { name: 'タイトル' }));
    await userEvent.click(title.getByRole('button', { name: 'Edit' }));

    const form = within(canvas.getByRole('form', { name: 'タイトル' }));
    const input = form.getByRole('textbox', { name: 'タイトル' });
    await expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.type(input, '吾輩は猫である');
    await userEvent.click(form.getByRole('button', { name: 'Save' }));

    await expect(editPageTitle).toHaveBeenCalledWith(1, '吾輩は猫である');
    await waitFor(async () => {
      await expect(
        canvas.getByRole('region', { name: 'タイトル' }),
      ).toBeVisible();
    });
  },
});

export const InvalidTitle = meta.story({
  play: async ({ canvas, userEvent }) => {
    const title = within(canvas.getByRole('region', { name: 'タイトル' }));
    await userEvent.click(title.getByRole('button', { name: 'Edit' }));

    const form = within(canvas.getByRole('form', { name: 'タイトル' }));
    const input = form.getByRole('textbox', { name: 'タイトル' });
    await userEvent.clear(input);
    await userEvent.click(form.getByRole('button', { name: 'Save' }));

    await expect(input).toBeInvalid();
    await expect(editPageTitle).not.toHaveBeenCalled();
  },
});

export const CancelTitle = meta.story({
  play: async ({ canvas, userEvent }) => {
    const title = within(canvas.getByRole('region', { name: 'タイトル' }));
    await userEvent.click(title.getByRole('button', { name: 'Edit' }));

    const form = within(canvas.getByRole('form', { name: 'タイトル' }));
    await userEvent.click(form.getByRole('button', { name: 'Cancel' }));

    await expect(
      canvas.getByRole('heading', { level: 1, name: '坊ちゃん' }),
    ).toBeVisible();
    await expect(editPageTitle).not.toHaveBeenCalled();
  },
});

export const EditBody = meta.story({
  args: { page: unwrittenPage },
  play: async ({ canvas, userEvent }) => {
    const body = within(canvas.getByRole('region', { name: '本文' }));
    await userEvent.click(body.getByRole('button', { name: 'Edit' }));

    const form = within(canvas.getByRole('form', { name: '本文' }));
    const textarea = form.getByRole('textbox', { name: '本文' });
    await expect(textarea).toHaveFocus();
    await userEvent.type(textarea, PARAGRAPH);
    await userEvent.click(form.getByRole('button', { name: 'Save' }));

    await expect(editPageBody).toHaveBeenCalledWith(2, PARAGRAPH);
    await waitFor(async () => {
      await expect(canvas.getByRole('region', { name: '本文' })).toBeVisible();
    });
  },
});

export const InvalidBody = meta.story({
  play: async ({ canvas, userEvent }) => {
    const body = within(canvas.getByRole('region', { name: '本文' }));
    await userEvent.click(body.getByRole('button', { name: 'Edit' }));

    const form = within(canvas.getByRole('form', { name: '本文' }));
    const textarea = form.getByRole('textbox', { name: '本文' });
    await userEvent.clear(textarea);
    await userEvent.type(textarea, '短い本文');
    await userEvent.click(form.getByRole('button', { name: 'Save' }));

    await expect(textarea).toBeInvalid();
    await expect(editPageBody).not.toHaveBeenCalled();
  },
});
