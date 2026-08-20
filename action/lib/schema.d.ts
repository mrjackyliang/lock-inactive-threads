import { z } from 'zod';
export declare const configuration: z.ZodObject<{
    githubToken: z.ZodString;
    issueComment: z.ZodEffects<z.ZodString, string, string>;
    issueInactiveDays: z.ZodDefault<z.ZodNumber>;
    issueLockReason: z.ZodDefault<z.ZodEnum<["off-topic", "resolved", "spam", "too heated"]>>;
    prComment: z.ZodEffects<z.ZodString, string, string>;
    prInactiveDays: z.ZodDefault<z.ZodNumber>;
    prLockReason: z.ZodDefault<z.ZodEnum<["off-topic", "resolved", "spam", "too heated"]>>;
    excludeLabels: z.ZodEffects<z.ZodString, string[], string>;
    logOutput: z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">;
    dryRun: z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">;
}, "strip", z.ZodTypeAny, {
    githubToken: string;
    issueComment: string;
    issueInactiveDays: number;
    issueLockReason: "off-topic" | "resolved" | "spam" | "too heated";
    prComment: string;
    prInactiveDays: number;
    prLockReason: "off-topic" | "resolved" | "spam" | "too heated";
    excludeLabels: string[];
    logOutput: boolean;
    dryRun: boolean;
}, {
    githubToken: string;
    issueComment: string;
    prComment: string;
    excludeLabels: string;
    logOutput: "true" | "false";
    dryRun: "true" | "false";
    issueInactiveDays?: number | undefined;
    issueLockReason?: "off-topic" | "resolved" | "spam" | "too heated" | undefined;
    prInactiveDays?: number | undefined;
    prLockReason?: "off-topic" | "resolved" | "spam" | "too heated" | undefined;
}>;
//# sourceMappingURL=schema.d.ts.map