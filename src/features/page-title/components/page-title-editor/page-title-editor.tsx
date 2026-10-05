'use client';

import { Result } from '@praha/byethrow';
import type { FC, SubmitEvent } from 'react';
import { useState, useTransition } from 'react';

import { CancelButton } from '../../../../components/button/cancel/cancel-button';
import { EditButton } from '../../../../components/button/edit/edit-button';
import { SaveButton } from '../../../../components/button/save/save-button';
import type { Page } from '../../../page/models/page';
import { editPageTitle } from '../../actions/edit-page-title';
import { PageTitle } from '../../models/page-title';
import styles from './page-title-editor.module.css';

// 編集を始めたとき、入力欄にカーソルを置く
const focusOnMount = (element: HTMLElement | null): void => {
  element?.focus();
};

const INVALID_TITLE_MESSAGE = 'タイトルは1文字以上50文字以下で入力してください';

export interface PageTitleEditorProps {
  page: Page;
}

export const PageTitleEditor: FC<PageTitleEditorProps> = ({ page }) => {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!editing) {
    return (
      <section aria-label="タイトル" className={styles.root}>
        <h1 className={styles.heading}>{page.title}</h1>
        <div className={styles.actions}>
          <EditButton
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </EditButton>
        </div>
      </section>
    );
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem('title');
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    const result = PageTitle.parse(input.value);
    if (Result.isFailure(result)) {
      input.setCustomValidity(INVALID_TITLE_MESSAGE);
      input.reportValidity();
      return;
    }
    startTransition(async () => {
      await editPageTitle(page.pageId, result.value);
      setEditing(false);
    });
  };

  return (
    <form aria-label="タイトル" className={styles.root} onSubmit={handleSubmit}>
      <input
        ref={focusOnMount}
        aria-label="タイトル"
        className={styles.input}
        defaultValue={page.title}
        name="title"
        readOnly={isPending}
        onInput={(event) => {
          event.currentTarget.setCustomValidity('');
        }}
      />
      <div className={styles.actions}>
        <CancelButton
          disabled={isPending}
          onClick={() => {
            setEditing(false);
          }}
        >
          Cancel
        </CancelButton>
        <SaveButton pending={isPending} type="submit">
          Save
        </SaveButton>
      </div>
    </form>
  );
};
