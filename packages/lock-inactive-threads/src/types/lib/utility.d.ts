import type {
  context,
  getOctokit,
} from '@actions/github';

import type {
  Shared_Thread,
  Shared_Thread_Type,
} from '../shared.d.ts';
import type { Lib_Schema_Configuration } from './schema.d.ts';

/**
 * Lib - Utility - Add Thread Comment.
 *
 * @since 1.0.0
 */
export type Lib_Utility_AddThreadComment_IssueNumber = number;

export type Lib_Utility_AddThreadComment_Body = string;

export type Lib_Utility_AddThreadComment_Config = Lib_Schema_Configuration;

export type Lib_Utility_AddThreadComment_Returns = Promise<void>;

export type Lib_Utility_AddThreadComment_Octokit = ReturnType<typeof getOctokit>;

/**
 * Lib - Utility - Get Config.
 *
 * @since 1.0.0
 */
export type Lib_Utility_GetConfig_Returns = Lib_Schema_Configuration;

/**
 * Lib - Utility - Get Context.
 *
 * @since 1.0.0
 */
export type Lib_Utility_GetContext_Returns = typeof context;

/**
 * Lib - Utility - Get Inactive Threads.
 *
 * @since 1.0.0
 */
export type Lib_Utility_GetInactiveThreads_Config = Lib_Schema_Configuration;

export type Lib_Utility_GetInactiveThreads_Type = Shared_Thread_Type;

export type Lib_Utility_GetInactiveThreads_Returns = Promise<Shared_Thread[]>;

export type Lib_Utility_GetInactiveThreads_Octokit = ReturnType<typeof getOctokit>;

export type Lib_Utility_GetInactiveThreads_InactiveDays = number;

export type Lib_Utility_GetInactiveThreads_Threshold = Date;

export type Lib_Utility_GetInactiveThreads_DateStr = string | undefined;

export type Lib_Utility_GetInactiveThreads_TypeFilter = 'is:issue' | 'is:pr';

export type Lib_Utility_GetInactiveThreads_LabelExclusions = string;

export type Lib_Utility_GetInactiveThreads_SearchQuery = string;

export type Lib_Utility_GetInactiveThreads_Threads = Shared_Thread[];

export type Lib_Utility_GetInactiveThreads_Page = number;

export type Lib_Utility_GetInactiveThreads_Response = Awaited<ReturnType<Lib_Utility_GetInactiveThreads_Octokit['rest']['search']['issuesAndPullRequests']>>;

export type Lib_Utility_GetInactiveThreads_ItemType = Shared_Thread_Type;

/**
 * Lib - Utility - Lock Thread.
 *
 * @since 1.0.0
 */
export type Lib_Utility_LockThread_IssueNumber = number;

export type Lib_Utility_LockThread_LockReason = 'off-topic' | 'resolved' | 'spam' | 'too heated';

export type Lib_Utility_LockThread_Config = Lib_Schema_Configuration;

export type Lib_Utility_LockThread_Returns = Promise<void>;

export type Lib_Utility_LockThread_Octokit = ReturnType<typeof getOctokit>;
