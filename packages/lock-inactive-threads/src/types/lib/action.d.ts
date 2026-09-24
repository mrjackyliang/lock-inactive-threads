import type { Shared_Thread } from '../shared.d.ts';
import type { Lib_Schema_Configuration } from './schema.d.ts';

/**
 * Lib - Action - Lock Inactive Threads.
 *
 * @since 1.0.0
 */
export type Lib_Action_LockInactiveThreads_Config = Lib_Schema_Configuration;

export type Lib_Action_LockInactiveThreads_Returns = Promise<void>;

export type Lib_Action_LockInactiveThreads_SeenThreadNumbers = Set<Shared_Thread['number']>;

export type Lib_Action_LockInactiveThreads_FilterUniqueThread_Thread = Shared_Thread;

export type Lib_Action_LockInactiveThreads_FilterUniqueThread_Returns = boolean;

export type Lib_Action_LockInactiveThreads_FilterUniqueThread = (thread: Lib_Action_LockInactiveThreads_FilterUniqueThread_Thread) => Lib_Action_LockInactiveThreads_FilterUniqueThread_Returns;

export type Lib_Action_LockInactiveThreads_InactiveIssues = Shared_Thread[];

export type Lib_Action_LockInactiveThreads_InactivePrs = Shared_Thread[];

export type Lib_Action_LockInactiveThreads_FailureCount = number;

export type Lib_Action_LockInactiveThreads_TotalCount = number;

export type Lib_Action_LockInactiveThreads_SuccessCount = number;
