import type { Mock } from 'vitest';
import type { z } from 'zod';

import type { configuration } from '../../../lib/schema.js';
import type { Shared_Thread } from '../../shared.d.ts';

/**
 * Tests - Lib - Utility - Get Config - Applies Default Comments When Empty.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetConfig_AppliesDefaultCommentsWhenEmpty_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Utility - Get Config - Coerces Inactive Days To Numbers.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetConfig_CoercesInactiveDaysToNumbers_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Utility - Get Config - Parses Valid Full Config From Environment.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetConfig_ParsesValidFullConfigFromEnvironment_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Utility - Get Config - Splits And Trims Exclude Labels.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetConfig_SplitsAndTrimsExcludeLabels_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Utility - Get Config - Throws When Github Token Is Missing.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetConfig_ThrowsWhenGithubTokenIsMissing_Threw = boolean;

/**
 * Tests - Lib - Utility - Get Config - Throws When Lock Reason Is Invalid.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetConfig_ThrowsWhenLockReasonIsInvalid_Threw = boolean;

/**
 * Tests - Lib - Utility - Get Config - Transforms Boolean String Values.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetConfig_TransformsBooleanStringValues_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Utility - Get Inactive Threads - Accumulates Items Across Multiple Pages.
 *
 * @since 1.0.1
 */
export type Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_Config = z.infer<typeof configuration>;

export type Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_Result = Shared_Thread[];

/**
 * Tests - Lib - Utility - Get Inactive Threads - Builds Correct Search Query For Issues.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_Config = z.infer<typeof configuration>;

export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_SearchQuery = string;

/**
 * Tests - Lib - Utility - Get Inactive Threads - Builds Correct Search Query For Pull Requests.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_Config = z.infer<typeof configuration>;

export type Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_SearchQuery = string;

/**
 * Tests - Lib - Utility - Get Inactive Threads - Includes Label Exclusions In Search Query.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_Config = z.infer<typeof configuration>;

export type Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_SearchQuery = string;

/**
 * Tests - Lib - Utility - Get Inactive Threads - Returns Mapped Thread Objects.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_Config = z.infer<typeof configuration>;

export type Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_Result = Shared_Thread[];

/**
 * Tests - Lib - Utility - Get Inactive Threads - Skips Issues Returned By Pull Request Search.
 *
 * @since 1.0.8
 */
export type Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_Config = z.infer<typeof configuration>;

export type Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_Result = Shared_Thread[];

/**
 * Tests - Lib - Utility - Get Inactive Threads - Skips Pull Requests Returned By Issue Search.
 *
 * @since 1.0.8
 */
export type Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_Config = z.infer<typeof configuration>;

export type Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_Result = Shared_Thread[];

/**
 * Tests - Lib - Utility - Get Inactive Threads - Stops At Page 10 Cap.
 *
 * @since 1.0.1
 */
export type Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_Config = z.infer<typeof configuration>;

export type Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_Result = Shared_Thread[];

/**
 * Tests - Lib - Utility - Get Inactive Threads - Stops Pagination When Fewer Than 100 Items.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_MockSearchFn = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_MockOctokit_IssuesAndPullRequests = Mock;

export type Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_MockOctokit = {
  rest: {
    search: {
      issuesAndPullRequests: Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_MockOctokit_IssuesAndPullRequests;
    };
  };
};

export type Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_Config = z.infer<typeof configuration>;
