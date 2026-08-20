import {
  Canvas,
  Features,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/blocks';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

/**
 * Pages - Home.
 *
 * Landing page that composes the hero header, feature grid, and stats
 * using theme components from the Nova preset.
 *
 * @constructor
 *
 * @since UNRELEASED
 */
function Home() {
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
                to="/docs/overview/"
              >
                {translate({
                  id: 'home.hero.ctaLabel',
                  message: 'Get Started',
                  description: 'Front page hero primary call-to-action button label',
                })}
              </Link>
              <Link
                className="nova-cta-secondary"
                to="https://github.com/mrjackyliang/lock-inactive-threads"
              >
                {translate({
                  id: 'home.hero.secondaryCtaLabel',
                  message: 'View on GitHub',
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
        <Stats
          heading={translate({
            id: 'home.stats.heading',
            message: 'By the Numbers',
            description: 'Front page Stats section heading',
          })}
          items={[
            {
              value: '2',
              label: translate({
                id: 'home.stats.threadTypes.label',
                message: 'Thread types',
                description: 'Front page Stats label for thread types count',
              }),
              color: 'primary',
            },
            {
              value: '4',
              label: translate({
                id: 'home.stats.lockReasons.label',
                message: 'Lock reasons',
                description: 'Front page Stats label for lock reasons count',
              }),
              color: 'accent',
            },
            {
              value: '1,000',
              label: translate({
                id: 'home.stats.maxThreadsPerRun.label',
                message: 'Max threads per type',
                description: 'Front page Stats label for max threads per type count',
              }),
              color: 'primary',
            },
            {
              value: '0',
              label: translate({
                id: 'home.stats.manualLocksNeeded.label',
                message: 'Manual locks needed',
                description: 'Front page Stats label for manual locks needed count',
              }),
              color: 'accent',
            },
          ]}
        />
      </main>
    </Layout>
  );
}

export default Home;
