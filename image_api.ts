import Config from "./config.json" with {type:'json'}

export interface Txt2ImgPayload {
  prompt: string;
  negative_prompt?: string;
  steps?: number;
  width?: number;
  height?: number;
  cfg_scale?: number;
  sampler_name?: string;
  seed?: number;
}

export async function txt2img(payload: Txt2ImgPayload): Promise<string[]> {
  const res = await fetch(`${Config.stable_diffusion.endpoint}/sdapi/v1/txt2img`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: payload.prompt,
      negative_prompt: payload.negative_prompt ?? "",
      steps: payload.steps ?? 20,
      width: payload.width ?? 512,
      height: payload.height ?? 512,
      cfg_scale: payload.cfg_scale ?? 7,
      sampler_name: payload.sampler_name ?? "DPM++ 2M Karras",
      seed: payload.seed ?? -1,
    }),
  });

  if (!res.ok) throw new Error(`SD API error: ${res.status}`);
  const data = (await res.json()) as { images: string[] };

  // Returns base64-encoded PNG strings
  return data.images;
}