import { z } from 'zod';
export declare const configuration: z.ZodObject<{
    githubToken: z.ZodString;
    issueComment: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    issueInactiveDays: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    issueLockReason: z.ZodDefault<z.ZodEnum<{
        "off-topic": "off-topic";
        resolved: "resolved";
        spam: "spam";
        "too heated": "too heated";
    }>>;
    prComment: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    prInactiveDays: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    prLockReason: z.ZodDefault<z.ZodEnum<{
        "off-topic": "off-topic";
        resolved: "resolved";
        spam: "spam";
        "too heated": "too heated";
    }>>;
    excludeLabels: z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>;
    logOutput: z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>;
    dryRun: z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>;
}, z.core.$strip>;
//# sourceMappingURL=schema.d.ts.map