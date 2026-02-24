export type FaceContentType = 'image' | 'video' | 'color';

export interface FaceContent {
  type: FaceContentType;
  src?: string;        // For image/video
  color?: string;      // For solid color fallback
  title?: string;      // Project title
  projectId?: string;  // For click interaction
}

// BoxGeometry face indices:
// 0 = Right (+X)
// 1 = Left (-X)
// 2 = Top (+Y)
// 3 = Bottom (-Y)
// 4 = Front (+Z)
// 5 = Back (-Z)
export type FaceIndex = 0 | 1 | 2 | 3 | 4 | 5;

export const FACE_NAMES: Record<FaceIndex, string> = {
  0: 'right',
  1: 'left',
  2: 'top',
  3: 'bottom',
  4: 'front',
  5: 'back',
};
