import { z } from 'zod';

const payloadSchema = z.object({
  sub: z.string(),
  phoneNumber: z.string(),
});

export type payloadType = z.infer<typeof payloadSchema>;

export default payloadSchema;
