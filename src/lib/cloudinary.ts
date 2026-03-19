/**
 * Helper para construir URLs de Cloudinary con transformaciones.
 * Cuando se configure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, usar CldImage
 * de next-cloudinary directamente en los componentes.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function cloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "thumb" | "scale";
    quality?: number | "auto";
    format?: "auto" | "webp" | "jpg";
  } = {}
): string {
  if (!CLOUD_NAME) return "";

  const { width, height, crop = "fill", quality = "auto", format = "auto" } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    crop && `c_${crop}`,
    width && `w_${width}`,
    height && `h_${height}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
