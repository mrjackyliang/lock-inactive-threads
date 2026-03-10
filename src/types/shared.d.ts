/**
 * Thread.
 *
 * @since 1.0.0
 */
export type ThreadType = 'issue' | 'pull-request';

export type ThreadNumber = number;

export type ThreadTitle = string;

export type ThreadUpdatedAt = string;

export type Thread = {
  type: ThreadType;
  number: ThreadNumber;
  title: ThreadTitle;
  updatedAt: ThreadUpdatedAt;
};
