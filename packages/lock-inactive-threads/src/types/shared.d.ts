/**
 * Shared - Thread.
 *
 * @since 1.0.0
 */
export type Shared_Thread_Type = 'issue' | 'pull-request';

export type Shared_Thread_Number = number;

export type Shared_Thread_Title = string;

export type Shared_Thread_UpdatedAt = string;

export type Shared_Thread = {
  type: Shared_Thread_Type;
  number: Shared_Thread_Number;
  title: Shared_Thread_Title;
  updatedAt: Shared_Thread_UpdatedAt;
};
