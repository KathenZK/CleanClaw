import { createOpenGraphImage } from "@/lib/opengraph";

export const alt = "CleanClaw";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createOpenGraphImage("zh");
}
