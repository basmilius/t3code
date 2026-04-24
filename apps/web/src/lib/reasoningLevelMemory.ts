import type { ProviderKind, UnifiedSettings } from "@t3tools/contracts";
import { reasoningLevelMemoryKey } from "@t3tools/shared/model";

type ReasoningLevelMemory = Readonly<Pick<UnifiedSettings, "reasoningLevelByProviderModel">>;

export function getRememberedReasoningLevel(
  settings: ReasoningLevelMemory,
  provider: ProviderKind,
  model: string | null | undefined,
): string | null {
  const key = reasoningLevelMemoryKey(provider, model);
  if (!key) {
    return null;
  }
  const stored = settings.reasoningLevelByProviderModel?.[key];
  return typeof stored === "string" && stored.length > 0 ? stored : null;
}

export function withRememberedReasoningLevel(
  settings: ReasoningLevelMemory,
  provider: ProviderKind,
  model: string,
  value: string,
): Record<string, string> | null {
  const key = reasoningLevelMemoryKey(provider, model);
  if (!key) {
    return null;
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  return {
    ...(settings.reasoningLevelByProviderModel ?? {}),
    [key]: trimmed,
  };
}
