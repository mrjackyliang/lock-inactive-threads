import {
  BlogPreview,
  Canvas,
  Features,
  Spotlight,
  WorkflowRunFrame,
} from '@cbnventures/docusaurus-preset-nova/blocks';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

import type { Pages_Index_Home_Returns } from '../types/pages/index.d.ts';

/**
 * Pages - Home.
 *
 * Landing page that composes the hero header, feature grid, and blog
 * preview using theme components from the Nova preset.
 *
 * @constructor
 *
 * @returns {Pages_Index_Home_Returns}
 *
 * @since 0.0.0
 */
function Home(): Pages_Index_Home_Returns {
  return (
    <Layout description={translate({
      id: 'home.layout.description',
      message: 'Automatically lock inactive GitHub issues and pull requests on a schedule you control.',
      description: 'Front page layout description (meta description for SEO)',
    })}
    >
      <Head>
        <title>
          {translate({
            id: 'home.head.title',
            message: 'Lock Inactive Threads - Automated Thread Locking for GitHub',
            description: 'Front page browser tab title',
          })}
        </title>
      </Head>
      <Canvas container="full" className={styles['hero']}>
        <div className={styles['heroInner']}>
          <div className={styles['heroContent']}>
            <p className="nova-hero-eyebrow">
              {translate({
                id: 'home.hero.eyebrow',
                message: 'GitHub Action',
                description: 'Front page hero eyebrow above the heading',
              })}
            </p>
            <Heading as="h1" className="nova-hero-heading">
              {translate({
                id: 'home.hero.heading',
                message: 'Lock inactive threads, automatically.',
                description: 'Front page hero main heading',
              })}
            </Heading>
            <p className="nova-hero-tagline">
              {translate({
                id: 'home.hero.tagline',
                message: 'Automatically lock inactive GitHub issues and pull requests on a schedule you control. Independent policies, closing comments, and configurable lock reasons keep your repositories clean without manual work.',
                description: 'Front page hero tagline beneath the heading',
              })}
            </p>
            <div className={`nova-hero-actions ${styles['heroActions']}`}>
              <Link
                className="nova-cta-primary"
                to="/docs/getting-started/usage/"
              >
                {translate({
                  id: 'home.hero.ctaLabel',
                  message: 'Get Started',
                  description: 'Front page hero primary call-to-action button label',
                })}
              </Link>
              <Link
                className="nova-cta-secondary"
                to="/docs/overview/"
              >
                {translate({
                  id: 'home.hero.secondaryCtaLabel',
                  message: 'Learn More',
                  description: 'Front page hero secondary call-to-action button label',
                })}
              </Link>
            </div>
          </div>
          <div className={styles['timeline']} aria-hidden="true">
            <div className={styles['tlStep']}>
              <span className={`${styles['tlDot']} ${styles['tlDotGreen']}`} />
              <div className={styles['tlTime']}>Jun 12</div>
              <div className={styles['tlLabel']}>Issue Closed</div>
              <div className={styles['tlDesc']}>Cannot parse nested config #184</div>
            </div>
            <div className={styles['tlStep']}>
              <span className={styles['tlDot']} />
              <div className={styles['tlTime']}>Jun 12 &ndash; Jul 12</div>
              <div className={styles['tlLabel']}>Inactive 30 days</div>
              <div className={styles['tlDesc']}>No comments or reactions</div>
            </div>
            <div className={styles['tlStep']}>
              <span className={`${styles['tlDot']} ${styles['tlDotGreen']}`} />
              <div className={styles['tlTime']}>Jul 12, 03:00</div>
              <div className={styles['tlLabel']}>Comment Posted</div>
              <div className={styles['tlComment']}>
                This issue has been automatically locked because it has been inactive for 30 days.
              </div>
            </div>
            <div className={styles['tlStep']}>
              <span className={`${styles['tlDot']} ${styles['tlDotRed']}`} />
              <div className={styles['tlTime']}>Jul 12, 03:00</div>
              <div className={styles['tlLabel']}>Thread Locked</div>
              <span className={styles['tlBadge']}>Locked as resolved</span>
            </div>
          </div>
        </div>
      </Canvas>
      <main>
        <Features
          items={[
            {
              icon: 'lucide:split',
              title: translate({
                id: 'home.features.independentPolicies.title',
                message: 'Independent Policies',
                description: 'Front page Features card title for Independent Policies',
              }),
              description: translate({
                id: 'home.features.independentPolicies.description',
                message: 'Configure issues and pull requests separately. Each thread type gets its own closing comment, inactivity window, and lock reason.',
                description: 'Front page Features card description for Independent Policies',
              }),
            },
            {
              icon: 'lucide:message-square',
              title: translate({
                id: 'home.features.closingComments.title',
                message: 'Closing Comments',
                description: 'Front page Features card title for Closing Comments',
              }),
              description: translate({
                id: 'home.features.closingComments.description',
                message: 'Every thread receives a comment explaining why it was locked before the lock is applied. Use the built-in defaults or set your own custom text.',
                description: 'Front page Features card description for Closing Comments',
              }),
            },
            {
              icon: 'lucide:lock',
              title: translate({
                id: 'home.features.lockReasons.title',
                message: 'Lock Reasons',
                description: 'Front page Features card title for Lock Reasons',
              }),
              description: translate({
                id: 'home.features.lockReasons.description',
                message: 'Lock threads as off-topic, resolved, spam, or too heated. Each reason maps to a native GitHub lock reason for clear, consistent records.',
                description: 'Front page Features card description for Lock Reasons',
              }),
            },
            {
              icon: 'lucide:tag',
              title: translate({
                id: 'home.features.labelExclusions.title',
                message: 'Label Exclusions',
                description: 'Front page Features card title for Label Exclusions',
              }),
              description: translate({
                id: 'home.features.labelExclusions.description',
                message: 'Keep specific threads out of the sweep entirely. A comma-delimited label list exempts any thread carrying a matching label.',
                description: 'Front page Features card description for Label Exclusions',
              }),
            },
            {
              icon: 'lucide:eye',
              title: translate({
                id: 'home.features.dryRunMode.title',
                message: 'Dry-Run Mode',
                description: 'Front page Features card title for Dry-Run Mode',
              }),
              description: translate({
                id: 'home.features.dryRunMode.description',
                message: 'Preview every thread that would be locked without making any changes. Trust the configuration before it goes live.',
                description: 'Front page Features card description for Dry-Run Mode',
              }),
            },
            {
              icon: 'lucide:search',
              title: translate({
                id: 'home.features.searchBasedScanning.title',
                message: 'Search-Based Scanning',
                description: 'Front page Features card title for Search-Based Scanning',
              }),
              description: translate({
                id: 'home.features.searchBasedScanning.description',
                message: 'Uses the GitHub search API to target only closed, unlocked threads past their inactivity window, paginating up to 1,000 threads per type per run.',
                description: 'Front page Features card description for Search-Based Scanning',
              }),
            },
          ]}
        />
        <Spotlight
          surface="alt"
          heading={translate({
            id: 'home.run.heading',
            message: 'See It Run',
            description: 'Front page heading above the GitHub Actions run example',
          })}
        >
          <p className="nova-section-description">
            {translate({
              id: 'home.run.description',
              message: 'Each scheduled run lists what it found and every thread it locked, right in the job log on GitHub.',
              description: 'Front page description of the GitHub Actions run example',
            })}
          </p>
          <WorkflowRunFrame
            workflow="Lock Inactive Issues (lock-inactive)"
            title="Locking inactive issues (lock-inactive)"
            runNumber={42}
            label={translate({
              id: 'home.run.label',
              message: 'A GitHub Actions run of Lock Inactive Threads that locked two issues and one pull request',
              description: 'Accessible label for the GitHub Actions run example',
            })}
            jobs={[{
              name: 'lock-inactive-issues',
              summary: 'succeeded yesterday in 9s',
              steps: [
                {
                  name: 'Set up job',
                  duration: '1s',
                },
                {
                  name: 'Lock inactive threads',
                  duration: '6s',
                  log: [
                    {
                      title: 'Run mrjackyliang/lock-inactive-threads@v1',
                      hiddenLines: 13,
                    },
                    {
                      title: 'Configuration',
                      hiddenLines: 12,
                    },
                    {
                      title: 'Context',
                      hiddenLines: 151,
                    },
                    {
                      title: 'Running',
                      lines: [
                        'Found 2 inactive issue(s) and 1 inactive pull request(s)',
                        'Locking issue #118: Export drops the last row',
                        'Locking issue #121: Docs link to the old install guide',
                        'Locking pull request #124: Bump the build image',
                        'Locked 3 of 3 thread(s)',
                      ],
                    },
                  ],
                },
                {
                  name: 'Complete job',
                  duration: '0s',
                },
              ],
            }]}
          />
        </Spotlight>
        <BlogPreview
          heading={translate({
            id: 'home.blogPreview.heading',
            message: 'From the Blog',
            description: 'Front page Blog Preview section heading',
          })}
          description={translate({
            id: 'home.blogPreview.description',
            message: 'Launches, milestones, and what\'s new in Lock Inactive Threads.',
            description: 'Front page Blog Preview section description',
          })}
          auto={true}
          limit={3}
          sort="newest"
        />
      </main>
    </Layout>
  );
}

export default Home;
