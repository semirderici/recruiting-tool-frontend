// src/utils/matching.ts

export interface MatchableEntity {
  location?: string;
  tags?: string[];
  skills?: string[];
}

/**
 * Kleiner Helper, um Strings zu normalisieren.
 */
function normalize(str?: string): string {
  return (str ?? "").toLowerCase().trim();
}

/**
 * Sammle alle Keywords (Tags + Skills) und normalisiere/dedupliziere sie.
 */
function collectKeywords(entity: MatchableEntity): string[] {
  const fromTags = entity.tags ?? [];
  const fromSkills = entity.skills ?? [];

  const all = [...fromTags, ...fromSkills];
  const seen = new Set<string>();

  return all
    .map(normalize)
    .filter((value) => {
      if (!value) return false;
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
}

/**
 * Berechnet einen deterministischen Matching-Score zwischen Kandidat und Job.
 * - Basis-Score: 40
 * - +10 Punkte pro gemeinsamen Skill/Tag (max. +40)
 * - +10 Punkte bei Standort-Match
 * - Score wird auf 0–100 geklemmt
 *
 * Die Funktion ist bewusst rein (keine Side-Effects, kein Math.random),
 * damit React-Linting zufrieden ist.
 */
export function computeCandidateJobMatchScore(
  candidate: MatchableEntity,
  job: MatchableEntity
): {
  score: number;
  sharedKeywords: string[];
  locationMatch: boolean;
} {
  const candidateKeywords = collectKeywords(candidate);
  const jobKeywords = collectKeywords(job);

  const jobKeywordSet = new Set(jobKeywords);
  const sharedKeywords = candidateKeywords.filter((kw) =>
    jobKeywordSet.has(kw)
  );

  let score = 40;

  if (sharedKeywords.length > 0) {
    score += Math.min(40, sharedKeywords.length * 10);
  }

  const locationMatch =
    normalize(candidate.location) !== "" &&
    normalize(candidate.location) === normalize(job.location);

  if (locationMatch) {
    score += 10;
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return { score, sharedKeywords, locationMatch };
}

