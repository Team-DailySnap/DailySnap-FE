import { z } from 'zod';

// @FIXME: dummy
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});
