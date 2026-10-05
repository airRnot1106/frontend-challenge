'use client';

import { Result } from '@praha/byethrow';
import type { FC, SubmitEvent } from 'react';
import { useState, useTransition } from 'react';

import { CancelButton } from '../../../../components/button/cancel/cancel-button';
import { EditButton } from '../../../../components/button/edit/edit-button';
import { SaveButton } from '../../../../components/button/save/save-button';
import { editPageBody } from '../../../page/actions/edit-page-body';
import type { Page } from '../../../page/models/page';
import { PageBody } from '../../models/page-body';
import styles from './page-body-editor.module.css';

// 編集を始めたとき、入力欄にカーソルを置く
const focusOnMount = (element: HTMLElement | null): void => {
  element?.focus();
};

const INVALID_BODY_MESSAGE = '本文は10文字以上2000文字以下で入力してください';
const UNWRITTEN_BODY_TEXT = '本文はまだありません';

export interface PageBodyEditorProps {
  page: Page;
}

export const PageBodyEditor: FC<PageBodyEditorProps> = ({ page }) => {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const body = page.kind === 'Written' ? page.body : undefined;

  if (!editing) {
    return (
      <section aria-label="本文" className={styles.root}>
        <div className={styles.box}>
          {body === undefined ? (
            <p className={styles.text} data-unwritten>
              {UNWRITTEN_BODY_TEXT}
            </p>
          ) : (
            <p className={styles.text}>{body}</p>
          )}
        </div>
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
    const textarea = event.currentTarget.elements.namedItem('body');
    if (!(textarea instanceof HTMLTextAreaElement)) {
      return;
    }
    const result = PageBody.parse(textarea.value);
    if (Result.isFailure(result)) {
      textarea.setCustomValidity(INVALID_BODY_MESSAGE);
      textarea.reportValidity();
      return;
    }
    startTransition(async () => {
      await editPageBody(page.pageId, result.value);
      setEditing(false);
    });
  };

  return (
    <form aria-label="本文" className={styles.root} onSubmit={handleSubmit}>
      <textarea
        ref={focusOnMount}
        aria-label="本文"
        className={styles.textarea}
        defaultValue={body ?? ''}
        name="body"
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
